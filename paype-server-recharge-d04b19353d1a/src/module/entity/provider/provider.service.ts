import { Injectable, } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid/async';
import { matchANDPipeline, matchORPipeline, operatorLoopUp, providerGroupAndFormat } from './provider.query';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { Provider, ProviderDocument } from './entities/provider.entity';
import { BAD_REQUEST, NOFOUND_REQUEST } from 'src/common/methods/handler.methods';
import schema from 'src/common/consts/schema';

@Injectable()
export class ProviderService {
  constructor(
    @InjectModel(Provider.name)
    private providerModel: Model<ProviderDocument>,
  ) { }

  async create(createProviderDto: CreateProviderDto): Promise<Provider> {
    try {
      createProviderDto.prov_id = await nanoid(24)
      createProviderDto.created_by = createProviderDto.user.preferred_username
      return await this.providerModel.create(createProviderDto)
    } catch (err) {
      BAD_REQUEST(err.message)
    }
  }

  async findAllByORQuery(query: UpdateProviderDto): Promise<Provider[]> {
    try {
      const keys = Object.keys(query)
      const pipelineStage1 = matchORPipeline(
        keys.map((e) => ({ "$eq": [`$${e}`, query[e]] }))
      )
      const pipelineStage2 = operatorLoopUp()
      const pipelineStage3 = providerGroupAndFormat()

      const result = await this.providerModel.aggregate([
        ...pipelineStage1,
        ...pipelineStage2,
        ...pipelineStage3
      ])
      // if (!result.length) NOFOUND_REQUEST("No provider found")
      return result
    } catch (err) {
      BAD_REQUEST(err.message)
    }
  }

  async findAllByANDQuery(query: UpdateProviderDto): Promise<Provider[]> {
    try {
      const keys = Object.keys(query)
      const pipelineStage1 = matchANDPipeline(
        keys.map((e) => ({ "$eq": [`$${e}`, query[e]] }))
      )
      const pipelineStage2 = operatorLoopUp()
      const pipelineStage3 = providerGroupAndFormat()

      const result = await this.providerModel.aggregate([
        ...pipelineStage1,
        ...pipelineStage2,
        ...pipelineStage3
      ])

      // if (!result.length) NOFOUND_REQUEST("No provider found")
      return result
    } catch (err) {
      BAD_REQUEST(err.message)
    }
  }

  async updateOne(prov_id: string, updateProviderDto: UpdateProviderDto): Promise<Provider[]> {
    try {
      // # Get
      const res = await this.findAllByANDQuery({ prov_id })
      if (res.length != 1) BAD_REQUEST("No provider exist")
      const [provider] = res

      // # Update
      const body = {
        prov_id,
        ...provider,
        ...updateProviderDto,
        schema_version: provider.schema_version + 1,
        updated: [
          ...provider.updated,
          { _by: 'user_id' }
        ]
      }
      await this.providerModel.updateOne({ prov_id }, body).exec();

      // # Get updated
      return await this.findAllByANDQuery({ prov_id })
    } catch (err) {
      BAD_REQUEST(err.message)
    }
  }
}
