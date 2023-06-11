import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CashDeposit } from './entities/cash-deposit.entity';
import { CashDepositController } from './cash-deposit.controller';
import { CrWalletCreditService } from 'src/module/cr-wallet/speical-services/cr-wallet-credit.service';
import { CashDepositService } from './cash-deposit.service';
import { CashDepositTransactService } from './special-services/cash-deposit-transact.service';
import { CipherService } from 'src/common/cipher/cipher.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CashDeposit]),
  ],
  controllers: [CashDepositController],
  providers: [CrWalletCreditService, CashDepositService, CashDepositTransactService, CipherService,]
})
export class CashDepositModule { }
