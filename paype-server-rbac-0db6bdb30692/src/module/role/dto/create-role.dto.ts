import { CreateBaseDto } from "src/common/entity/base/dto/create-base.dto"
import { IsArrayRequired, IsObjectIdRequired, IsStringOptional, IsStringRequired } from "src/common/decorators/dto/datatype.decorator"
import mongoose from "mongoose"


export class CreateRoleDto extends CreateBaseDto {
    @IsObjectIdRequired({ name: "Role parent id" })
    role_parent_id: mongoose.Schema.Types.ObjectId

    @IsStringRequired({ name: "Role name" })
    role_name: string

    @IsStringOptional({ name: "Role description" })
    role_description: string

    @IsArrayRequired({ name: "Roles / actions" })
    role_permission_groups: mongoose.Schema.Types.ObjectId[]
}