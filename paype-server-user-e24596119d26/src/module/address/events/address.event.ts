import { Injectable } from '@nestjs/common';
import { OnEvent } from "@nestjs/event-emitter";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressBusinessMapper } from '../entities/mapper/business.address.entity';
import { AddressUserMapper } from '../entities/mapper/user.address.entity';

@Injectable()
export class AddressServiceEvent {
  @InjectRepository(AddressUserMapper)
  private addressUserMapperRepo: Repository<AddressUserMapper>
  @InjectRepository(AddressBusinessMapper)
  private addressBusinessMapperRepo: Repository<AddressBusinessMapper>

  @OnEvent('address.created')
  AddressCreated(data) {
    const { addr_ref, addr_ref_id, _id } = data
    let payload: any = { addr_id: _id }
    switch (addr_ref) {
      case "user":
        payload.user_id = addr_ref_id
        this.createUserAddress(payload)
        break
      case "business":
        payload.busi_id = addr_ref_id
        this.createBusinessAddress(payload)
        break
      default: null
    }
  }

  public async createUserAddress(payload: AddressUserMapper) {
    const addressUser: AddressUserMapper = new AddressUserMapper();
    return await this.addressUserMapperRepo.save({ ...addressUser, ...payload })
  }

  public async createBusinessAddress(payload: AddressBusinessMapper) {
    const addressBusiness: AddressBusinessMapper = new AddressBusinessMapper();
    return await this.addressBusinessMapperRepo.save({ ...addressBusiness, ...payload })
  }

}