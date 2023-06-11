import { Module } from "@nestjs/common";
import { PermissionModule } from "./permission/permission.module";
import { PermissionGroupModule } from './permission_group/permission_group.module';
import { RoleModule } from './role/role.module';
import { RbacModule } from './rbac/rbac.module';


@Module({
  imports: [
    PermissionModule,
    PermissionGroupModule,
    RoleModule,
    RbacModule
  ]
})

export class ModuleModule { }
