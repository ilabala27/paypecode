import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('provider')
@Controller('provider')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) { }

  @Post()
  async create(@Body() createProviderDto: CreateProviderDto) {
    return await this.providerService.create(createProviderDto);
  }

  @Get('or')
  async findAllByORQuery(@Query() query: UpdateProviderDto) {
    return await this.providerService.findAllByORQuery(query);
  }

  @Get('and')
  async findAllByANDQuery(@Query() query: UpdateProviderDto) {
    return await this.providerService.findAllByANDQuery(query);
  }

  @Patch(':prov_id')
  async updateOne(@Param('prov_id') prov_id: string, @Body() updateProviderDto: UpdateProviderDto) {
    return await this.providerService.updateOne(prov_id, updateProviderDto);
  }

  @Delete(':prov_id')
  async removeOne(@Param('prov_id') prov_id: string) {
    return await this.providerService.updateOne(prov_id, {
      is_deleted: true, is_active: false
    });
  }
}
