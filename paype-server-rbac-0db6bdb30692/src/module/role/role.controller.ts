import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { GetRoleDto, UpdateRoleDto, UpdateRoleParams } from './dto/update-role.dto';
import { Types } from 'mongoose';


@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService
  ) { }

  @Post()
  create(@Body() createPermissionDto: CreateRoleDto | CreateRoleDto[]) {
    return this.roleService.create(createPermissionDto);
  }

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':_id')
  findOneById(@Param('_id') _id: string) {
    return this.roleService.findOneById(_id);
  }

  @Post('fields')
  findAllByFields(@Body() permission: UpdateRoleDto & GetRoleDto) {
    return this.roleService.findAllByFields(permission);
  }

  @Get('/tree/:_id')
  findAllByTree(@Param('_id') _id: Types.ObjectId | string) {
    return this.roleService.findAllByTree(_id);
  }

  @Put('/:user_id/:_id')
  update(@Param() params: UpdateRoleParams, @Body() updatePermissionDto: UpdateRoleDto) {
    return this.roleService.update(params, updatePermissionDto);
  }

  @Delete('/:user_id/:_id')
  remove(@Param() params: UpdateRoleParams) {
    const body = {
      "is_active": false,
      "is_deleted": true
    }
    return this.roleService.update(params, body, 'string');
  }
}
