import { applyDecorators } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsDate, IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

interface commonType {
    name: string;
    description?: string;
    [rest: string]: any;
}

// ### Date
export const IsDateRequired = ({ name, description = "", ...rest }: commonType) => {
    return applyDecorators(
        IsDateString({ message: `${name} must be date`, ...rest.IsBoolean }),
        IsNotEmpty({ message: `${name} is required`, ...rest.IsNotEmpty }),
        ApiProperty({ description, required: false, ...rest.ApiProperty })
    )
}

export const IsDateOptional = ({ name, description = "", ...rest }: commonType) => {
    return applyDecorators(
        IsDateString({ message: `${name} must be date`, ...rest.IsBoolean }),
        IsOptional({ ...rest.IsOptional }),
        ApiProperty({ description, required: false, ...rest.ApiProperty })
    )
}


// ### Boolean
export const IsBooleanOptional = ({ name, description = "", ...rest }: commonType) => {
    return applyDecorators(
        IsBoolean({ message: `${name} must be boolean`, ...rest.IsBoolean }),
        IsOptional({ ...rest.IsOptional }),
        ApiProperty({ description, required: false, ...rest.ApiProperty })
    )
}

export const IsBooleanRequired = ({ name, description = "", ...rest }: commonType) => {
    return applyDecorators(
        IsBoolean({ message: `${name} must be boolean`, ...rest.IsBoolean }),
        IsNotEmpty({ message: `${name} is required`, ...rest.IsNotEmpty }),
        ApiProperty({ description, required: false, ...rest.ApiProperty })
    )
}

// ### String
export const IsStringOptional = ({ name, description = "", ...rest }: commonType) => {
    return applyDecorators(
        IsString({ message: `${name} must be string`, ...rest.IsString }),
        IsOptional({ ...rest.IsOptional }),
        ApiProperty({ description, required: false, ...rest.ApiProperty })
    )
}

export const IsStringRequired = ({ name, description = "", ...rest }: commonType) => {
    return applyDecorators(
        IsString({ message: `${name} must be string`, ...rest.IsString }),
        IsNotEmpty({ message: `${name} is required`, ...rest.IsNotEmpty }),
        ApiProperty({ description, required: false, ...rest.ApiProperty })
    )
}

// ### Number
export const IsIntOptional = ({ name, description = "", ...rest }: commonType) => {
    return applyDecorators(
        IsInt({ message: `${name} must be number`, ...rest.IsInt }),
        IsOptional({ ...rest.IsOptional }),
        ApiProperty({ description, required: false, ...rest.ApiProperty })
    )
}

export const IsIntRequired = ({ name, description = "", ...rest }: commonType) => {
    return applyDecorators(
        IsInt({ message: `${name} must be number`, ...rest.IsInt }),
        IsNotEmpty({ message: `${name} is required`, ...rest.IsNotEmpty }),
        ApiProperty({ description, required: false, ...rest.ApiProperty })
    )
}

// ### array
export const IsArrayOptional = ({ name, description = "", ...rest }: commonType) => {
    return applyDecorators(
        IsArray({ message: `${name} must be array`, ...rest.IsArray }),
        IsOptional({ ...rest.IsOptional }),
        ApiProperty({ description, required: false, ...rest.ApiProperty })
    )
}

export const IsArrayRequired = ({ name, description = "", ...rest }: commonType) => {
    return applyDecorators(
        IsArray({ message: `${name} must be array`, ...rest.IsArray }),
        IsNotEmpty({ message: `${name} is required`, ...rest.IsNotEmpty }),
        ApiProperty({ description, required: false, ...rest.ApiProperty })
    )
}

// ### array
export const IsDataOptional = ({ name, description = "", ...rest }: commonType) => {
    return applyDecorators(
        IsOptional({ ...rest.IsOptional }),
        ApiProperty({ description, required: false, ...rest.ApiProperty })
    )
}