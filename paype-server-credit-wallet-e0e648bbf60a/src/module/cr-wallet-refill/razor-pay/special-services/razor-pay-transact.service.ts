import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CrWallet } from '../../../cr-wallet/entities/cr-wallet.entity';
import { CipherService } from '../../../../common/cipher/cipher.service';
import { BAD_REQUEST } from 'src/common/methods/handler.methods';
import { cipherDto } from 'src/common/cipher/cipher.dto';
import { CrWalletCreditService } from 'src/module/cr-wallet/speical-services/cr-wallet-credit.service';
import InterService from 'src/common/inter-service';
import { RazorPayTransactionDto } from '../dto/create-razor-pay.dto';
import { RazorPay } from '../entities/razor-pay.entity';

@Injectable()
export class RazorPayTransactService {
  constructor(
    private readonly cipherService: CipherService,
    private readonly crWalletCreditService: CrWalletCreditService,
    private dataSource: DataSource,
  ) { }

  public async razarPayTransaction(header, queryParams, cipher: cipherDto) {
    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      // ### Transaction starts
      await queryRunner.startTransaction("SERIALIZABLE");

      // ### Access check
      const { granted, time, ...dataFromCipher } = await this.cipherService.decryptFormattedCipher(cipher)
      if (!granted)
        BAD_REQUEST({ message: "Transaction failed due to invalid access" })

      // ### Data check
      const error = await this.cipherService.validateData(RazorPayTransactionDto, dataFromCipher)
      if (error.length > 0)
        BAD_REQUEST({ message: "Transaction failed due to invalid data" })

      // ### Ready for transaction
      const manager = queryRunner.manager

      // ### Get basic information
      const { rapa_id, rapa_user_id, rapa_status, rapa_ref_no } = dataFromCipher
      const razorPay: RazorPay = await manager.findOne(RazorPay, { where: { rapa_id: rapa_id } })
      const wallet: CrWallet = await manager.findOne(CrWallet, { where: { crwa_id: razorPay.rapa_user_wallet_id } })
      let message = "Transaction failed"
      if (!wallet.crwa_is_active) {
        BAD_REQUEST({ message: "Transaction failed due to invalid access" })
      }

      // ### Transact based on status
      switch (rapa_status) {
        case 'CANCELLED':
          {
            await manager.update(RazorPay, { rapa_id: rapa_id }, { rapa_status })
          }
          break;
        case 'FAILED':
          {
            await manager.update(RazorPay, { rapa_id: rapa_id }, { rapa_status })
            InterService.triggerUserNotification({
              header,
              title: "Razor pay transaction failed",
              body: `Oops! Your Razor pay transaction of ${parseFloat(razorPay.rapa_transaction_amount + '').toFixed(2)} Rs. got failed.`,
              userId: razorPay.rapa_user_id
            })
          }
          break;
        case 'COMPLETED':
          {
            let transactionBody: any = {
              cwtr_transacted_user_id: rapa_user_id,
              cwtr_session_id: razorPay.rapa_session_id,
              cwtr_user_id: razorPay.rapa_user_id,
              cwtr_transaction_id: razorPay.rapa_id,
              cwtr_status: 'CR_SUCCESS_RAZORPAY',
              cwtr_short_description: razorPay.rapa_description,
              cwtr_description: `${razorPay.rapa_short_description} ${rapa_ref_no}`,
              cwtr_transaction_amount: parseFloat(razorPay.rapa_transaction_amount + '').toFixed(8),
              cwtr_remark: razorPay.rapa_remark,
              cwtr_note: razorPay.rapa_note,
            }
            await manager.update(RazorPay, { rapa_id: rapa_id }, { rapa_status })
            const cipher = this.cipherService.encryptWithFormat(transactionBody)
            await this.crWalletCreditService.creditService(cipher)
            message = "Transaction successful"
            InterService.triggerUserNotification({
              header,
              title: "Razor pay transaction failed",
              body: `Your Razor pay transaction of ${parseFloat(razorPay.rapa_transaction_amount + '').toFixed(2)} Rs. got success, Happy forks`,
              userId: razorPay.rapa_user_id
            })
          }
          break;
        default:
          BAD_REQUEST({ message: "Transaction failed due to invalid data" })
      }

      // ### Transaction Commit
      await queryRunner.commitTransaction();
      return {
        message
      }
    } catch (err) {
      await queryRunner.rollbackTransaction();
      BAD_REQUEST(err)
    } finally {
      await queryRunner.release();
    }
  }

}