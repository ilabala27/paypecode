import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { nanoid } from 'nanoid/async';
import { BAD_REQUEST } from 'src/common/methods/handler.methods';
import { Repository } from 'typeorm';
import { cashDepositDefaultQuery } from './cash-deposit.query';
import { CreateCashDepositDto } from './dto/create-cash-deposit.dto';
import { UpdateCashDepositDto } from './dto/update-cash-deposit.dto';
import { CashDeposit } from './entities/cash-deposit.entity';


@Injectable()
export class CashDepositService {
  constructor(
    @InjectRepository(CashDeposit)
    private cashDepositRepo: Repository<CashDeposit>
  ) { }

  public async create(createCashDepositDto: CreateCashDepositDto) {
    try {
      createCashDepositDto.cade_id = await nanoid(24)
      const cashDeposit: CashDeposit = new CashDeposit();
      return await this.cashDepositRepo.save({ ...cashDeposit, ...createCashDepositDto });
    } catch (err) {
      BAD_REQUEST(err)
    }
  }

  public async findAll() {
    try {
      return await this.cashDepositRepo.find({
        where: { cade_is_deleted: false }
      })
    } catch (err) {
      BAD_REQUEST(err)
    }
  }

  public async findAllByQuery(query: object) {
    try {
      const { _id, user_id, status }: any = query
      return await this.cashDepositRepo
        .createQueryBuilder('cashDeposit')
        .where("cashDeposit.cade_is_deleted = false")
        .andWhere(cashDepositDefaultQuery, { _id, user_id, status })
        .orderBy('cashDeposit.cade_created_at', 'DESC')
        .getMany();
    } catch (err) {
      BAD_REQUEST(err)
    }
  }

  public async findOneByQuery(query: object) {
    try {
      const { _id, user_id, status }: any = query
      return await this.cashDepositRepo
        .createQueryBuilder('cashDeposit')
        .where("cashDeposit.cade_is_deleted = false")
        .andWhere(cashDepositDefaultQuery, { _id, user_id, status })
        .getOne();
    } catch (err) {
      BAD_REQUEST(err)
    }
  }

  public async update(id: string, updateCashDepositDto: UpdateCashDepositDto) {
    try {
      const { cade_id, ...rest } = updateCashDepositDto
      await this.cashDepositRepo.update(
        { cade_id: id },
        { ...rest }
      );
      return await this.findOneByQuery({ _id: id })
    } catch (err) {
      BAD_REQUEST(err)
    }
  }

  public async remove(id: number) {
    try {
      await this.cashDepositRepo.update(
        { _id: id },
        { cade_is_deleted: true, cade_is_active: false }
      );
      return { success: true, message: "Deleted successfully" }
    } catch (err) {
      BAD_REQUEST(err)
    }
  }

}