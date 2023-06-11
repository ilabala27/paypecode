import { Controller, Get, Query, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrWalletTransactionService } from './cr-wallet-transaction.service';

@ApiTags('cr-wallet-transaction')
@Controller('cr-wallet-transaction')
export class CrWalletTransactionController {
  constructor(
    private readonly crWalletTransactionService: CrWalletTransactionService
  ) { }

  @Get('query')
  findAllByQuery(@Query() query: any) {
    const { type } = query ?? {}
    if (type == "all") return this.crWalletTransactionService.findAllByQuery(query);
    return this.crWalletTransactionService.findOneByQuery(query);
  }

}
