import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto, UpdateServiceParams } from './dto/update-service.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) { }
  @Post()
  create(@Body() createServicesDto: CreateServiceDto) {
    return this.servicesService.create(createServicesDto);
  }

  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @Get('services-with-category')
  findAllWithCategory() {
    return this.servicesService.findAllWithCategory();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.servicesService.findOneById(id);
  }

  @Post('fields')
  findAllByFields(@Body() services: UpdateServiceDto) {
    return this.servicesService.findAllByFields(services);
  }

  @Patch('/:user_id/:serv_id')
  update(@Param() params: UpdateServiceParams, @Body() updateServicesDto: UpdateServiceDto) {
    return this.servicesService.update(params, updateServicesDto);
  }

  @Delete('/:user_id/:serv_id')
  remove(@Param() params: UpdateServiceParams) {
    const body = {
      "is_active": false,
      "is_deleted": true
    }
    return this.servicesService.update(params, body, 'string');
  }
}
