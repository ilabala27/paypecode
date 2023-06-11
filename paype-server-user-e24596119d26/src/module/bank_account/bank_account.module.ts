import { Module } from '@nestjs/common';
import { BankAccountService } from './bank_account.service';
import { BankAccountBusinessController, BankAccountController, BankAccountUserController } from './bank_account.controller';
import { BankAccount } from './entities/bank_account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankAccountUserMapper } from './entities/mapper/user.bank_account.entity';
import { BankAccountBusinessMapper } from './entities/mapper/business.bank_account.entity';
import { BankAccountBusinessService, BankAccountUserService } from './mapper.service';

@Module({
  imports: [TypeOrmModule.forFeature([BankAccount, BankAccountUserMapper, BankAccountBusinessMapper])],
  controllers: [BankAccountController, BankAccountUserController, BankAccountBusinessController],
  providers: [BankAccountService, BankAccountUserService, BankAccountBusinessService]
})
export class BankAccountModule {}
