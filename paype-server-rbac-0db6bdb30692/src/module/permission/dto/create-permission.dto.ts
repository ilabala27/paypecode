import { CreateBaseDto } from "src/common/entity/base/dto/create-base.dto"
import { IsObjectIdRequired, IsStringOptional, IsStringRequired } from "src/common/decorators/dto/datatype.decorator"
import mongoose from "mongoose"


export class CreatePermissionDto extends CreateBaseDto {
    @IsObjectIdRequired({ name: "Permission parent id" })
    perm_parent_id: mongoose.Schema.Types.ObjectId

    @IsStringRequired({ name: "Permission name" })
    perm_name: string

    @IsStringOptional({ name: "Permission description" })
    perm_description: string
}