import { IsEnum } from 'class-validator';
import { addr_type } from 'src/common/consts/schema';
import serverConst from 'src/common/consts/server.const';
import { IsIntOptional, IsIntRequired, IsStringOptional, IsStringRequired } from 'src/common/decorators/dto/datatype.decorator';
import { CreateBaseDto } from 'src/common/entity/base/create-base.dto';

export class CreateCountryDto extends CreateBaseDto {
    @IsStringRequired({ name: "Country name" })
    coun_name: string;
}

export class CreateStateDto extends CreateBaseDto {
    @IsStringRequired({ name: "State name" })
    stat_name: string;
}

export class CreateDistrictDto extends CreateBaseDto {
    @IsStringRequired({ name: "District name" })
    dist_name: string;
}

export class CreatePostalCodeDto extends CreateBaseDto {
    @IsIntRequired({ name: "Postal Code" })
    post_code: number;

    @IsStringRequired({ name: "Postal area" })
    post_area: string;

    @IsIntRequired({ name: "district Code" })
    post_dist_id: number;

    @IsIntRequired({ name: "state Code" })
    post_stat_id: number;

    @IsIntRequired({ name: "Country Code" })
    post_coun_id: number;
}

export class CreateAddressDto extends CreateBaseDto {
    @IsStringRequired({ name: "Reference collection" })
    addr_ref: string;

    @IsIntRequired({ name: "Reference id" })
    addr_ref_id: number;

    @IsStringRequired({ name: "Address type", description: `valid address types are ${addr_type.join(', ')}` })
    @IsEnum(addr_type, { message: `valid address types are ${addr_type.join(', ')}` })
    addr_type: string;

    @IsStringRequired({ name: "Address line" })
    addr_line1: string;

    @IsStringOptional({ name: "Address line 2" })
    addr_line2: string;

    @IsIntRequired({ name: "Postal code" })
    addr_post_id: number;

    @IsStringOptional({ name: "Address line 2" })
    addr_landmark: string;

    @IsStringOptional({ name: "Address lat" })
    addr_lat: string;

    @IsStringOptional({ name: "Address lon" })
    addr_long: string;
}