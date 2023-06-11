import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BusinessModule } from './business/business.module';
import { AddressModule } from './address/address.module';
import { BankAccountModule } from './bank_account/bank_account.module';
import { AwsAuthModule } from './aws-auth/aws-auth.module';
import { S3Module } from './s3/s3.module';
import { DocumentModule } from './document/document.module';
import { FCMModule } from './fcm/fcm.module';

@Module({
  imports: [
    AwsAuthModule, UserModule, BusinessModule,
    AddressModule, BankAccountModule, DocumentModule,
    S3Module, FCMModule
  ]
})
export class ModuleModule { }
