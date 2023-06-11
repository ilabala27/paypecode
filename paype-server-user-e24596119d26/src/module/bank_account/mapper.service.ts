import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankAccountBusinessMapper } from './entities/mapper/business.bank_account.entity';
import { BankAccountUserMapper } from './entities/mapper/user.bank_account.entity';

@Injectable()
export class BankAccountUserService {
  constructor(
    @InjectRepository(BankAccountUserMapper)
    private bankAccountUserMapperRepo: Repository<BankAccountUserMapper>,
  ) { }

  public async findAll() {
    return await this.bankAccountUserMapperRepo.find({ 
      where: { is_deleted: false }, 
      relations: ["bank_acco_id", "user_id"],
      select: ["_id", "is_active", "bank_acco_id", "user_id"]
    })
  }

  public async findOne(id: number) {
    return await this.bankAccountUserMapperRepo.findOne({ 
      where: { _id: id, is_deleted: false }, 
      relations: ["bank_acco_id", "user_id"],
      select: ["_id", "is_active", "bank_acco_id", "user_id"]
    })
  }

}

@Injectable()
export class BankAccountBusinessService {
  constructor(
    @InjectRepository(BankAccountBusinessMapper)
    private bankAccountBusinessMapperRepo: Repository<BankAccountBusinessMapper>,
  ) { }

  public async findAll() {
    return await this.bankAccountBusinessMapperRepo.find({ 
      where: { is_deleted: false }, 
      relations: ["bank_acco_id", "busi_id"],
      select: ["_id", "is_active", "bank_acco_id", "busi_id"]
    })
  }

  public async findOne(id: number) {
    return await this.bankAccountBusinessMapperRepo.findOne({ 
      where: { _id: id, is_deleted: false }, 
      relations: ["bank_acco_id", "busi_id"],
      select: ["_id", "is_active", "bank_acco_id", "busi_id"]
    })
  }

}
