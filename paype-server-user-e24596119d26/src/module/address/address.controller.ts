import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddressService, CountryService, StateService, DistrictService, PostalCodeService } from './address.service';
import { CreateAddressDto, CreateCountryDto, CreateStateDto, CreateDistrictDto, CreatePostalCodeDto } from './dto/create-address.dto';
import { UpdateAddressDto, UpdateCountryDto, UpdateStateDto, UpdateDistrictDto, UpdatePostalCodeDto } from './dto/update-address.dto';
import { AddressBusinessService, AddressUserService } from './mapper.service';

@ApiTags('address/country')
@Controller('address/country')
export class CountryController {
  constructor(private readonly countryService: CountryService) { }

  @Post()
  create(@Body() createCountryDto: CreateCountryDto) {
    return this.countryService.create(createCountryDto);
  }

  @Get()
  findAll() {
    return this.countryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.countryService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCountryDto: UpdateCountryDto) {
    return this.countryService.update(+id, updateCountryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.countryService.remove(+id);
  }
}

@ApiTags('address/state')
@Controller('address/state')
export class StateController {
  constructor(private readonly stateService: StateService) { }

  @Post()
  create(@Body() createStateDto: CreateStateDto) {
    return this.stateService.create(createStateDto);
  }

  @Get()
  findAll() {
    return this.stateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stateService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateStateDto: UpdateStateDto) {
    return this.stateService.update(+id, updateStateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stateService.remove(+id);
  }
}

@ApiTags('address/district')
@Controller('address/district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) { }

  @Post()
  create(@Body() createDistrictDto: CreateDistrictDto) {
    return this.districtService.create(createDistrictDto);
  }

  @Get()
  findAll() {
    return this.districtService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.districtService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDistrictDto: UpdateDistrictDto) {
    return this.districtService.update(+id, updateDistrictDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.districtService.remove(+id);
  }
}

@ApiTags('address/postal-code')
@Controller('address/postal-code')
export class PostalCodeController {
  constructor(private readonly postalCodeService: PostalCodeService) { }

  @Post()
  create(@Body() createPostalCodeDto: CreatePostalCodeDto) {
    return this.postalCodeService.create(createPostalCodeDto);
  }

  @Get()
  findAll() {
    return this.postalCodeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postalCodeService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePostalCodeDto: UpdatePostalCodeDto) {
    return this.postalCodeService.update(+id, updatePostalCodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postalCodeService.remove(+id);
  }
}

@ApiTags('address/book')
@Controller('address/book')
export class AddressController {
  constructor(private readonly addressService: AddressService) { }

  @Get('/options')
  getAllAddressOptions() {
    return this.addressService.getAllAddressOptions();
  }

  @Post()
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @Get()
  findAll() {
    return this.addressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(+id);
  }

  @Post('by-fields')
  findByFields(@Body() body: any) {
    return this.addressService.findByFields(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(+id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressService.remove(+id);
  }
}

@ApiTags('address/user')
@Controller('address/user')
export class AddressUserController {
  constructor(private readonly addressUserService: AddressUserService) { }

  @Get()
  findAll() {
    return this.addressUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressUserService.findOne(+id);
  }
  
}

@ApiTags('address/business')
@Controller('address/business')
export class AddressBusinessController {
  constructor(private readonly addressBusinessService: AddressBusinessService) { }

  @Get()
  findAll() {
    return this.addressBusinessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressBusinessService.findOne(+id);
  }
  
}