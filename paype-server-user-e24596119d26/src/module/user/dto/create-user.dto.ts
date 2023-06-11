import { IsEnum } from "class-validator";
import { ENUM_REGISTRATION_STATUS, ENUM_USER_TYPE, } from "src/common/consts/schema";
import { IsBooleanOptional, IsDateOptional, IsIntOptional, IsIntRequired, IsStringOptional, IsStringRequired } from "src/common/decorators/dto/datatype.decorator";
import { CreateBaseDto } from "src/common/entity/base/create-base.dto";


export class CreateUserDto extends CreateBaseDto {
    @IsStringRequired({
        name: "User registration status",
        IsString: { enum: ENUM_REGISTRATION_STATUS },
        ApiProperty: { enum: ENUM_REGISTRATION_STATUS }
    })
    @IsEnum(ENUM_REGISTRATION_STATUS)
    user_registration_status: ENUM_REGISTRATION_STATUS;

    @IsBooleanOptional({ name: "Is profile updated" })
    user_is_profile_updated: boolean;

    @IsBooleanOptional({ name: "Is KYC verified" })
    user_is_kyc_verified: boolean;

    @IsIntOptional({ name: "Is KYC verified by" })
    user_kyc_verified_by: number;

    @IsDateOptional({ name: "Is KYC verified at 95" })
    user_is_kyc_verified_at: Date;

    @IsBooleanOptional({ name: "Is account verified" })
    user_is_account_verified: boolean;

    @IsIntOptional({ name: "Is account verified by" })
    user_account_verified_by: number;

    @IsDateOptional({ name: "Is account verified at" })
    user_is_account_verified_at: Date;

    @IsDateOptional({ name: "Is user logged in" })
    user_last_user_logged_in: Date;

    @IsBooleanOptional({ name: "Is account blocked" })
    user_is_blocked: boolean;

    @IsStringRequired({ name: "AWS ID" })
    user_aws_id: string;

    @IsStringRequired({
        name: "User type",
        IsString: { enum: ENUM_USER_TYPE },
        ApiProperty: { enum: ENUM_USER_TYPE }
    })
    @IsEnum(ENUM_USER_TYPE)
    user_type: ENUM_USER_TYPE;

    @IsStringRequired({ name: "Role" })
    user_role: string;

    @IsStringOptional({ name: "Available Services" })
    user_available_services: string;

    @IsStringOptional({ name: "User id" })
    user_id: string;

    @IsStringOptional({ name: "FCM" })
    user_fcm: string;

    @IsStringOptional({ name: "Session id" })
    user_session_id: string;

    @IsStringRequired({ name: "Mobile number" })
    user_mobile_ex: string;

    @IsStringRequired({ name: "Mobile extension" })
    user_mobile_no: string;

    @IsStringOptional({ name: "User image" })
    user_image: string;

    @IsStringOptional({ name: "User name" })
    user_name: string;

    @IsStringOptional({ name: "Email" })
    user_email: string;

    @IsStringOptional({ name: "Telephone" })
    user_contact_no: string;

    @IsBooleanOptional({ name: "Password exist" })
    user_is_password_exist: boolean;

    @IsStringOptional({ name: "Password" })
    user_password: string;

    @IsIntOptional({ name: "User created by" })
    user_created_by: number;

    @IsStringOptional({ name: "User org id" })
    user_org: string;

    @IsStringOptional({ name: "User super distributor id" })
    user_super_distributor: string;

    @IsStringOptional({ name: "User distributor id" })
    user_distributor: string;

    @IsStringOptional({ name: "User created by nano" })
    user_created_by_nano: string;

    @IsStringOptional({ name: "User created by reference" })
    user_created_by_chain: string
}

export interface IFindOnBoardingStatus {
    id: string;
    user_id?: string
}   