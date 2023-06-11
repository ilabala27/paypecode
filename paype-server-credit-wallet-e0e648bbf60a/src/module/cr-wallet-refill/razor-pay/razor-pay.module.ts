import { Module } from '@nestjs/common';
import { RazorPayService } from './razor-pay.service';
import { RazorPayController } from './razor-pay.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RazorPay } from './entities/razor-pay.entity';
import { RazorPayTransactService } from './special-services/razor-pay-transact.service';
import { CrWalletCreditService } from 'src/module/cr-wallet/speical-services/cr-wallet-credit.service';
import { CipherService } from 'src/common/cipher/cipher.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RazorPay]),
  ],
  controllers: [RazorPayController],
  providers: [CipherService, CrWalletCreditService, RazorPayService, RazorPayTransactService]
})
export class RazorPayModule { }
