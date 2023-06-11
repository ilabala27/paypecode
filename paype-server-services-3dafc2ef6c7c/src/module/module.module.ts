import { Module } from "@nestjs/common";
import { CategoryModule } from "src/module/catalog/category/category.module";
import { ServicesModule } from './catalog/services/services.module';
import { OnboardingQuotaModule } from './services/onboarding-quota/onboarding-quota/onboarding-quota.module';
import { OnboardingQuotaTransactionModule } from './services/onboarding-quota/onboarding-quota-transaction/onboarding-quota-transaction.module';


@Module({
  imports: [
    CategoryModule,
    ServicesModule,
    OnboardingQuotaModule,
    OnboardingQuotaTransactionModule,
  ]
})

export class ModuleModule { }
