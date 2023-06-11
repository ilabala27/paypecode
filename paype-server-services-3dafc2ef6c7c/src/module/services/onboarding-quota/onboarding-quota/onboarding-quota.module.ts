import { Module } from '@nestjs/common';
import { OnboardingQuotaService } from './onboarding-quota.service';
import { OnboardingQuotaController } from './onboarding-quota.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OnboardingQuota, OnboardingQuotaSchema } from './entities/onboarding-quota.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: OnboardingQuota.name, schema: OnboardingQuotaSchema }])],
  controllers: [OnboardingQuotaController],
  providers: [OnboardingQuotaService],
  exports: [OnboardingQuotaService]
})
export class OnboardingQuotaModule { }
