import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CrWalletTransaction } from './entities/cr-wallet-transaction.entity';
import { crWalletTransactionDefaultQuery } from './cr-wallet-transaction.query';
import { BAD_REQUEST } from 'src/common/methods/handler.methods';

@Injectable()
export class CrWalletTransactionService {
  constructor(
    @InjectRepository(CrWalletTransaction)
    private crWalletTransaction: Repository<CrWalletTransaction>
  ) { }

  public async findAllByQuery(query: object) {
    try {
      const { _id, user_id, wallet_id }: any = query
      return await this.crWalletTransaction
        .createQueryBuilder('walletTransaction')
        .where(crWalletTransactionDefaultQuery, { _id, user_id, wallet_id })
        .orderBy('walletTransaction.cwtr_created_at', 'DESC')
        .getMany();
    } catch (err) {
      BAD_REQUEST(err)
    }
  }

  public async findOneByQuery(query: object) {
    try {
      const { _id, user_id, wallet_id }: any = query
      return await this.crWalletTransaction
        .createQueryBuilder('walletTransaction')
        .where(crWalletTransactionDefaultQuery, { _id, user_id, wallet_id })
        .getOne();
    } catch (err) {
      BAD_REQUEST(err)
    }
  }

}
