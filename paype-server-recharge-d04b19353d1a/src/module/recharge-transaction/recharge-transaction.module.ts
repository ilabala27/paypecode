import { Module } from '@nestjs/common';
import { RechargeTransactionService } from './recharge-transaction.service';
import { RechargeTransactionController } from './recharge-transaction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RechargeTransaction, RechargeTransactionSchema } from './entities/recharge-transaction.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RechargeTransaction.name, schema: RechargeTransactionSchema }])
  ],
  controllers: [RechargeTransactionController],
  providers: [RechargeTransactionService,],
  exports: [RechargeTransactionModule]
})
export class RechargeTransactionModule { }
