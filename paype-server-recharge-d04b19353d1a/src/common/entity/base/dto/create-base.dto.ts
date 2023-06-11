import { Transform } from "class-transformer";
import { IsOptional } from "class-validator";
import { IsIntOptional, IsBooleanOptional, IsDateOptional, IsStringRequired, IsArrayOptional, IsStringOptional } from "src/common/decorators/dto/datatype.decorator";
import { UpdateEntity } from "../update.entity";


export class CreateBaseDto {
    @IsOptional()
    public user: {
        'custom:user_fcm': string,
        'sub': string,
        'custom:user_session_id': string,
        'iss': string,
        'phone_number_verified': boolean,
        'cognito:username': string,
        'preferred_username': string,
        'origin_jti': string,
        'aud': string,
        'event_id': string,
        'token_use': string,
        'auth_time': number,
        'phone_number': string,
        'exp': number,
        'iat': number,
        'jti': string,
    };

    @IsBooleanOptional({ type: Boolean, name: "Is active" })
    public is_active: Boolean;

    @IsBooleanOptional({ type: Boolean, name: "Is deleted" })
    public is_deleted: Boolean;

    @IsStringOptional({ type: String, name: 'Created by' })
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