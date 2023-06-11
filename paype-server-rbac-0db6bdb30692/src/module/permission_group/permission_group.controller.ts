import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGroupService } from './permission_group.service';
import { CreatePermissionGroupDto } from './dto/create-permission_group.dto';
import { GetPermissionGroupDto, UpdatePermissionGroupDto, UpdatePermissionGroupParams } from './dto/update-permission_group.dto';
import { Types } from 'mongoose';


@ApiTags('permission-group')
@Controller('permission-group')
export class PermissionGroupController {
  constructor(
    private readonly permissionGroupService: PermissionGroupService
  ) { }

  @Post()
  create(@Body() createPermissionDto: CreatePermissionGroupDto | CreatePermissionGroupDto[]) {
    return this.permissionGroupService.create(createPermissionDto);
  }

  @Get()
  findAll() {
    return this.permissionGroupService.findAll();
  }

  @Get(':_id')
  findOneById(@Param('_id') _id: string) {
    return this.permissionGroupService.findOneById(_id);
  }

  @Post('fields')
  findAllByFields(@Body() permission: UpdatePermissionGroupDto & GetPermissionGroupDto) {
    return this.permissionGroupService.findAllByFields(permission);
  }

  @Get('/tree/:_id')
  findAllByTree(@Param('_id') _id: Types.ObjectId | string) {
    return this.permissionGroupService.findAllByTree(_id);
  }

  @Put('/:user_id/:_id')
  update(@Param() params: UpdatePermissionGroupParams, @Body() updatePermissionDto: UpdatePermissionGroupDto) {
    return this.permissionGroupService.update(params, updatePermissionDto);
  }

  @Delete('/:user_id/:_id')
  remove(@Param() params: UpdatePermissionGroupParams) {
    const body = {
      "is_active": false,
      "is_deleted": true
    }
    return this.permissionGroupService.update(params, body, 'string');
  }
}
