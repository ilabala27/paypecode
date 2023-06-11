import { IsBooleanOptional, IsIntOptional, IsStringOptional } from 'src/common/decorators/dto/datatype.decorator';

export class CreateBaseDto {
    @IsBooleanOptional({ name: "Active" })
    public is_active: boolean;

    @IsBooleanOptional({ name: "Visible" })
    public is_visible

    @IsStringOptional({ name: "Query" })
    public query

    @IsStringOptional({ name: "Reply" })
    public reply

    @IsStringOptional({ name: "Remark" })
    public remark

    @IsStringOptional({ name: "Note" })
    public note
}