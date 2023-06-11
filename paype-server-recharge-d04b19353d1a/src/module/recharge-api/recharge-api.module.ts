import { Module } from '@nestjs/common';
import { ProviderModule } from '../entity/provider/provider.module';
import { RechargeApiController } from './recharge-api.controller';
import { PlanApiService } from './services/meta/plan-api.service';
import { JSKRechargeApiService } from './services/partner/jsk-api.service';

@Module({
  imports: [ProviderModule],
  controllers: [RechargeApiController],
  providers: [PlanApiService, JSKRechargeApiService],
  exports: [PlanApiService, JSKRechargeApiService]
})
export class RechargeApiModule { }
