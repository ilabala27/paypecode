import { Module } from '@nestjs/common';
import { OnboardingQuotaTransactionService } from './onboarding-quota-transaction.service';
import { OnboardingQuotaTransactionController } from './onboarding-quota-transaction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OnboardingQuotaTransaction, OnboardingQuotaTransactionSchema } from './entities/onboarding-quota-transaction.entity';
import { OnboardingQuotaModule } from '../onboarding-quota/onboarding-quota.module';
import { CipherService } from 'src/common/cipher/cipher.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.get('HTTP_TIMEOUT'),
        maxRedirects: configService.get('HTTP_MAX_REDIRECTS'),
      }),
      inject: [ConfigService],
    }),
    OnboardingQuotaModule,
    MongooseModule.forFeature([{ name: OnboardingQuotaTransaction.name, schema: OnboardingQuotaTransactionSchema }])
  ],
  controllers: [OnboardingQuotaTransactionController],
  providers: [OnboardingQuotaTransactionService, CipherService]
})
export class OnboardingQuotaTransactionModule { }
