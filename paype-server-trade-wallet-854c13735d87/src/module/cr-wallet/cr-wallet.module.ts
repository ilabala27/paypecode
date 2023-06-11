import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrWallet } from './entities/cr-wallet.entity';
import { CrWalletService } from './cr-wallet.service';
import { CrWalletDebitService } from './speical-services/cr-wallet-debit.service';
import { CrWalletCreditService } from './speical-services/cr-wallet-credit.service';
import { CrWalletController } from './cr-wallet.controller';
import { CipherService } from '../../common/cipher/cipher.service';

@Module({
  imports: [TypeOrmModule.forFeature([CrWallet])],
  controllers: [CrWalletController],
  providers: [
    CrWalletService,
    CrWalletDebitService,
    CrWalletCreditService,
    CipherService,
  ]
})
export class CrWalletModule { }
