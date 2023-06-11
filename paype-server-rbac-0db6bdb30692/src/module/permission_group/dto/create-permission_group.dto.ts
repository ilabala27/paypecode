import { CreateBaseDto } from "src/common/entity/base/dto/create-base.dto"
import { IsArrayRequired, IsBooleanOptional, IsObjectIdRequired, IsStringOptional, IsStringRequired } from "src/common/decorators/dto/datatype.decorator"
import mongoose from "mongoose"
import { PERMISSION_GROUP_EFFECT } from "src/common/consts/schema";


export class CreatePermissionGroupDto extends CreateBaseDto {
    @IsObjectIdRequired({ name: "Permission group parent id" })
    pegr_parent_id: mongoose.Schema.Types.ObjectId;

    @IsStringRequired({ name: "Permission group name" })
    pegr_name: string;

    @IsStringOptional({ name: "Permission group description" })
    pegr_description: string;

    @IsBooleanOptional({ name: "Permission group is folder" })
    pegr_isFolder: Boolean;

    @IsStringRequired({ name: "Permission group effect", common: { enum: PERMISSION_GROUP_EFFECT } })
    pegr_effect: string;

    @IsArrayRequired({ name: "Permissions / actions" })
    pegr_permissions: mongoose.Schema.Types.ObjectId[];
}