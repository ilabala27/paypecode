import { PartialType } from '@nestjs/mapped-types';
import { IsObjectIdOptional, IsStringNumberRequired, IsStringRequired } from 'src/common/decorators/dto/datatype.decorator';
import { CreatePermissionGroupDto } from './create-permission_group.dto';


export class UpdatePermissionGroupParams {
    @IsStringRequired({ name: "User id" })
    user_id: string;

    @IsStringRequired({ name: "_id" })
    _id: string;
}
export class GetPermissionGroupDto {
    @IsObjectIdOptional({ name: "_id" })
    _id: string;
}

export class UpdatePermissionGroupDto extends PartialType(CreatePermissionGroupDto) { }
