import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateRechargeTransactionDto, updateRechargeTransactionParams } from './dto/update-recharge-transaction.dto';
import { RechargeTransaction, RechargeTransactionDocument } from './entities/recharge-transaction.entity';
import { queryMatch } from './recharge-transaction.query';

@Injectable()
export class RechargeTransactionService {
  constructor(
    @InjectModel(RechargeTransaction.name)
    private rechargeTransaction: Model<RechargeTransactionDocument>,
  ) { }

  async findAll(): Promise<RechargeTransaction[]> {
    try {
      const body = { is_deleted: false }
      return await this.rechargeTransaction.find(body).exec();
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async findOneById(retr_id: string): Promise<RechargeTransaction> {
    try {
      const result = await this.rechargeTransaction.aggregate([
        queryMatch([ { "$eq": ["$retr_id", retr_id] } ])
      ])
      if (!result.length) throw new NotFoundException("No record found")
      return result[0]
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async findAllByFields(updateRechargeTransactionDto: UpdateRechargeTransactionDto): Promise<RechargeTransaction[]> {
    try {
      return await this.rechargeTransaction.find(updateRechargeTransactionDto).exec();
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async update(
    params: updateRechargeTransactionParams,
    updateRechargeTransactionDto: UpdateRechargeTransactionDto,
    returnType?: string
  ): Promise<RechargeTransaction | string> {
    try {
      const { retr_id, user_id } = params
      const record = await this.findOneById(retr_id)
      const body = {
        retr_id,
        ...updateRechargeTransactionDto,
        schema_version: record.schema_version + 1,
        updated: [
          ...record.updated,
          { _by: user_id }
        ]
      }
      await this.rechargeTransaction.updateOne({ retr_id }, body).exec();
      return returnType == 'string' ? 'Successfully deleted' : await this.findOneById(retr_id)
    } catch (err) {
      throw new BadRequestException(err)
    }
  }
  
}