import { IsIntRequired, IsStringOptional, IsStringRequired } from "src/common/decorators/dto/datatype.decorator";
import { CreateBaseDto } from "src/common/entity/base/create-base.dto";

export class CreateBusinessDto extends CreateBaseDto {
    @IsIntRequired({ name: "User id" })
    busi_user_id: number;

    @IsStringOptional({ name: "Business image" })
    busi_image: string;

    @IsStringRequired({ name: "Business name" })
    busi_name: string;

    @IsStringOptional({ name: "Email" })
    busi_email: string;

    @IsStringOptional({ name: "Telephone number" })
    busi_telephone_no: string;

    @IsStringOptional({ name: "MSME" })
    busi_msme: string;

    @IsStringOptional({ name: "SSAI" })
    busi_ssai: string;
    
}
