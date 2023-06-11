import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OnboardingQuotaService } from './onboarding-quota.service';
import { CreateOnboardingQuotaDto } from './dto/create-onboarding-quota.dto';
import { UpdateOnboardingParams, UpdateOnboardingQuotaDto } from './dto/update-onboarding-quota.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('onboarding-quota')
@Controller('onboarding-quota')
export class OnboardingQuotaController {
  constructor(private readonly onboardingQuotaService: OnboardingQuotaService) { }
  @Post()
  create(@Body() createCategoryDto: CreateOnboardingQuotaDto) {
    return this.onboardingQuotaService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.onboardingQuotaService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.onboardingQuotaService.findOneById(id);
  }

  @Post('fields')
  findAllByFields(@Body() category: UpdateOnboardingQuotaDto) {
    return this.onboardingQuotaService.findAllByFields(category);
  }

  @Patch('/:user_id/:onqu_id')
  update(@Param() params: UpdateOnboardingParams, @Body() UpdateOnboardingQuotaDto: UpdateOnboardingQuotaDto) {
    return this.onboardingQuotaService.update(params, UpdateOnboardingQuotaDto);
  }

  @Patch('/use-quota')
  useQuotaForOnboarding(@Body() updateOnboardingQuotaDto: UpdateOnboardingQuotaDto) {
    return this.onboardingQuotaService.useQuotaForOnboarding(updateOnboardingQuotaDto);
  }

  @Delete('/:user_id/:onqu_id')
  remove(@Param() params: UpdateOnboardingParams) {
    const body = {
      "is_active": false,
      "is_deleted": true
    }
    return this.onboardingQuotaService.update(params, body, 'string');
  }
}
