import { IsArrayRequired, IsStringOptional } from "src/common/decorators/dto/datatype.decorator"
import { Types } from "mongoose"

export class GetAuthorizationDto {
    @IsArrayRequired({ name: "Roles id" })
    rolesId: Types.ObjectId[];
}

export class GetOptionsDto {
    @IsStringOptional({ name: "Permission id" })
    permissionId: string;

    @IsStringOptional({ name: "Permission group id" })
    permissionGroupId: string;

    @IsStringOptional({ name: "role id" })
    roleId: string;

    @IsStringOptional({ name: "Service root id" })
    serviceRootId: string;
}