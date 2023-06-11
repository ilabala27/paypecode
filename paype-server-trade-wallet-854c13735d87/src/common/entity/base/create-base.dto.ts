import { IsBooleanOptional, IsIntOptional, IsStringOptional } from 'src/common/decorators/dto/datatype.decorator';

export class CreateBaseDto {
    @IsBooleanOptional({ name: "Active" })
    is_active: boolean;

    @IsBooleanOptional({ name: "Visible" })
    is_visible

    @IsStringOptional({ name: "Query" })
    query

    @IsStringOptional({ name: "Reply" })
    reply

    @IsStringOptional({ name: "Remark" })
    remark

    @IsStringOptional({ name: "Note" })
    note
}