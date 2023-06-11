import { IsIntOptional, IsBooleanOptional, IsDateOptional, IsStringRequired, IsArrayOptional, IsStringOptional } from "src/common/decorators/dto/datatype.decorator";
import { UpdateEntity } from "../update.entity";


export class CreateBaseDto {
    @IsBooleanOptional({ type: Boolean, name: "Is active" })
    public is_active: Boolean;

    @IsBooleanOptional({ type: Boolean, name: "Is deleted" })
    public is_deleted: Boolean;

    @IsStringRequired({ type: String, name: 'Created by' })
    public created_by: string;

    @IsDateOptional({ type: Date, name: "Created at" })
    public created_at: Date;

    @IsArrayOptional({ type: [UpdateEntity], name: 'Updated by' })
    public updated: UpdateEntity[]

    @IsIntOptional({ type: Number, name: "Schema version" })
    public schema_version: Number;

    @IsStringOptional({ type: String, name: 'Remarks' })
    public remarks: String;

    @IsStringOptional({ type: String, name: 'Notes' })
    public notes: String;
}