import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrWalletTransaction } from './entities/cr-wallet-transaction.entity';
import { CrWalletTransactionService } from './cr-wallet-transaction.service';
import { CrWalletTransactionController } from './cr-wallet-transaction.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CrWalletTransaction])],
  controllers: [CrWalletTransactionController],
  providers: [CrWalletTransactionService]
})
export class CrWalletTransactionModule { }
