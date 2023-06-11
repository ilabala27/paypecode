import { Module } from '@nestjs/common';
import { RechargeTransactionMakeService } from './recharge-transaction-make.service';
import { RechargeTransactionMakeController } from './recharge-transaction-make.controller';
import { CipherService } from 'src/common/cipher/cipher.service';
import { JSKRechargeApiService } from '../recharge-api/services/partner/jsk-api.service';
import { RechargeApiModule } from '../recharge-api/recharge-api.module';
import { RechargeTransactionModule } from '../recharge-transaction/recharge-transaction.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RechargeTransaction, RechargeTransactionSchema } from '../recharge-transaction/entities/recharge-transaction.entity';
import { ProviderModule } from '../entity/provider/provider.module';

@Module({
  imports: [RechargeApiModule, ProviderModule, MongooseModule.forFeature([{ name: RechargeTransaction.name, schema: RechargeTransactionSchema }])],
  controllers: [RechargeTransactionMakeController],
  providers: [RechargeTransactionMakeService, CipherService, JSKRechargeApiService]
})
export class RechargeTransactionMakeModule { }
