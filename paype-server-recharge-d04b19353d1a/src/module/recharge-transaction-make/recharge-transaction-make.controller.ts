import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, Query } from '@nestjs/common';
import { RechargeTransactionMakeService } from './recharge-transaction-make.service';
import { JWTGrantGuard } from 'src/common/middleware/grant/default.grant';

@Controller('recharge-transaction-make')
export class RechargeTransactionMakeController {
  constructor(private readonly rechargeTransactionMakeService: RechargeTransactionMakeService) { }

  // JSK end points
  @Post('now')
  makeNow(@Headers() headers: any, @Body() createCategoryDto: any) {
    return this.rechargeTransactionMakeService.makeNow(headers, createCategoryDto);
  }

  @JWTGrantGuard()
  @Get('jsk/callback')
  jskCallback(@Query() query) {
    return this.rechargeTransactionMakeService.jskCallback(query);
  }


}
