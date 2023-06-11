import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CrWallet } from '../../../cr-wallet/entities/cr-wallet.entity';
import * as moment from "moment";
import { CipherService } from '../../../../common/cipher/cipher.service';
import { BAD_REQUEST } from 'src/common/methods/handler.methods';
import { CashDeposit } from '../entities/cash-deposit.entity';
import { cipherDto } from 'src/common/cipher/cipher.dto';
import { CashDepositTransactionDto } from '../dto/create-cash-deposit.dto';
import { CrWalletCreditService } from 'src/module/cr-wallet/speical-services/cr-wallet-credit.service';
import InterService from 'src/common/inter-service';

@Injectable()
export class CashDepositTransactService {
  constructor(
    private readonly cipherService: CipherService,
    private readonly crWalletCreditService: CrWalletCreditService,
    private dataSource: DataSource,
  ) { }

  public async cashDepositTransaction(header, queryParams, cipher: cipherDto) {
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
      const error = await this.cipherService.validateData(CashDepositTransactionDto, dataFromCipher)
      if (error.length > 0)
        BAD_REQUEST({ message: "Transaction failed due to invalid data" })

      // ### Ready for transaction
      const manager = queryRunner.manager

      // ### Get basic information
      const { _id, user_id, status } = dataFromCipher
      const cashDeposit: CashDeposit = await manager.findOne(CashDeposit, { where: { cade_id: _id } })
      const wallet: CrWallet = await manager.findOne(CrWallet, { where: { crwa_id: cashDeposit.cade_user_wallet_id } })
      if (cashDeposit.cade_status != 'CREATED' || !wallet.crwa_is_active) {
        BAD_REQUEST({ message: "Transaction failed due to invalid data" })
      }
      const statusUpdatedBy = { cade_status_updated_by: user_id, cade_status_updated_at: moment() }
      let cade_status: any = ''

      // ### Transact based on status
      switch (status) {
        case 'Cancel':
          {
            cade_status = 'CANCELED'
            await manager.update(CashDeposit, { cade_id: _id }, { cade_status, ...statusUpdatedBy })
          }
          break;
        case 'Reject':
          {
            cade_status = 'REJECTED'
            await manager.update(CashDeposit, { cade_id: _id }, { cade_status, ...statusUpdatedBy })
            InterService.triggerUserNotification({
              header,
              title: "Cash Deposit Rejected",
              body: `Oops! Your cash deposit of ${parseFloat(cashDeposit.cade_transaction_amount + '').toFixed(2)} Rs. got rejected.`,
              userId: cashDeposit.cade_user_id
            })
          }
          break;
        case 'Approve':
          {
            let transactionBody: any = {
              cwtr_transacted_user_id: user_id,
              cwtr_session_id: cashDeposit.cade_session_id,
              cwtr_user_id: cashDeposit.cade_user_id,
              cwtr_transaction_id: cashDeposit.cade_id,
              cwtr_status: 'CR_SUCCESS_CASH_DEPOSIT',
              cwtr_short_description: cashDeposit.cade_description,
              cwtr_description: cashDeposit.cade_short_description,
              cwtr_transaction_amount: parseFloat(cashDeposit.cade_transaction_amount + '').toFixed(8),
              cwtr_remark: cashDeposit.cade_remark,
              cwtr_note: cashDeposit.cade_note,
            }
            cade_status = 'APPROVED'
            await manager.update(CashDeposit, { cade_id: _id }, { cade_status, ...statusUpdatedBy })
            const cipher = this.cipherService.encryptWithFormat(transactionBody)
            await this.crWalletCreditService.creditService(cipher)
            InterService.triggerUserNotification({
              header,
              title: "Cash Deposit Approved",
              body: `Your cash deposit of ${parseFloat(cashDeposit.cade_transaction_amount + '').toFixed(2)} Rs. got approved, Happy forks`,
              userId: cashDeposit.cade_user_id
            })
          }
          break;
        default:
          BAD_REQUEST({ message: "Transaction failed due to invalid data" })
      }

      // ### Transaction Commit
      await queryRunner.commitTransaction();
      return {
        message: `Transaction successfully ${cade_status}`,
      }
    } catch (err) {
      await queryRunner.rollbackTransaction();
      BAD_REQUEST(err)
    } finally {
      await queryRunner.release();
    }
  }

}