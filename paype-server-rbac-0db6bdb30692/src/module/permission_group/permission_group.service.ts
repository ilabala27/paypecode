import { Model, Types } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PermissionGroup, PermissionGroupDocument } from '../permission_group/entities/permission_group.entity';
import { CreatePermissionGroupDto } from './dto/create-permission_group.dto';
import { GetPermissionGroupDto, UpdatePermissionGroupDto, UpdatePermissionGroupParams } from './dto/update-permission_group.dto';
import { constructTreeLookup, queryMatch } from './permission_group.query';
const { ObjectId } = Types


@Injectable()
export class PermissionGroupService {
  constructor(
    @InjectModel(PermissionGroup.name)
    private permissionGroup: Model<PermissionGroupDocument>,
  ) { }

  async create(createPermissionGroupDto: CreatePermissionGroupDto | CreatePermissionGroupDto[]): Promise<PermissionGroup | PermissionGroup[]> {
    try {
      return await this.permissionGroup.create(createPermissionGroupDto)
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async findAll(): Promise<PermissionGroupDocument[]> {
    try {
      const body = {
        is_deleted: false
      }
      return await this.permissionGroup.find(body).exec();
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async findOneById(_id: string): Promise<PermissionGroupDocument> {
    try {
      const result = await this.permissionGroup.aggregate([
        queryMatch([
          { "$eq": ["$_id", new ObjectId(_id)] }
        ])
      ])
      if (!result.length) throw new NotFoundException("No record found")
      return result[0]
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async findAllByFields(permissionGroup: UpdatePermissionGroupDto & GetPermissionGroupDto): Promise<PermissionGroupDocument[]> {
    try {
      return await this.permissionGroup.find(permissionGroup).exec();
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async findAllByTree(_id: Types.ObjectId | string): Promise<PermissionGroupDocument[]> {
    try {
      const match = _id == "root" ? { "$eq": ["$pegr_name", "root"] }
        : { "$eq": ["$_id", new ObjectId(_id)] }
      return await this.permissionGroup.aggregate([
        queryMatch([match]),
        ...constructTreeLookup
      ])
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async update(params: UpdatePermissionGroupParams, updatePermissionGroupDto: UpdatePermissionGroupDto, returnType?: string): Promise<PermissionGroupDocument | string> {
    try {
      const { _id, user_id } = params
      const record = await this.findOneById(_id)
      const body = {
        ...updatePermissionGroupDto,
        schema_version: record.schema_version + 1,
        updated: [
          ...record.updated,
          { _by: user_id }
        ]
      }
      await this.permissionGroup.findByIdAndUpdate(_id, body).exec();
      return returnType == 'string' ? 'success' : await this.findOneById(_id)
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

}