import { Model, Types } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Role, RoleDocument } from '../role/entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { GetRoleDto, UpdateRoleDto, UpdateRoleParams } from './dto/update-role.dto';
import { constructTreeLookup, queryMatch } from './role.query';
const { ObjectId } = Types


@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name)
    private role: Model<RoleDocument>,
  ) { }

  async create(createRoleDto: CreateRoleDto | CreateRoleDto[]): Promise<Role | Role[]> {
    try {
      return await this.role.create(createRoleDto)
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async findAll(): Promise<RoleDocument[]> {
    try {
      const body = {
        is_deleted: false
      }
      return await this.role.find(body).exec();
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async findOneById(_id: string): Promise<RoleDocument> {
    try {
      const result = await this.role.aggregate([
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

  async findAllByFields(role: UpdateRoleDto & GetRoleDto): Promise<RoleDocument[]> {
    try {
      return await this.role.find(role).exec();
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async findAllByTree(_id: Types.ObjectId | string): Promise<RoleDocument[]> {
    try {
      const match = _id == "root" ? { "$eq": ["$role_name", "root"] }
        : { "$eq": ["$_id", new ObjectId(_id)] }
      return await this.role.aggregate([
        queryMatch([match]),
        ...constructTreeLookup
      ])
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async update(params: UpdateRoleParams, updateRoleDto: UpdateRoleDto, returnType?: string): Promise<RoleDocument | string> {
    try {
      const { _id, user_id } = params
      const record = await this.findOneById(_id)
      const body = {
        ...updateRoleDto,
        schema_version: record.schema_version + 1,
        updated: [
          ...record.updated,
          { _by: user_id }
        ]
      }
      await this.role.findByIdAndUpdate(_id, body).exec();
      return returnType == 'string' ? 'success' : await this.findOneById(_id)
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

}