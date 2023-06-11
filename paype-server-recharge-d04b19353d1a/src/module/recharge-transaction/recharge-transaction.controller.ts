import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, Query } from '@nestjs/common';
import { RechargeTransactionService } from './recharge-transaction.service';
import { UpdateRechargeTransactionDto, updateRechargeTransactionParams } from './dto/update-recharge-transaction.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('recharge-transaction')
@Controller('recharge-transaction')
export class RechargeTransactionController {
  constructor(
    private readonly rechargeTransactionService: RechargeTransactionService,
  ) { }

  @Get()
  findAll() {
    return this.rechargeTransactionService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.rechargeTransactionService.findOneById(id);
  }

  @Post('fields')
  findAllByFields(@Body() category: UpdateRechargeTransactionDto) {
    return this.rechargeTransactionService.findAllByFields(category);
  }

  @Patch('/:user_id/:retr_id')
  update(@Param() params: updateRechargeTransactionParams, @Body() rechargeTransactionDto: UpdateRechargeTransactionDto) {
    return this.rechargeTransactionService.update(params, rechargeTransactionDto);
  }

  @Delete('/:user_id/:retr_id')
  remove(@Param() params: updateRechargeTransactionParams) {
    const body = {
      "is_active": false,
      "is_deleted": true
    }
    return this.rechargeTransactionService.update(params, body, 'string');
  }

}
