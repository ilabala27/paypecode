import { PartialType } from '@nestjs/mapped-types';
import { IsObjectIdOptional, IsStringRequired } from 'src/common/decorators/dto/datatype.decorator';
import { CreatePermissionDto } from './create-permission.dto';


export class UpdatePermissionParams {
    @IsStringRequired({ name: "User id" })
    user_id: string;

    @IsStringRequired({ name: "_id" })
    _id: string;
}
export class GetPermissionDto {
    @IsObjectIdOptional({ name: "_id" })
    _id: string;
}

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) { }
