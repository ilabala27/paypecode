import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { CommissionService } from './commission.service';
import { CreateCommissionDto } from './dto/create-commission.dto';
import { UpdateCommissionDto } from './dto/update-commission.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('commission')
@Controller('commission')
export class CommissionController {
  constructor(private readonly commissionService: CommissionService) { }

  @Post()
  async create(@Body() createCommissionDto: CreateCommissionDto) {
    return await this.commissionService.create(createCommissionDto);
  }

  @Get('or')
  async findAllByORQuery(@Query() query: UpdateCommissionDto) {
    return await this.commissionService.findAllByORQuery(query);
  }

  @Get('and')
  async findAllByANDQuery(@Query() query: UpdateCommissionDto) {
    return await this.commissionService.findAllByANDQuery(query);
  }

  @Patch(':comm_id')
  async updateOne(@Param('comm_id') comm_id: string, @Body() updateCommissionDto: UpdateCommissionDto) {
    return await this.commissionService.updateOne(comm_id, updateCommissionDto);
  }

  @Delete(':comm_id')
  async removeOne(@Param('comm_id') comm_id: string) {
    return await this.commissionService.updateOne(comm_id, {
      is_deleted: true, is_active: false
    });
  }
}
