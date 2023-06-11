import { CreateBaseDto } from "src/common/entity/base/dto/create-base.dto"
import { IsBooleanOptional, IsIntOptional, IsStringOptional, IsStringRequired } from "src/common/decorators/dto/datatype.decorator"


export class CreateCategoryDto extends CreateBaseDto {
    @IsStringRequired({ name: "Category id" })
    public cate_id: string

    @IsBooleanOptional({ name: "Is visible" })
    public cate_is_visible: boolean;

    @IsBooleanOptional({ name: "Is coming soon" })
    public cate_is_coming_soon: boolean;

    @IsBooleanOptional({ name: "Is new" })
    public cate_is_new: boolean;

    @IsBooleanOptional({ name: "Is popular" })
    public cate_is_Popular: boolean;

    @IsIntOptional({ name: 'Category Priority' })
    public cate_priority: Number;

    @IsStringRequired({ name: "Category label" })
    public cate_label: string

    @IsStringRequired({ name: "Category key" })
    public cate_key: string

    @IsStringOptional({ name: "Category image" })
    public cate_image: String;

    @IsStringOptional({ name: "Category icon type" })
    public cate_icon_type: String;

    @IsStringOptional({ name: "Category icon name" })
    public cate_icon_name: String;

    @IsStringOptional({ name: "Category icon color" })
    public cate_icon_color: String;

    @IsStringOptional({ name: "Category description" })
    public cate_description: string

    @IsStringOptional({ name: "Category short description" })
    public cate_short_description: string
}