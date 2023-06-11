import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBankAccountDto } from './dto/create-bank_account.dto';
import { UpdateBankAccountDto } from './dto/update-bank_account.dto';
import { BankAccount } from './entities/bank_account.entity';
import { BankAccountServiceEvent } from './events/bacnk_account.event';

@Injectable()
export class BankAccountService extends BankAccountServiceEvent {
  constructor(
    @InjectRepository(BankAccount)
    private bankAccountRepo: Repository<BankAccount>,
    private eventEmitter: EventEmitter2,
  ) { 
    super()
  }

  public async create(createBankAccountDto: CreateBankAccountDto) {
    const bankAccount: BankAccount = new BankAccount();
    return await this.bankAccountRepo.save({ ...bankAccount, ...createBankAccountDto }).then((res: BankAccount)=>{
      this.eventEmitter.emit('bank_account.created', { ...createBankAccountDto, ...res });
      return res
    })
  }

  public async findAll() {
    return await this.bankAccountRepo.find({ where: { is_deleted: false } })
  }

  public async findOne(id: number) {
    return await this.bankAccountRepo.findOne({ where: { is_deleted: false, _id: id } })
  }

  public async findByFields(body: any) {
    return await this.bankAccountRepo.find({ where: body })
  }

  public async update(id: number, updateBankAccountDto: UpdateBankAccountDto) {
    await this.bankAccountRepo.update(
      { _id: id },
      { ...updateBankAccountDto }
    );
    return await this.findOne(id)
  }

  public async remove(id: number) {
    await this.bankAccountRepo.update(
      { _id: id },
      { is_deleted: true }
    );
    return { success: true, message: "Deleted successfully" }
  }
}
