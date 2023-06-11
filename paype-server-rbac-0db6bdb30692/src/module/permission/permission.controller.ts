import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { GetPermissionDto, UpdatePermissionDto, UpdatePermissionParams } from './dto/update-permission.dto';
import { Types } from 'mongoose';


@ApiTags('permission')
@Controller('permission')
export class PermissionController {
  constructor(
    private readonly permissionService: PermissionService
  ) { }

  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto | CreatePermissionDto[]) {
    return this.permissionService.create(createPermissionDto);
  }

  @Get()
  findAll() {
    return this.permissionService.findAll();
  }

  @Get(':_id')
  findOneById(@Param('_id') _id: string) {
    return this.permissionService.findOneById(_id);
  }

  @Post('fields')
  findAllByFields(@Body() permission: UpdatePermissionDto & GetPermissionDto) {
    return this.permissionService.findAllByFields(permission);
  }

  @Get('/tree/:_id')
  findAllByTree(@Param('_id') _id: Types.ObjectId | string) {
    return this.permissionService.findAllByTree(_id);
  }

  @Put('/:user_id/:_id')
  update(@Param() params: UpdatePermissionParams, @Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionService.update(params, updatePermissionDto);
  }

  @Delete('/:user_id/:_id')
  remove(@Param() params: UpdatePermissionParams) {
    const body = {
      "is_active": false,
      "is_deleted": true
    }
    return this.permissionService.update(params, body, 'string');
  }
}
