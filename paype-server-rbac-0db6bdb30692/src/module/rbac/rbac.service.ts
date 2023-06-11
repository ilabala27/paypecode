import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { PermissionService } from '../permission/permission.service';
import { PermissionGroupService } from '../permission_group/permission_group.service';
import { RoleService } from '../role/role.service';
import { Role, RoleDocument } from '../role/entities/role.entity';
import { GetOptionsDto, GetAuthorizationDto } from './dto/rbac.dto';
import { authroizationQuery } from '../permission/permission.query';


@Injectable()
export class RBACService {
  constructor(
    private readonly permissionService: PermissionService,
    private readonly permissionGroupService: PermissionGroupService,
    private readonly roleService: RoleService,
    @InjectModel(Role.name)
    private role: Model<RoleDocument>,
  ) { }

  async getOptions(getOptionsDto: GetOptionsDto): Promise<any> {
    try {
      const { permissionId, permissionGroupId, roleId, serviceRootId } = getOptionsDto
      const permissionsTree = permissionId ? await this.permissionService.findAllByTree(permissionId) : []
      const permissionGroupsTree = permissionGroupId ? await this.permissionGroupService.findAllByTree(permissionGroupId) : []
      const rolesTree = roleId ? await this.roleService.findAllByTree(roleId) : []
      const servicesTree = serviceRootId ? await this.permissionService.findAllByTree(serviceRootId) : []

      return {
        permissionsTree,
        permissionGroupsTree,
        rolesTree,
        servicesTree,
      }
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async getAuthorization(getAuthorizationDto: GetAuthorizationDto): Promise<any> {
    try {
      const { rolesId } = getAuthorizationDto

      const rbacRaw = await this.role.aggregate(authroizationQuery(rolesId))

      const deney = []
      const rbac = {
        roles: { value: {}, ids: [] },
        permissionGroups: { value: {}, ids: [] },
        permissions: { value: {}, ids: [] }
      }

      await Promise.all([
        rbacRaw.map((role) => {
          role.permission_groups.map((permissionGroup) => {
            permissionGroup.permissions.map((permission) => {
              if (permissionGroup.pegr_effect == "Deny") {
                deney.push(permission.perm_name)
              } else if (permissionGroup.pegr_effect == "Allow") {
                rbac.permissions.value[permission.perm_name] = permission.perm_name
                rbac.permissions.ids.push(permission.perm_name)
              }
            })
            rbac.permissionGroups.value[permissionGroup.pegr_name] = permissionGroup.pegr_name
            rbac.permissionGroups.ids.push(permissionGroup.pegr_name)
          })
          rbac.roles.value[role.role_name] = role.role_name
          rbac.roles.ids.push(role.role_name)
        }),
        deney.map((ignore) => {
          const index = rbac.permissions.ids.indexOf(ignore)
          if (index > -1) {
            delete rbac.permissions.value[ignore]
            rbac.permissions.ids.splice(index, 1)
          }
        })
      ])

      return rbac
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

}