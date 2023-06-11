import { Module } from '@nestjs/common';
import { CrWalletModule } from './cr-wallet/cr-wallet.module';
import { CrWalletTransactionModule } from './cr-wallet-transaction/cr-wallet-transaction.module';
import { CashDepositModule } from './cr-wallet-refill/cash-deposit/cash-deposit.module';
import { RazorPayModule } from './cr-wallet-refill/razor-pay/razor-pay.module';

@Module({
  imports: [
    CrWalletModule,
    CrWalletTransactionModule,
    CashDepositModule,
    RazorPayModule,
  ]
})
export class ModuleModule { }
