import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { PermissionGroupController } from './permission_group.controller';
import { PermissionGroupService } from './permission_group.service';
import { PermissionGroup, PermissionGroupSchema } from './entities/permission_group.entity';


@Module({
  imports: [MongooseModule.forFeature([{ name: PermissionGroup.name, schema: PermissionGroupSchema }])],
  controllers: [PermissionGroupController],
  providers: [PermissionGroupService],
  exports: [PermissionGroupService]
})
export class PermissionGroupModule { }
