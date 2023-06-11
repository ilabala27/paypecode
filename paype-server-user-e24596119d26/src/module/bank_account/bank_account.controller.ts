import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BankAccountService } from './bank_account.service';
import { CreateBankAccountDto } from './dto/create-bank_account.dto';
import { UpdateBankAccountDto } from './dto/update-bank_account.dto';
import { BankAccountBusinessService, BankAccountUserService } from './mapper.service';

@ApiTags('bank-account/book')
@Controller('bank-account/book')
export class BankAccountController {
  constructor(private readonly bankAccountService: BankAccountService) {}

  @Post()
  create(@Body() createBankAccountDto: CreateBankAccountDto) {
    return this.bankAccountService.create(createBankAccountDto);
  }

  @Get()
  findAll() {
    return this.bankAccountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bankAccountService.findOne(+id);
  }

  @Post('by-fields')
  findByFields(@Body() body: any) {
    return this.bankAccountService.findByFields(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBankAccountDto: UpdateBankAccountDto) {
    return this.bankAccountService.update(+id, updateBankAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bankAccountService.remove(+id);
  }
}

@ApiTags('bank-account/user')
@Controller('bank-account/user')
export class BankAccountUserController {
  constructor(private readonly bankAccountUserService: BankAccountUserService) { }

  @Get()
  findAll() {
    return this.bankAccountUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bankAccountUserService.findOne(+id);
  }
  
}

@ApiTags('bank-account/business')
@Controller('bank-account/business')
export class BankAccountBusinessController {
  constructor(private readonly bankAccountBusinessService: BankAccountBusinessService) { }

  @Get()
  findAll() {
    return this.bankAccountBusinessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bankAccountBusinessService.findOne(+id);
  }
  
}