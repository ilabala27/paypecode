import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto, UpdateCategoryParams } from './dto/update-category.dto';
import { Category, CategoryDocument } from './entities/category.entity';
import { nanoid } from 'nanoid/async';
import { queryMatch } from './category.query';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private category: Model<CategoryDocument>,
  ) { }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      createCategoryDto.cate_id = await nanoid(24)
      return await this.category.create(createCategoryDto)
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async findAll(): Promise<Category[]> {
    try {
      const body = {
        is_deleted: false
      }
      return await this.category.find(body).exec();
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async findOneById(cate_id: string): Promise<Category> {
    try {
      const result = await this.category.aggregate([
        queryMatch([
          { "$eq": ["$cate_id", cate_id] }
        ])
      ])
      if (!result.length) throw new NotFoundException("No record found")
      return result[0]
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async findAllByFields(category: UpdateCategoryDto): Promise<Category[]> {
    try {
      return await this.category.find(category).exec();
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async update(params: UpdateCategoryParams, updateCategoryDto: UpdateCategoryDto, returnType?: string): Promise<Category | string> {
    try {
      const { cate_id, user_id } = params
      const record = await this.findOneById(cate_id)
      const body = {
        cate_id,
        ...updateCategoryDto,
        schema_version: record.schema_version + 1,
        updated: [
          ...record.updated,
          { _by: user_id }
        ]
      }
      await this.category.updateOne({ cate_id }, body).exec();
      return returnType == 'string' ? 'Successfully deleted' : await this.findOneById(cate_id)
    } catch (err) {
      throw new BadRequestException(err)
    }
  }
}
