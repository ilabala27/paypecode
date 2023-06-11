import { BadRequestException, forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { selectAllColumn } from 'src/common/methods/typeorm.method';
import { Like, Repository } from 'typeorm';
import { CreateUserDto, IFindOnBoardingStatus } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { Business } from '../business/entities/business.entity';
import { Address } from '../address/entities/address.entity';
import { AddressUserMapper } from '../address/entities/mapper/user.address.entity';
import { AddressBusinessMapper } from '../address/entities/mapper/business.address.entity';
import { BankAccount } from '../bank_account/entities/bank_account.entity';
import { BankAccountUserMapper } from '../bank_account/entities/mapper/user.bank_account.entity';
import { Document } from '../document/entities/document.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { nanoid } from 'nanoid/async';
import { UserServiceEvent } from './events/user.event';
import { AwsAuthService } from '../aws-auth/aws-auth.service';
import { userDefaultQuery } from './user.query';

@Injectable()
export class UserService extends UserServiceEvent {
  constructor(
    @Inject(ConfigService)
    public readonly config: ConfigService,
    @Inject(forwardRef(() => AwsAuthService))
    public readonly awsAuthService: AwsAuthService,
    @InjectRepository(User)
    public userRepo: Repository<User>,
    public eventEmitter: EventEmitter2,
  ) {
    super(config, awsAuthService)
  }

  public async create(createUserDto: CreateUserDto, headers: any) {
    try {
      const userExist = await (await this.findOneByMobile(createUserDto.user_mobile_no));
      if (userExist?._id && userExist?.is_deleted) {
        throw new BadRequestException("User account already blocked")
      } else if (userExist?._id) {
        throw new BadRequestException("User account already exist")
      }

      createUserDto.user_id = await nanoid(24)
      if (createUserDto.user_password)
        createUserDto.user_password = await bcrypt.hash(createUserDto.user_password, parseInt(this.config.get<string>('SALT')));

      const userRaw: User = Object.assign(new User(), createUserDto);
      const user = await this.userRepo.save(userRaw)
      this.eventEmitter.emit('user.created-by-admin', user, headers);
      return user
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  public async findAll() {
    try {
      return await this.userRepo.find({})
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  public async findOneByMobile(user_mobile_no: string) {
    try {
      return await this.userRepo.findOne({ where: { user_mobile_no }, select: selectAllColumn(this.userRepo) })
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  public async findOneByAwsId(user_aws_id: string) {
    try {
      return await this.userRepo.findOne({ where: { user_aws_id }, select: selectAllColumn(this.userRepo) })
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  public async findOneById(id: number) {
    try {
      return await this.userRepo.findOne({ where: { is_deleted: false, _id: id } })
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  public async findOneByUserId(id: number) {
    try {
      return await this.userRepo.findOne({ where: { is_deleted: false, _id: id } })
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  public async findByFields(body: any) {
    try {
      const { orderBy = {}, ...restBody } = body
      if (restBody.user_created_by_chain) {
        restBody.user_created_by_chain = Like(`%${restBody.user_created_by_chain}%`)
      }
      return await this.userRepo.find({ where: restBody, order: orderBy })
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateById(id: number, updateUserDto: UpdateUserDto, headers: any) {
    try {
      const { activateWallet, ...body } = updateUserDto
      await this.userRepo.update(
        { _id: id },
        { ...body }
      );
      const user = await this.findOneById(id)
      if (activateWallet && headers) {
        this.eventEmitter.emit('user.activate-wallet', user, headers);
      }
      return user
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateByFields(cond: any, body: any) {
    try {
      await this.userRepo.update(cond, body)
      return await this.findByFields(cond)
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  public async remove(id: number) {
    try {
      await this.userRepo.update(
        { _id: id },
        { is_deleted: true, is_active: false }
      );
      return { success: true, message: "Deleted successfully" }
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  public async findOnBoardingStatus({ id, user_id }: IFindOnBoardingStatus) {
    try {
      return await this.userRepo.createQueryBuilder('user')
        .andWhere('user.is_deleted = false')
        .andWhere(userDefaultQuery, { id, user_id })
        // .andHaving(`user.user_id = ${user_id}`)
        .leftJoinAndMapOne('user.business', Business, 'busi', 'busi.busi_user_id = user._id')
        .leftJoinAndMapOne('user.address_user_mapper', AddressUserMapper, 'au_m', 'au_m.user_id = user._id')
        .leftJoinAndMapOne('user.address_user', Address, 'addr_user', 'addr_user._id = au_m.addr_id')
        .leftJoinAndMapOne('user.address_business_mapper', AddressBusinessMapper, 'ab_m', 'ab_m.busi_id = busi._id')
        .leftJoinAndMapOne('user.address_business', Address, 'addr_business', 'addr_business._id = ab_m.addr_id')
        .leftJoinAndMapOne('user.bank_mapper', BankAccountUserMapper, 'bu_m', 'bu_m.user_id = user._id')
        .leftJoinAndMapOne('user.bank', BankAccount, 'bank', 'bank._id = bu_m.bank_acco_id')
        .leftJoinAndMapMany('user.documents', Document, 'docu', 'docu.docu_user_id = user._id')
        .leftJoinAndMapOne('user.user_created', User, 'user_created', 'user_created._id = user.user_created_by')
        .leftJoinAndMapOne('user.super_distributor', User, 'super_distributor', 'super_distributor.user_id = user.user_super_distributor')
        .leftJoinAndMapOne('user.org', User, 'org', 'org.user_id = user.user_org')
        .leftJoinAndMapOne('user.distributor', User, 'distributor', 'distributor.user_id = user.user_distributor')
        .leftJoinAndMapOne('user.user_kyc_verified', User, 'user_kyc_verified', 'user_kyc_verified._id = user.user_kyc_verified_by')
        .leftJoinAndMapOne('user.user_account_verified', User, 'user_account_verified', 'user_account_verified._id = user.user_account_verified_by')
        .select([
          'user', 'busi',
          'au_m', 'addr_user',
          'ab_m', 'addr_business',
          'bu_m', 'bank',
          'docu',
          'user_created.user_name',
          'user_created.user_email',
          'user_created.user_mobile_ex',
          'user_created.user_mobile_no',
          'user_created.user_contact_no',
          'user_created.user_image',
          'org', 'super_distributor', 'distributor',
          'user_kyc_verified.user_name',
          'user_kyc_verified.user_email',
          'user_kyc_verified.user_mobile_ex',
          'user_kyc_verified.user_mobile_no',
          'user_kyc_verified.user_contact_no',
          'user_kyc_verified.user_image',
          'user_account_verified.user_name',
          'user_account_verified.user_email',
          'user_account_verified.user_mobile_ex',
          'user_account_verified.user_mobile_no',
          'user_account_verified.user_contact_no',
          'user_account_verified.user_image',
        ])
        .getOne()
      // .andWhere('u.is_deleted = false')
      // .andWhere('u._id = id')
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

}

/*
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
*/
