import { IsIntOptional, IsBooleanOptional, IsDateOptional, IsStringRequired, IsArrayOptional } from "src/common/decorators/dto/datatype.decorator";
import { UpdateEntity } from "../update.entity";


export class CreateBaseDto {
    @IsBooleanOptional({ name: "Is active" })
    is_active: Boolean;

    @IsBooleanOptional({ name: "Is deleted" })
    is_deleted: Boolean;

    @IsStringRequired({ name: 'Created by' })
    created_by: string;

    @IsDateOptional({ name: "Created at" })
    created_at: Date;

    @IsArrayOptional({ name: 'Updated by' })
    updated: UpdateEntity[]

    @IsIntOptional({ name: "Schema version" })
    schema_version: Number;
}