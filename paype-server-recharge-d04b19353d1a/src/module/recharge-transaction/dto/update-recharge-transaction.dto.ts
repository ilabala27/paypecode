import { PartialType } from '@nestjs/mapped-types';
import { IsStringRequired } from 'src/common/decorators/dto/datatype.decorator';
import { CreateRechargeTransactionDto } from './create-recharge-transaction.dto';

export class UpdateRechargeTransactionDto extends PartialType(CreateRechargeTransactionDto) { }

export class updateRechargeTransactionParams {
    @IsStringRequired({ name: "User id" })
    user_id: string;

    @IsStringRequired({ name: "onqu_id" })
    retr_id: string;
}