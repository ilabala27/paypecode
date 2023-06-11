import { Controller, Get, Post, Body, Patch, Param, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { cipherDto } from 'src/common/cipher/cipher.dto';
import { CrWalletService } from './cr-wallet.service';
import { CrWalletCreditService } from './speical-services/cr-wallet-credit.service';
import { CrWalletDebitService } from './speical-services/cr-wallet-debit.service';
import { CreateCrWalletDto } from './dto/create-cr-wallet.dto';

@ApiTags('trade-wallet')
@Controller('trade-wallet')
export class CrWalletController {
  constructor(
    private readonly crWalletService: CrWalletService,
    private readonly crWalletDebitService: CrWalletDebitService,
    private readonly crWalletCreditService: CrWalletCreditService,
  ) { }

  @Post()
  create(@Body() createCrWalletDto: CreateCrWalletDto) {
    return this.crWalletService.create(createCrWalletDto);
  }

  @Patch('/activate/:user_id')
  activateCrWalletByUserId(@Param('user_id') user_id: string) {
    return this.crWalletService.activateCrWalletByUserId(user_id);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.crWalletService.findOneById(id);
  }

  @Get('user/:user_id')
  findOneByUserId(@Param('user_id') user_id: string) {
    return this.crWalletService.findOneByUserId(user_id);
  }

  @Get('user/:user_id/balance')
  getWalletBalanceByUserId(@Param('user_id') user_id: string) {
    return this.crWalletService.getWalletBalanceByUserId(user_id);
  }

  // ### Speical services
  @Post('user/:user_id/transaction/debit')
  debitService(@Param('user_id') user_id: string, @Body() transactionDto: cipherDto) {
    return this.crWalletDebitService.debitService(transactionDto);
  }

  @Post('user/:user_id/transaction/credit')
  creditService(@Param('user_id') user_id: string, @Body() transactionDto: cipherDto) {
    return this.crWalletCreditService.creditService(transactionDto);
  }

}
