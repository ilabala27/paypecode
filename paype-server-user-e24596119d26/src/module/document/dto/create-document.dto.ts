import { IsEnum } from "class-validator";
import { ENUM_DOCUMENT_TYPE } from "src/common/consts/schema";
import { IsIntRequired, IsStringOptional, IsStringRequired } from "src/common/decorators/dto/datatype.decorator";
import { CreateBaseDto } from "src/common/entity/base/create-base.dto";


export class CreateDocumentDto extends CreateBaseDto {
    @IsIntRequired({ name: "User Identifier" })
    docu_user_id: number;

    @IsStringRequired({
        name: "Document type",
        IsString: { enum: ENUM_DOCUMENT_TYPE },
        ApiProperty: { enum: ENUM_DOCUMENT_TYPE }
    })
    @IsEnum(ENUM_DOCUMENT_TYPE)
    docu_type: ENUM_DOCUMENT_TYPE;

    @IsStringRequired({ name: "Document name" })
    docu_name: string;

    @IsStringOptional({ name: "Document number" })
    docu_no: string;

    @IsStringOptional({ name: "Document description" })
    docu_desc: string;

    @IsStringOptional({ name: "Document remark" })
    docu_remark: string;

    // media
    @IsStringRequired({ name: "Media name" })
    docu_media_name: string;

    @IsStringRequired({ name: "Media key" })
    docu_media_key: string;

    @IsStringRequired({ name: "Media type" })
    docu_media_type: string;

    @IsStringOptional({ name: "Media size" })
    docu_media_size: string;
}
