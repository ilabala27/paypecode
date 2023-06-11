import { Model, Types } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Permission, PermissionDocument } from '../permission/entities/permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { GetPermissionDto, UpdatePermissionDto, UpdatePermissionParams } from './dto/update-permission.dto';
import { constructTreeLookup, queryMatch } from './permission.query';
const { ObjectId } = Types


@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permission.name)
    private permission: Model<PermissionDocument>,
  ) { }

  async create(createPermissionDto: CreatePermissionDto | CreatePermissionDto[]): Promise<Permission | Permission[]> {
    try {
      return await this.permission.create(createPermissionDto)
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async findAll(): Promise<Permission[]> {
    try {
      const body = {
        is_deleted: false
      }
      return await this.permission.find(body).exec();
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async findOneById(_id: string): Promise<Permission> {
    try {
      const result = await this.permission.aggregate([
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

  async findAllByFields(permission: UpdatePermissionDto & GetPermissionDto): Promise<Permission[]> {
    try {
      return await this.permission.find(permission).exec();
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async findAllByTree(_id: Types.ObjectId | string): Promise<Permission[]> {
    try {
      const match =
        (_id == "root" || _id == 'root:services') ?
          { "$eq": ["$perm_name", _id] } : { "$eq": ["$_id", new ObjectId(_id)] }
      return await this.permission.aggregate([
        queryMatch([match]),
        ...constructTreeLookup
      ])
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async update(params: UpdatePermissionParams, updatePermissionDto: UpdatePermissionDto, returnType?: string): Promise<Permission | string> {
    try {
      const { _id, user_id } = params
      const record = await this.findOneById(_id)
      const body = {
        ...updatePermissionDto,
        schema_version: record.schema_version + 1,
        updated: [
          ...record.updated,
          { _by: user_id }
        ]
      }
      await this.permission.findByIdAndUpdate(_id, body).exec();
      return returnType == 'string' ? 'success' : await this.findOneById(_id)
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

}


/**
   
  {$graphLookup: {
    from: "permission",
    startWith: "$_id",
    connectFromField: "_id",
    connectToField: "perm_parent_id",
    maxDepth: 4,
    depthField: "level",
    as: "childrens",
  }}
  
 */