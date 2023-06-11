import { IsEnum } from 'class-validator';
import { CreateAddressDto, CreateCountryDto, CreateDistrictDto, CreatePostalCodeDto, CreateStateDto } from './create-address.dto';
import serverConst from 'src/common/consts/server.const';
import { IsIntOptional, IsIntRequired, IsStringOptional, IsStringRequired } from 'src/common/decorators/dto/datatype.decorator';
import { addr_type } from 'src/common/consts/schema';
import { CreateBaseDto } from 'src/common/entity/base/create-base.dto';

export class UpdateCountryDto extends CreateCountryDto {}

export class UpdateStateDto extends CreateStateDto {}

export class UpdateDistrictDto extends CreateDistrictDto {}

export class UpdatePostalCodeDto extends CreatePostalCodeDto {}

export class UpdateAddressDto extends CreateBaseDto {
    @IsStringRequired({ name: "Address type" })
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