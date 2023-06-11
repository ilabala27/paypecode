import { Controller, Get, Post, Body, Patch, Param, Delete, Header, Headers } from '@nestjs/common';
import { OnboardingQuotaTransactionService } from './onboarding-quota-transaction.service';
import { CreateOnboardingQuotaTransactionDto } from './dto/create-onboarding-quota-transaction.dto';
import { UpdateOnboardingQuotaTransactionDto, updateOnboardingQuotaTransactionParams } from './dto/update-onboarding-quota-transaction.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('onboarding-quota-transaction')
@Controller('onboarding-quota-transaction')
export class OnboardingQuotaTransactionController {
  constructor(private readonly onboardingQuotaTransactionService: OnboardingQuotaTransactionService) { }

  @Post()
  create(@Headers() headers: any, @Body() createCategoryDto: CreateOnboardingQuotaTransactionDto) {
    return this.onboardingQuotaTransactionService.create(headers, createCategoryDto);
  }

  @Get()
  findAll() {
    return this.onboardingQuotaTransactionService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.onboardingQuotaTransactionService.findOneById(id);
  }

  @Post('fields')
  findAllByFields(@Body() category: UpdateOnboardingQuotaTransactionDto) {
    return this.onboardingQuotaTransactionService.findAllByFields(category);
  }

  @Patch('/:user_id/:oqtr_id')
  update(@Param() params: updateOnboardingQuotaTransactionParams, @Body() updateOnboardingQuotaTransactionDto: UpdateOnboardingQuotaTransactionDto) {
    return this.onboardingQuotaTransactionService.update(params, updateOnboardingQuotaTransactionDto);
  }

  @Delete('/:user_id/:oqtr_id')
  remove(@Param() params: updateOnboardingQuotaTransactionParams) {
    const body = {
      "is_active": false,
      "is_deleted": true
    }
    return this.onboardingQuotaTransactionService.update(params, body, 'string');
  }
}
