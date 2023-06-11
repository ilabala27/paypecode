import { CreateBaseDto } from "src/common/entity/base/dto/create-base.dto"
import { IsBooleanOptional, IsIntOptional, IsStringOptional, IsStringRequired } from "src/common/decorators/dto/datatype.decorator"


export class CreateServiceDto extends CreateBaseDto {
    @IsStringRequired({ name: "Service id" })
    public serv_id: string

    @IsStringRequired({ name: "Service category id" })
    public serv_cate_id: string

    @IsBooleanOptional({ name: "Is visible" })
    public serv_is_visible: boolean;

    @IsBooleanOptional({ name: "Is coming soon" })
    public serv_is_coming_soon: boolean;

    @IsBooleanOptional({ name: "Is new" })
    public serv_is_new: boolean;

    @IsBooleanOptional({ name: "Is popular" })
    public serv_is_Popular: boolean;

    @IsIntOptional({ name: 'Service Priority' })
    public serv_priority: Number;

    @IsStringRequired({ name: "Service label" })
    public serv_label: string

    @IsStringRequired({ name: "Service key" })
    public serv_key: string

    @IsStringOptional({ name: "Service image" })
    public serv_image: String;

    @IsStringOptional({ name: "Service icon type" })
    public serv_icon_type: String;

    @IsStringOptional({ name: "Service icon name" })
    public serv_icon_name: String;

    @IsStringOptional({ name: "Service icon color" })
    public serv_icon_color: String;

    @IsStringOptional({ name: "Service Nav keys" })
    public serv_nav_key: String;

    @IsStringOptional({ name: "Service Params" })
    public serv_nav_params: String;

    @IsStringOptional({ name: "Service description" })
    public serv_description: string

    @IsStringOptional({ name: "Service short description" })
    public serv_short_description: string
}