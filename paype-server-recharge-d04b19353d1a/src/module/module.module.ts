import { Module } from "@nestjs/common";
import { RechargeApiModule } from "./recharge-api/recharge-api.module";
import { RechargeTransactionModule } from "./recharge-transaction/recharge-transaction.module";
import { RechargeTransactionMakeModule } from './recharge-transaction-make/recharge-transaction-make.module';
import { OperatorModule } from "./entity/operator/operator.module";
import { ProviderModule } from "./entity/provider/provider.module";
import { CommissionModule } from "./entity/commission/commission.module";

@Module({
  imports: [
    // # Entity
    OperatorModule,
    ProviderModule,
    CommissionModule,

    RechargeApiModule,
    RechargeTransactionModule,
    RechargeTransactionMakeModule,
  ]
})

export class ModuleModule { }
