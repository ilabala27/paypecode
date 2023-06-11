import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose'
import { INIT_PERMISSION, INIT_PERMISSION_GROUP, INIT_ROLE } from './data/role.data';
import { PermissionService } from '../permission/permission.service';
import { PermissionGroupService } from '../permission_group/permission_group.service';
import { RoleService } from '../role/role.service';
import schema from 'src/common/consts/schema';
import { InjectModel } from '@nestjs/mongoose';
import { Permission, PermissionDocument } from '../permission/entities/permission.entity';
import { PermissionGroup, PermissionGroupDocument } from '../permission_group/entities/permission_group.entity';
import { Role, RoleDocument } from '../role/entities/role.entity';

@Injectable()
export class RBACInitService {
  constructor(
    private permissionService: PermissionService,
    private permissionGroupService: PermissionGroupService,
    private roleService: RoleService,
    @InjectModel(Permission.name)
    private permission: Model<PermissionDocument>,
    @InjectModel(PermissionGroup.name)
    private permissionGroup: Model<PermissionGroupDocument>,
    @InjectModel(Role.name)
    private role: Model<RoleDocument>,
  ) { }

  async init(): Promise<any> {
    try {
      const permission = await this.permissionService.create(INIT_PERMISSION)
      const permissionGroup = await this.permissionGroupService.create(INIT_PERMISSION_GROUP)
      const role = await this.roleService.create(INIT_ROLE)
      return {
        permission,
        permissionGroup,
        role
      }
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async deInit(): Promise<any> {
    try {
      this.permission.db.dropCollection(schema.permission)
      this.permissionGroup.db.dropCollection(schema.permission_group)
      this.role.db.dropCollection(schema.role)
      return 'success'
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

}