import { Module } from '@nestjs/common';
import { CrWalletModule } from './cr-wallet/cr-wallet.module';
import { CrWalletTransactionModule } from './cr-wallet-transaction/cr-wallet-transaction.module';

@Module({
  imports: [
    CrWalletModule,
    CrWalletTransactionModule,
  ]
})
export class ModuleModule { }
