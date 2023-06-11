import { Injectable } from '@nestjs/common';
import { OnEvent } from "@nestjs/event-emitter";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankAccountBusinessMapper } from '../entities/mapper/business.bank_account.entity';
import { BankAccountUserMapper } from '../entities/mapper/user.bank_account.entity';


@Injectable()
export class BankAccountServiceEvent {
  @InjectRepository(BankAccountUserMapper)
  private bankAccountUserMapperRepo: Repository<BankAccountUserMapper>
  @InjectRepository(BankAccountBusinessMapper)
  private bankAccountBusinessMapperRepo: Repository<BankAccountBusinessMapper>

  @OnEvent('bank_account.created')
  BankAccountCreated(data) {
    const { bank_acco_ref, bank_acco_ref_type, bank_acco_ref_id, _id } = data
    let payload: any = { bank_acco_id: _id, type: bank_acco_ref_type }
    switch(bank_acco_ref){
      case "user":
        payload.user_id = bank_acco_ref_id,
        this.createUserBankAccount(payload)
      break
      case "business":
        payload.busi_id = bank_acco_ref_id,
        this.createBusinessBankAccount(payload)
      break
      default: null
    }
  }

  public async createUserBankAccount(payload: BankAccountUserMapper) {
    const bankAccountUser: BankAccountUserMapper = new BankAccountUserMapper();
    return await this.bankAccountUserMapperRepo.save({ ...bankAccountUser, ...payload })
  }

  public async createBusinessBankAccount(payload: BankAccountBusinessMapper) {
    const bankAccountBusiness: BankAccountBusinessMapper = new BankAccountBusinessMapper();
    return await this.bankAccountBusinessMapperRepo.save({ ...bankAccountBusiness, ...payload })
  }

}