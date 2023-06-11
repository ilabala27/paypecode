import { PartialType } from '@nestjs/mapped-types';
import { IsObjectIdOptional, IsStringNumberRequired, IsStringRequired } from 'src/common/decorators/dto/datatype.decorator';
import { CreateRoleDto } from './create-role.dto';


export class UpdateRoleParams {
    @IsStringRequired({ name: "User id" })
    user_id: string;

    @IsStringRequired({ name: "_id" })
    _id: string;
}
export class GetRoleDto {
    @IsObjectIdOptional({ name: "_id" })
    _id: string;
}

export class UpdateRoleDto extends PartialType(CreateRoleDto) { }
