import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { CreateCrWalletTransactionRequestDto } from '../dto/create-cr-wallet.dto';
import { CrWallet } from '../entities/cr-wallet.entity';
import { nanoid } from 'nanoid/async';
import { CipherService } from '../../../common/cipher/cipher.service';
import { BAD_REQUEST } from 'src/common/methods/handler.methods';
import { CrWalletTransaction } from '../../cr-wallet-transaction/entities/cr-wallet-transaction.entity';
import { cipherDto } from 'src/common/cipher/cipher.dto';


@Injectable()
export class CrWalletDebitService {
  constructor(
    private readonly cipherService: CipherService,
    private dataSource: DataSource,
  ) { }

  private async debitWallet(manager: EntityManager, crwa_id: string, currentCredit: number, newDebit: number) {
    try {
      const actualCredit = +(parseFloat(currentCredit + '') - parseFloat(newDebit + '')).toFixed(8)
      return await manager.update(CrWallet, { crwa_id }, { crwa_wallet_credit: actualCredit });
    } catch (err) {
      BAD_REQUEST(err)
    }
  }

  public async debitService(cipher: cipherDto) {
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
      const error = await this.cipherService.validateData(CreateCrWalletTransactionRequestDto, dataFromCipher)
      if (error.length > 0)
        BAD_REQUEST({ message: "Transaction failed due to invalid data" })

      // ### Ready for transaction
      const manager = queryRunner.manager

      // ### Get basic information & Construct body for transaction
      const { cwtr_user_id, cwtr_transaction_amount } = dataFromCipher
      const wallet: CrWallet = await manager.findOne(CrWallet, { where: { crwa_user_id: cwtr_user_id } })

      if (!wallet.crwa_is_active) {
        BAD_REQUEST({ message: "Your wallet is inactive" })
      } else if (parseFloat(wallet.crwa_wallet_credit + '') < parseFloat(cwtr_transaction_amount + '')) {
        BAD_REQUEST({ message: "You dont have Insufficient fund" })
      }

      const afterCredit = +(parseFloat(wallet.crwa_wallet_credit + '') - parseFloat(cwtr_transaction_amount + '')).toFixed(8)
      const body = {
        ...dataFromCipher,
        cwtr_id: await nanoid(24),
        cwtr_wallet_id: wallet.crwa_id,
        cwtr_currency: 'INR',
        cwtr_type: 'DT',
        cwtr_actual_credit: wallet.crwa_wallet_credit,
        cwtr_before_credit: wallet.crwa_wallet_credit,
        cwtr_after_credit: afterCredit,
        cwtr_current_credit: afterCredit,
      }

      // ### Transact
      await manager.save(CrWalletTransaction, body)
      await this.debitWallet(manager, wallet.crwa_id, wallet.crwa_wallet_credit, cwtr_transaction_amount)

      // ### Transaction Commit
      await queryRunner.commitTransaction();
      return {
        message: "Transaction successful",
      }
    } catch (err) {
      await queryRunner.rollbackTransaction();
      BAD_REQUEST(err)
    } finally {
      await queryRunner.release();
    }
  }

}