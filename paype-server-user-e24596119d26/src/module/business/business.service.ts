import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { Business } from './entities/business.entity';
import { partnerLicense } from './pdf-template/partner-license';


@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Business)
    private businessRepo: Repository<Business>
  ) { }

  public async create(createBusinessDto: CreateBusinessDto) {
    const business: Business = new Business();
    return await this.businessRepo.save({ ...business, ...createBusinessDto });
  }

  public async findAll() {
    return await this.businessRepo.find({
      where: { is_deleted: false }
    })
  }

  public async findOne(id: number) {
    return await this.businessRepo.findOne({
      where: { _id: id, is_deleted: false }
    })
  }

  public async getPartnerLicense(user_id: number) {
    const business = await this.businessRepo.findOne({
      where: { busi_user_id: user_id, is_deleted: false }
    })
    if (business) {
      return partnerLicense(business)
    }

    throw new HttpException({ message: `Something went wrong` }, HttpStatus.BAD_REQUEST);
  }

  public async findByFields(body: any) {
    return await this.businessRepo.find({ where: body })
  }

  public async update(id: number, updateAddressDto: UpdateBusinessDto) {
    await this.businessRepo.update(
      { _id: id },
      { ...updateAddressDto }
    );
    return await this.findOne(id)
  }

  public async remove(id: number) {
    await this.businessRepo.update(
      { _id: id },
      { is_deleted: true, is_active: false }
    );
    return { success: true, message: "Deleted successfully" }
  }
}


/**

  Ref: Dont delete
  public async findOne(id: number) {
    return await this.businessRepo.findOne({ 
      where: { _id: id, is_deleted: false },
      relations: ["busi_user_id"]
    })
  }
 
 */