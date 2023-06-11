import { Module } from '@nestjs/common';
import { CountryService, AddressService, StateService, DistrictService, PostalCodeService } from './address.service';
import { CountryController, AddressController, StateController, DistrictController, PostalCodeController, AddressUserController, AddressBusinessController } from './address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address, Country, District, PostalCode, State } from './entities/address.entity';
import { AddressUserMapper } from './entities/mapper/user.address.entity';
import { AddressBusinessMapper } from './entities/mapper/business.address.entity';
import { AddressBusinessService, AddressUserService } from './mapper.service';

@Module({
  imports: [TypeOrmModule.forFeature([Country, State, District, PostalCode, Address, AddressUserMapper, AddressBusinessMapper])],
  controllers: [AddressController, CountryController, StateController, DistrictController, PostalCodeController, AddressUserController, AddressBusinessController],
  providers: [AddressService, CountryService, StateService, DistrictService, PostalCodeService, AddressUserService, AddressBusinessService]
})
export class AddressModule { }
