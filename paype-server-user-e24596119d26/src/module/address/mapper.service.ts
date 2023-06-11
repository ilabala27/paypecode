import { Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressBusinessMapper } from './entities/mapper/business.address.entity';
import { AddressUserMapper } from './entities/mapper/user.address.entity';

@Injectable()
export class AddressUserService {
  constructor(
    @InjectRepository(AddressUserMapper)
    private addressUserMapperRepo: Repository<AddressUserMapper>,
  ) { }

  public async findAll() {
    return await this.addressUserMapperRepo.find({ 
      where: { is_deleted: false }, 
      relations: ["addr_id", "user_id"],
      select: ["_id", "is_active", "addr_id", "user_id"]
    })
  }

  public async findOne(id: number) {
    return await this.addressUserMapperRepo.findOne({ 
      where: { _id: id, is_deleted: false }, 
      relations: ["addr_id", "user_id"],
      select: ["_id", "is_active", "addr_id", "user_id"]
    })
  }

}

@Injectable()
export class AddressBusinessService {
  constructor(
    @InjectRepository(AddressBusinessMapper)
    private addressBusinessMapperRepo: Repository<AddressBusinessMapper>,
  ) { }

  public async findAll() {
    return await this.addressBusinessMapperRepo.find({ 
      where: { is_deleted: false }, 
      relations: ["addr_id", "busi_id"],
      select: ["_id", "is_active", "addr_id", "busi_id"]
    })
  }

  public async findOne(id: number) {
    return await this.addressBusinessMapperRepo.findOne({ 
      where: { _id: id, is_deleted: false }, 
      relations: ["addr_id", "busi_id"],
      select: ["_id", "is_active", "addr_id", "busi_id"]
    })
  }

}
