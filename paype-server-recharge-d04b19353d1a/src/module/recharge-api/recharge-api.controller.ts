import { Controller, Get, Body, Post, Query, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PlanApiService } from './services/meta/plan-api.service';
import { JSKRechargeApiService } from './services/partner/jsk-api.service';

@ApiTags('recharge-api')
@Controller('recharge-api')
export class RechargeApiController {
  constructor(
    private readonly planApiService: PlanApiService,
    private readonly jskRechargeApiService: JSKRechargeApiService,
  ) { }

  @Post('get-operator')
  getOperator(@Body() body: any) {
    return this.planApiService.getOperator(body);
  }

  @Post('get-hlr')
  getHLRCheck(@Body() body: any) {
    return this.planApiService.getHLRCheck(body);
  }

  @Post('get-plan')
  getPlan(@Body() body: any) {
    return this.planApiService.getPlan(body);
  }

  @Post('jsk/reacharge')
  getRechargeDone(@Body() body: any) {
    return this.jskRechargeApiService.getRechargeDone(body);
  }

  @Post('jsk/reacharge-status')
  getRechargeStatus(@Body() body: any) {
    return this.jskRechargeApiService.getRechargeStatus(body);
  }

}
