import { PartialType } from '@nestjs/mapped-types';
import { CreateCashDepositDto } from './create-cash-deposit.dto';

export class UpdateCashDepositDto extends PartialType(CreateCashDepositDto) {}
