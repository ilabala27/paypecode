import { PartialType } from '@nestjs/mapped-types';
import { IsStringRequired } from 'src/common/decorators/dto/datatype.decorator';
import { CreateOnboardingQuotaDto } from './create-onboarding-quota.dto';

export class UpdateOnboardingQuotaDto extends PartialType(CreateOnboardingQuotaDto) { }

export class UpdateOnboardingParams {
    @IsStringRequired({ name: "User id" })
    user_id: string;

    @IsStringRequired({ name: "onqu_id" })
    onqu_id: string;
}