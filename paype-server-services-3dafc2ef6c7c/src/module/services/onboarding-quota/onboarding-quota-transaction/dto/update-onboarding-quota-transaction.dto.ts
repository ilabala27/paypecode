import { PartialType } from '@nestjs/mapped-types';
import { IsStringRequired } from 'src/common/decorators/dto/datatype.decorator';
import { CreateOnboardingQuotaTransactionDto } from './create-onboarding-quota-transaction.dto';

export class UpdateOnboardingQuotaTransactionDto extends PartialType(CreateOnboardingQuotaTransactionDto) { }

export class updateOnboardingQuotaTransactionParams {
    @IsStringRequired({ name: "User id" })
    user_id: string;

    @IsStringRequired({ name: "onqu_id" })
    oqtr_id: string;
}