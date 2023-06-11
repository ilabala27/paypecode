import { PartialType } from '@nestjs/swagger';
import { CreateRechargeApiDto } from './create-recharge-api.dto';

export class UpdateRechargeApiDto extends PartialType(CreateRechargeApiDto) {}
