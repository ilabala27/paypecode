import { IsOptional } from "class-validator";
import { IsArrayRequired, IsBooleanOptional, IsDataOptional, IsStringOptional, IsStringRequired } from "src/common/decorators/dto/datatype.decorator";
import { CreateUserDto } from "src/module/user/dto/create-user.dto";


export class SignUpByUserDto {
    @IsStringRequired({ name: "Username" })
    username: string;

    @IsStringRequired({ name: "Password" })
    password: string;
}

export class SignUpByUserAndVerifyDto {
    @IsStringRequired({ name: "Username" })
    username: string;

    @IsStringRequired({ name: "Code" })
    code: string;
}

export class SignUpAndOnboardUserDto extends CreateUserDto {
    @IsStringRequired({ name: "Username" })
    username: string;

    @IsStringRequired({ name: "Temp Password" })
    tempPassword: string;
}

export class ForceChangePasswordDto {
    @IsStringRequired({ name: "Username" })
    username: string;

    @IsStringRequired({ name: "Proposed" })
    proposed: string;

    @IsStringRequired({ name: "Session" })
    session: string;
}

export class SignInByAwsDto {
    @IsStringRequired({ name: "Username" })
    username: string;

    @IsStringRequired({ name: "Password" })
    password: string;
}

export class SignInByAwsResponseDto {
    @IsDataOptional({ name: "Challenge Name" })
    ChallengeName: any;

    @IsDataOptional({ name: "Challenge Param" })
    challengeParam: any;

    @IsDataOptional({ name: "Attributes" })
    attributes: any;

    @IsDataOptional({ name: "Meta Info" })
    metaInfo: any;
}

export class LogoutDto {
    @IsStringRequired({ name: "Token" })
    token: string;
}

export class ChangePasswordDto {
    @IsStringRequired({ name: "Previous" })
    previous: string;

    @IsStringRequired({ name: "Proposed" })
    proposed: string;

    @IsStringRequired({ name: "Token" })
    token: string;
}

export class ForgotPasswordDto {
    @IsStringRequired({ name: "Username" })
    username: string;
}

export class ForgotPasswordAndVerifyDto {
    @IsStringRequired({ name: "Username" })
    username: string;

    @IsStringRequired({ name: "Password" })
    password: string;

    @IsStringRequired({ name: "Code" })
    code: string;
}

export class UserAttributes {
    @IsStringRequired({ name: "Attribute Name" })
    Name: string

    @IsDataOptional({ name: "Attribute Value" })
    Value: any
}

export class UpdateUserAttributes {
    @IsArrayRequired({ name: "userAttributes" })
    userAttributes: UserAttributes[]
}

export class GetUsersQueryDto {
    @IsStringOptional({ name: "Token" })
    token: string;

    @IsStringOptional({ name: "Mobile No" })
    mobileNo: string;
}














export class SignUpByAdminDto {
    @IsStringRequired({ name: "Username" })
    username: string;

    @IsStringRequired({ name: "Temp Password" })
    tempPassword: string;
}

export class SignInVerifyDto {
    @IsStringRequired({ name: "Username" })
    username: string;

    @IsStringRequired({ name: "Session" })
    session: string;

    @IsStringRequired({ name: "Code" })
    code: string;
}

export class DeleteUserByAdminPoolDto {
    @IsStringRequired({ name: "Username" })
    username: string;
}