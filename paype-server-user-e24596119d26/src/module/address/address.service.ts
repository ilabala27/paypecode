import { Inject, Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto, CreateCountryDto, CreateStateDto, CreateDistrictDto, CreatePostalCodeDto } from './dto/create-address.dto';
import { UpdateAddressDto, UpdateCountryDto, UpdateStateDto, UpdateDistrictDto, UpdatePostalCodeDto } from './dto/update-address.dto';
import { Address, Country, District, PostalCode, State } from './entities/address.entity';
import { EventEmitter2 } from "@nestjs/event-emitter";
import { AddressServiceEvent } from './events/address.event';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private countryRepo: Repository<Country>,
  ) { }

  public async create(createCountryDto: CreateCountryDto) {
    const country: Country = new Country();
    return await this.countryRepo.save({ ...country, ...createCountryDto });
  }

  public async findAll() {
    return await this.countryRepo.find({ where: { is_deleted: false } })
  }

  public async findOne(id: number) {
    return await this.countryRepo.findOne({ where: { is_deleted: false, _id: id } })
  }

  public async update(id: number, updateCountryDto: UpdateCountryDto) {
    await this.countryRepo.update(
      { _id: id },
      { ...updateCountryDto }
    );
    return await this.findOne(id)
  }

  public async remove(id: number) {
    await this.countryRepo.update(
      { _id: id },
      { is_deleted: true, is_active: false }
    );
    return { success: true, message: "Deleted successfully" }
  }
}

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(State)
    private stateRepo: Repository<State>,
  ) { }

  public async create(createStateDto: CreateStateDto) {
    const state: State = new State();
    return await this.stateRepo.save({ ...state, ...createStateDto });
  }

  public async findAll() {
    return await this.stateRepo.find({ where: { is_deleted: false } })
  }

  public async findOne(id: number) {
    return await this.stateRepo.findOne({ where: { is_deleted: false, _id: id } })
  }

  public async update(id: number, updateStateDto: UpdateStateDto) {
    await this.stateRepo.update(
      { _id: id },
      { ...updateStateDto }
    );
    return await this.findOne(id)
  }

  public async remove(id: number) {
    await this.stateRepo.update(
      { _id: id },
      { is_deleted: true, is_active: false }
    );
    return { success: true, message: "Deleted successfully" }
  }
}

@Injectable()
export class DistrictService {
  constructor(
    @InjectRepository(District)
    private districtRepo: Repository<District>,
  ) { }

  public async create(createDistrictDto: CreateDistrictDto) {
    const district: District = new District();
    return await this.districtRepo.save({ ...district, ...createDistrictDto });
  }

  public async findAll() {
    return await this.districtRepo.find({ where: { is_deleted: false } })
  }

  public async findOne(id: number) {
    return await this.districtRepo.findOne({ where: { is_deleted: false, _id: id } })
  }

  public async update(id: number, updateDistrictDto: UpdateDistrictDto) {
    await this.districtRepo.update(
      { _id: id },
      { ...updateDistrictDto }
    );
    return await this.findOne(id)
  }

  public async remove(id: number) {
    await this.districtRepo.update(
      { _id: id },
      { is_deleted: true, is_active: false }
    );
    return { success: true, message: "Deleted successfully" }
  }
}

@Injectable()
export class PostalCodeService {
  constructor(
    @InjectRepository(PostalCode)
    private postalCodeRepo: Repository<PostalCode>,
  ) { }

  public async create(createPostalCodeDto: CreatePostalCodeDto) {
    const postalCode: PostalCode = new PostalCode();
    return await this.postalCodeRepo.save({ ...postalCode, ...createPostalCodeDto });
  }

  public async findAll() {
    return this.postalCodeRepo.createQueryBuilder('u')
      .leftJoinAndSelect('u.post_coun_id', 'country')
      .leftJoinAndSelect('u.post_stat_id', 'state')
      .leftJoinAndSelect('u.post_dist_id', 'district')
      .where('u.is_deleted = false')
      .andWhere('country.is_deleted = false')
      .andWhere('state.is_deleted = false')
      .andWhere('district.is_deleted = false')
      .select([
        'u.is_active', 'u._id', 'u.post_code', 'u.post_area',
        'country.is_active', 'country._id', 'country.coun_name',
        'state.is_active', 'state._id', 'state.stat_name',
        'district.is_active', 'district._id', 'district.dist_name',
      ])
      .getMany()
  }

  public async findOne(id: number) {
    return this.postalCodeRepo.createQueryBuilder('u')
      .leftJoinAndSelect('u.post_coun_id', 'country')
      .leftJoinAndSelect('u.post_stat_id', 'state')
      .leftJoinAndSelect('u.post_dist_id', 'district')
      .where('u._id = :id', { id: id })
      .andWhere('u.is_deleted = false')
      .andWhere('country.is_deleted = false')
      .andWhere('state.is_deleted = false')
      .andWhere('district.is_deleted = false')
      .select([
        'u.is_active', 'u._id', 'u.post_code', 'u.post_area',
        'country.is_active', 'country._id', 'country.coun_name',
        'state.is_active', 'state._id', 'state.stat_name',
        'district.is_active', 'district._id', 'district.dist_name',
      ])
      .getOne()
  }

  public async update(id: number, updatePostalCodeDto: UpdatePostalCodeDto) {
    await this.postalCodeRepo.update(
      { _id: id },
      { ...updatePostalCodeDto }
    );
    return await this.findOne(id)
  }

  public async remove(id: number) {
    await this.postalCodeRepo.update(
      { _id: id },
      { is_deleted: true, is_active: false }
    );
    return { success: true, message: "Deleted successfully" }
  }
}

@Injectable()
export class AddressService extends AddressServiceEvent {
  constructor(
    private readonly countryService: CountryService,
    private readonly stateService: StateService,
    private readonly districtService: DistrictService,
    private readonly postalCodeService: PostalCodeService,
    @InjectRepository(Address)
    private addressRepo: Repository<Address>,
    private eventEmitter: EventEmitter2,
  ) {
    super()
  }

  public async getAllAddressOptions() {
    const country = await this.countryService.findAll()
    const state = await this.stateService.findAll()
    const district = await this.districtService.findAll()
    const postal = await this.postalCodeService.findAll()
    return {
      country,
      state,
      district,
      postal
    }
  }

  public async create(createAddressDto: CreateAddressDto) {
    const address: Address = new Address();
    return await this.addressRepo.save({ ...address, ...createAddressDto }).then((res: Address)=>{
      this.eventEmitter.emit('address.created', { ...createAddressDto, ...res });
      return res      
    })
  }

  public async findAll() {
    return await this.addressRepo.find({ 
      where: { is_deleted: false }, 
      relations: ["addr_post_id"]
    })
  }

  public async findOne(id: number) {
    return await this.addressRepo.findOne({ where: { is_deleted: false, _id: id } })
  }

  public async findByFields(body: any) {
    return await this.addressRepo.find({ where: body })
  }

  public async update(id: number, updateAddressDto: UpdateAddressDto) {
    await this.addressRepo.update(
      { _id: id },
      { ...updateAddressDto }
    );
    return await this.findOne(id)
  }

  public async remove(id: number) {
    await this.addressRepo.update(
      { _id: id },
      { is_deleted: true, is_active: false }
    );
    return { success: true, message: "Deleted successfully" }
  }
}