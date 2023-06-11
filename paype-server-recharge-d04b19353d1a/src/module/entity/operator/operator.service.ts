import { Injectable, } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid/async';
import { matchANDPipeline, matchORPipeline } from './operator.query';
import { CreateOperatorDto } from './dto/create-operator.dto';
import { UpdateOperatorDto } from './dto/update-operator.dto';
import { Operator, OperatorDocument } from './entities/operator.entity';
import { BAD_REQUEST, NOFOUND_REQUEST } from 'src/common/methods/handler.methods';

@Injectable()
export class OperatorService {
  constructor(
    @InjectModel(Operator.name)
    private operatorModel: Model<OperatorDocument>,
  ) { }

  async create(createOperatorDto: CreateOperatorDto): Promise<Operator> {
    try {
      createOperatorDto.oper_id = await nanoid(24)
      createOperatorDto.created_by = createOperatorDto.user.preferred_username
      return await this.operatorModel.create(createOperatorDto)
    } catch (err) {
      BAD_REQUEST(err.message)
    }
  }

  async findAllByORQuery(query: UpdateOperatorDto): Promise<Operator[]> {
    try {
      const keys = Object.keys(query)
      const pipeline = matchORPipeline(
        keys.map((e) => ({ "$eq": [`$${e}`, query[e]] }))
      )

      const result = await this.operatorModel.aggregate(pipeline)
      // if (!result.length) NOFOUND_REQUEST("No operator found")
      return result
    } catch (err) {
      BAD_REQUEST(err.message)
    }
  }

  async findAllByANDQuery(query: UpdateOperatorDto): Promise<Operator[]> {
    try {
      const keys = Object.keys(query)
      const pipeline = matchANDPipeline(
        keys.map((e) => ({ "$eq": [`$${e}`, query[e]] }))
      )

      const result = await this.operatorModel.aggregate(pipeline)
      // if (!result.length) NOFOUND_REQUEST("No operator found")
      return result
    } catch (err) {
      BAD_REQUEST(err.message)
    }
  }

  async updateOne(oper_id: string, updateOperatorDto: UpdateOperatorDto): Promise<Operator[]> {
    try {
      // # Get
      const res = await this.findAllByANDQuery({ oper_id })
      if (res.length != 1) BAD_REQUEST("No operator exist")
      const [operator] = res

      // # Update
      const body = {
        oper_id,
        ...operator,
        ...updateOperatorDto,
        schema_version: operator.schema_version + 1,
        updated: [
          ...operator.updated,
          { _by: updateOperatorDto.user.preferred_username }
        ]
      }
      await this.operatorModel.updateOne({ oper_id }, body).exec();

      // # Get updated
      return await this.findAllByANDQuery({ oper_id })
    } catch (err) {
      BAD_REQUEST(err.message)
    }
  }
}
