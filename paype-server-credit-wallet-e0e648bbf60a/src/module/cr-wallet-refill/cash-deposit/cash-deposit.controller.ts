import { Controller, Get, Post, Body, Param, Delete, Put, Query, Headers, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { cipherDto } from 'src/common/cipher/cipher.dto';
import { CashDepositService } from './cash-deposit.service';
import { CreateCashDepositDto } from './dto/create-cash-deposit.dto';
import { UpdateCashDepositDto } from './dto/update-cash-deposit.dto';
import { CashDepositTransactService } from './special-services/cash-deposit-transact.service';

@ApiTags('cash-deposit')
@Controller('cash-deposit')
export class CashDepositController {
  constructor(
    private readonly cashDepositService: CashDepositService,
    private readonly cashDepositTransactService: CashDepositTransactService
  ) { }

  @Post()
  create(@Body() createCashDepositDto: CreateCashDepositDto) {
    return this.cashDepositService.create(createCashDepositDto);
  }

  @Get()
  findAll() {
    return this.cashDepositService.findAll();
  }

  @Get('deposits/query')
  findAllByQuery(@Query() query: object) {
    return this.cashDepositService.findAllByQuery(query);
  }

  @Get('deposit/query')
  findOneByQuery(@Query() query: object) {
    return this.cashDepositService.findOneByQuery(query);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCashDepositDto: UpdateCashDepositDto) {
    return this.cashDepositService.update(id, updateCashDepositDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cashDepositService.remove(+id);
  }

  // ### Speical services
  @Post('transact/:_id/:status')
  cashDepositTransaction(
    @Headers() headers: any,
    @Param() query: any,
    @Body() transactionDto: cipherDto
  ) {
    return this.cashDepositTransactService.cashDepositTransaction(headers, query, transactionDto);
  }
  
}