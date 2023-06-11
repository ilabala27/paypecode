import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { OperatorService } from './operator.service';
import { CreateOperatorDto } from './dto/create-operator.dto';
import { UpdateOperatorDto } from './dto/update-operator.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('operator')
@Controller('operator')
export class OperatorController {
  constructor(private readonly operatorService: OperatorService) { }

  @Post()
  async create(@Body() createOperatorDto: CreateOperatorDto) {
    return await this.operatorService.create(createOperatorDto);
  }

  @Get('or')
  async findAllByORQuery(@Query() query: UpdateOperatorDto) {
    return await this.operatorService.findAllByORQuery(query);
  }

  @Get('and')
  async findAllByANDQuery(@Query() query: UpdateOperatorDto) {
    return await this.operatorService.findAllByANDQuery(query);
  }

  @Patch(':oper_id')
  async updateOne(@Param('oper_id') oper_id: string, @Body() updateOperatorDto: UpdateOperatorDto) {
    return await this.operatorService.updateOne(oper_id, updateOperatorDto);
  }

  @Delete(':oper_id')
  async removeOne(@Param('oper_id') oper_id: string) {
    return await this.operatorService.updateOne(oper_id, {
      is_deleted: true, is_active: false
    });
  }
}
