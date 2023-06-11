import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto, UpdateServiceParams } from './dto/update-service.dto';
import { Services, ServicesDocument } from './entities/service.entity';
import { nanoid } from 'nanoid/async';
import { queryForcategoryAndServices, queryMatch } from './services.query';
import { Category, CategoryDocument } from '../category/entities/category.entity';
import schema from 'src/common/consts/schema';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Services.name)
    private services: Model<ServicesDocument>,
    @InjectModel(Category.name)
    private category: Model<CategoryDocument>,
  ) { }

  async create(createServicesDto: CreateServiceDto): Promise<Services> {
    try {
      createServicesDto.serv_id = await nanoid(24)
      return await this.services.create(createServicesDto)
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async findAll(): Promise<Services[]> {
    try {
      const body = {
        is_deleted: false
      }
      return await this.services.find(body).exec();
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async findAllWithCategory(): Promise<Services[]> {
    try {
      return await this.services.aggregate(queryForcategoryAndServices())
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async findOneById(serv_id: string): Promise<Services> {
    try {
      const result = await this.services.aggregate([
        queryMatch([
          { "$eq": ["$serv_id", serv_id] }
        ])
      ])
      if (!result.length) throw new NotFoundException("No record found")
      return result[0]
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async findAllByFields(services: UpdateServiceDto): Promise<Services[]> {
    try {
      return await this.services.find(services).exec();
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async update(params: UpdateServiceParams, updateServicesDto: UpdateServiceDto, returnType?: string): Promise<Services | string> {
    try {
      const { serv_id, user_id } = params
      const record = await this.findOneById(serv_id)
      const body = {
        serv_id,
        ...updateServicesDto,
        schema_version: record.schema_version + 1,
        updated: [
          ...record.updated,
          { _by: user_id }
        ]
      }
      await this.services.updateOne({ serv_id }, body).exec();
      return returnType == 'string' ? 'Successfully deleted' : await this.findOneById(serv_id)
    } catch (err) {
      throw new BadRequestException(err)
    }
  }
}
