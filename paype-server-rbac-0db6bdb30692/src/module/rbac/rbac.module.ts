import { Module } from '@nestjs/common';
import { RbacController } from './rbac.controller';
import { RBACInitService } from './init.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from '../role/entities/role.entity';
import { PermissionGroup, PermissionGroupSchema } from '../permission_group/entities/permission_group.entity';
import { Permission, PermissionSchema } from '../permission/entities/permission.entity';
import { RBACService } from './rbac.service';
import { PermissionModule } from '../permission/permission.module';
import { PermissionGroupModule } from '../permission_group/permission_group.module';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      { name: PermissionGroup.name, schema: PermissionGroupSchema },
      { name: Permission.name, schema: PermissionSchema },
    ]),
    PermissionModule,
    PermissionGroupModule,
    RoleModule
  ],
  controllers: [RbacController],
  providers: [RBACInitService, RBACService]
})
export class RbacModule { }
