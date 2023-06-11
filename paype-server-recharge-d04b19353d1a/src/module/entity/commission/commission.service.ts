import { Injectable, } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid/async';
import { matchANDPipeline, matchORPipeline, operatorLoopUp, providerLoopUp } from './commission.query';
import { CreateCommissionDto } from './dto/create-commission.dto';
import { UpdateCommissionDto } from './dto/update-commission.dto';
import { Commission, CommissionDocument } from './entities/commission.entity';
import { BAD_REQUEST, NOFOUND_REQUEST } from 'src/common/methods/handler.methods';


@Injectable()
export class CommissionService {
  constructor(
    @InjectModel(Commission.name)
    private commissionModel: Model<CommissionDocument>,
  ) { }

  async create(createCommissionDto: CreateCommissionDto): Promise<Commission> {
    try {
      createCommissionDto.comm_id = await nanoid(24)
      createCommissionDto.created_by = createCommissionDto.user.preferred_username
      return await this.commissionModel.create(createCommissionDto)
    } catch (err) {
      BAD_REQUEST(err.message)
    }
  }

  async findAllByORQuery(query: UpdateCommissionDto): Promise<Commission[]> {
    try {
      const exclude = ['comm_user_chain_ids']
      const keys = Object.keys(query).filter(e => !exclude.includes(e))
      const pipeline = matchORPipeline(
        keys.map((e) => ({ "$eq": [`$${e}`, query[e]] })),
        { user_chain_ids: query.comm_user_chain_ids }
      )

      const result = await this.commissionModel.aggregate(pipeline)
      // if (!result.length) NOFOUND_REQUEST("No commission found")
      return result
    } catch (err) {
      BAD_REQUEST(err.message)
    }
  }

  async findAllByANDQuery(query: UpdateCommissionDto): Promise<Commission[]> {
    try {
      const exclude = ['comm_user_chain_ids']
      const keys = Object.keys(query).filter(e => !exclude.includes(e))
      const pipelineStage1 = matchANDPipeline(
        keys.map((e) => ({ "$eq": [`$${e}`, query[e]] })),
        { user_chain_ids: query.comm_user_chain_ids }
      )
      const pipelineStage2 = operatorLoopUp()
      const pipelineStage3 = providerLoopUp()

      const result = await this.commissionModel.aggregate([
        ...pipelineStage1,
        ...pipelineStage2,
        ...pipelineStage3,
        { "$unwind": "$operator" },
        { "$unwind": "$provider" },
        {
          "$group": {
            "_id": "$comm_user_id", // Group by user id
            "user_id": { "$first": "$comm_user_id" },
            "user_name": { "$first": "$comm_user_name" },
            "user_type": { "$first": "$comm_user_type" },
            "meta_info": { "$first": "$comm_meta_info" },
            "system_id": { "$first": "$comm_system_id" },
            "organization_id": { "$first": "$comm_organization_id" },
            "super_distributor_id": { "$first": "$comm_super_distributor_id" },
            "distributor_id": { "$first": "$comm_distributor_id" },
            "retailer_id": { "$first": "$comm_retailer_id" },
            "user_chain_ids": { "$first": "$comm_user_chain_ids" },
            "commissions": {
              "$push": {
                "comm_is_active": "$is_active",
                "comm_is_deleted": "$is_deleted",
                "comm_id": "$comm_id",
                "comm_commission": "$comm_commission",
                "comm_commission_tax": "$comm_commission_tax",
                "comm_created_at": "$created_at",
                "comm_created_by": "$created_by",
                "comm_remarks": "$remarks",
                "comm_notes": "$notes",
                "comm_operator": {
                  "_id": "$operator._id",
                  "oper_id": "$operator.oper_id",
                  "oper_is_active": "$operator.is_active",
                  "oper_is_deleted": "$operator.is_deleted",
                  "oper_type": "$operator.oper_type",
                  "oper_name": "$operator.oper_name",
                  "oper_key": "$operator.oper_key",
                  "oper_created_by": "$operator.created_by",
                  "oper_created_at": "$operator.created_at"
                },
                "comm_provider": {
                  "_id": "$provider._id",
                  "prov_id": "$provider.prov_id",
                  "prov_is_active": "$provider.is_active",
                  "prov_is_deleted": "$provider.is_deleted",
                  "prov_display_name": "$provider.prov_display_name",
                  "prov_name": "$provider.prov_name",
                  "prov_key": "$provider.prov_key",
                  "prov_commission": "$provider.prov_commission",
                  "prov_commission_tax": "$provider.prov_commission_tax",
                  "prov_request_object": "$provider.prov_request_object",
                  "prov_created_by": "$provider.created_by",
                  "prov_created_at": "$provider.created_at"
                },
              }
            }
          }
        },
      ])
      // if (!result.length) NOFOUND_REQUEST("No commission found")
      return result
    } catch (err) {
      BAD_REQUEST(err.message)
    }
  }

  async updateOne(comm_id: string, updateCommissionDto: UpdateCommissionDto): Promise<Commission[]> {
    try {
      // # Get
      const res = await this.findAllByANDQuery({ comm_id })
      if (res.length != 1) BAD_REQUEST("No commission exist")
      const [commission] = res

      // # Update
      const body = {
        comm_id,
        ...commission,
        ...updateCommissionDto,
        schema_version: commission.schema_version + 1,
        updated: [
          ...commission.updated,
          { _by: 'user_id' }
        ]
      }
      await this.commissionModel.updateOne({ comm_id }, body).exec();

      // # Get updated
      return await this.findAllByANDQuery({ comm_id })
    } catch (err) {
      BAD_REQUEST(err.message)
    }
  }
}
