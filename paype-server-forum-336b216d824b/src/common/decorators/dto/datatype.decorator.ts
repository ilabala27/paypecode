import { applyDecorators } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
    IsBoolean, IsDateString, IsInt,
    IsNotEmpty, IsOptional, IsString,
    IsMongoId, IsArray, IsNumberString, IsObject
} from "class-validator";


interface commonType {
    name: string;
    description?: string;
    [rest: string]: any;
}

// ### Boolean
export const IsBooleanOptional = ({ name, description = "", ...rest }: commonType) => {
    return applyDecorators(
        IsBoolean({ message: `${name} must be boolean`, ...rest.common, ...rest.IsBoolean }),
        Transform(({ value} ) => value === 'true'),
        IsOptional({ ...rest.common, ...rest.IsOptional }),
        ApiProperty({ description, required: false, ...rest.common, ...rest.ApiProperty })
    )
}

export const IsBooleanRequired = ({ name, description = "", ...rest }: commonType) => {
    return applyDecorators(
        IsBoolean({ message: `${name} must be boolean`, ...rest.common, ...rest.IsBoolean }),
        Transform(({ value} ) => value === 'true'),
        IsNotEmpty({ message: `${name} is required`, ...rest.common, ...rest.IsNotEmpty }),
        ApiProperty({ description, required: true, ...rest.common, ...rest.ApiProperty })
    )
}

// ### String
export const IsStringOptional = ({ name, description = "", ...rest }: commonType) => {
    return applyDecorators(
        IsString({ message: `${name} must be string`, ...rest.common, ...rest.IsString }),
        IsOptional({ ...rest.common, ...rest.IsOptional }),
        ApiProperty({ description, required: false, ...rest.common, ...rest.ApiProperty })
    )
}

export const IsStringRequired = ({ name, description = "", ...rest }: commonType) => {
    return applyDecorators(
        IsString({ message: `${name} must be string`, ...rest.common, ...rest.IsString }),
        IsNotEmpty({ message: `${name} is required`, ...rest.common, ...rest.IsNotEmpty }),
        ApiProperty({ description, required: true, ...rest.common, ...rest.ApiProperty })
    )
}

// ### Number
export const IsIntOptional = ({ name, description = "", ...rest }: commonType) => {
    return applyDecorators(
        IsInt({ message: `${name} must be number`, ...rest.common, ...rest.IsInt }),
        IsOptional({ ...rest.common, ...rest.IsOptional }),
        ApiProperty({ description, required: false, ...rest.common, ...rest.ApiProperty })
    )
}

export const IsIntRequired = ({ name, description = "", ...rest }: commonType) => {
    return applyDecorators(
        IsInt({ message: `${name} must be number`, ...rest.common, ...rest.IsInt }),
        IsNotEmpty({ message: `${name} is required`, ...rest.common, ...rest.IsNotEmpty }),
        ApiProperty({ description, required: true, ...rest.common, ...rest.ApiProperty })
    )
}

// ### Number or String
export const IsStringNumberOptional = ({ name, description = "", ...rest }: commonType) => {
    return applyDecorators(
        IsNumberString({ message: `${name} must be string`, ...rest.common, ...rest.IsString }),
        IsOptional({ ...rest.common, ...rest.IsOptional }),
        ApiProperty({ description, required: false, ...rest.common, ...rest.ApiProperty })
    )
}

export const IsStringNumberRequired = ({ name, description = "", ...rest }: commonType) => {
    return applyDecorators(
        IsNumberString({ message: `${name} must be string`, ...rest.common, ...rest.IsString }),
        IsNotEmpty({ message: `${name} is required`, ...rest.common, ...rest.IsNotEmpty }),
        ApiProperty({ description, required: true, ...rest.common, ...rest.ApiProperty })
    )
}

// ### Date
export const IsDateOptional = ({ name, description = "", ...rest }: commonType) => {
    return applyDecorators(
        IsDateString({ message: `${name} must be date`, ...rest.common, ...rest.IsDateString }),
        IsOptional({ ...rest.common, ...rest.IsOptional }),
        ApiProperty({ description, required: false, ...rest.common, ...rest.ApiProperty })
    )
}

export const IsDateRequired = ({ name, description = "", ...rest }: commonType) => {
    return applyDecorators(
        IsDateString({ message: `${name} must be date`, ...rest.common, ...rest.IsDateString }),
        IsNotEmpty({ message: `${name} is required`, ...rest.common, ...rest.IsNotEmpty }),
        ApiProperty({ description, required: true, ...rest.common, ...rest.ApiProperty })
    )
}

// ### Object Id
export const IsObjectIdOptional = ({ name, description = "", ...rest }: commonType) => {
    return applyDecorators(
        IsMongoId({ message: `${name} must be object id`, ...rest.common, ...rest.IsMongoId }),
        IsOptional({ ...rest.common, ...rest.IsOptional }),
        ApiProperty({ description, required: false, ...rest.common, ...rest.ApiProperty })
    )
}

export const IsObjectIdRequired = ({ name, description = "", ...rest }: commonType) => {
    return applyDecorators(
        IsMongoId({ message: `${name} must be object id`, ...rest.common, ...rest.IsMongoId }),
        IsNotEmpty({ message: `${name} is required`, ...rest.common, ...rest.IsNotEmpty }),
        ApiProperty({ description, required: true, ...rest.common, ...rest.ApiProperty })
    )
}


// ### array
export const IsArrayOptional = ({ name, description = "", ...rest }: commonType) => {
    return applyDecorators(
        IsArray({ message: `${name} must be array`, ...rest.common, ...rest.IsArray }),
        IsOptional({ ...rest.common, ...rest.IsOptional }),
        ApiProperty({ description, required: false, ...rest.common, ...rest.ApiProperty })
    )
}

export const IsArrayRequired = ({ name, description = "", ...rest }: commonType) => {
    return applyDecorators(
        IsArray({ message: `${name} must be array`, ...rest.common, ...rest.IsArray }),
        IsNotEmpty({ message: `${name} is required`, ...rest.common, ...rest.IsNotEmpty }),
        ApiProperty({ description, required: true, ...rest.common, ...rest.ApiProperty })
    )
}

// ### Object
export const IsObjectOptional = ({ name, description = "", ...rest }: commonType) => {
    return applyDecorators(
        IsObject({ message: `${name} must be object`, ...rest.common, ...rest.IsString }),
        IsOptional({ ...rest.common, ...rest.IsOptional }),
        ApiProperty({ description, required: false, ...rest.common, ...rest.ApiProperty })
    )
}

export const IsObjectRequired = ({ name, description = "", ...rest }: commonType) => {
    return applyDecorators(
        IsObject({ message: `${name} must be object`, ...rest.common, ...rest.IsString }),
        IsNotEmpty({ message: `${name} is required`, ...rest.common, ...rest.IsNotEmpty }),
        ApiProperty({ description, required: true, ...rest.common, ...rest.ApiProperty })
    )
}