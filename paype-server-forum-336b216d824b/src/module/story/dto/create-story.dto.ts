import { IsArrayOptional, IsBooleanOptional, IsStringOptional, IsStringRequired } from "src/common/decorators/dto/datatype.decorator";
import { CreateBaseDto } from "src/common/entity/base/dto/create-base.dto";

export class CreateStoryDto extends CreateBaseDto {
    @IsBooleanOptional({ name: "Is visible" })
    public stor_is_visible: Boolean;

    @IsStringOptional({ name: "Story id" })
    public stor_id: String;

    @IsStringRequired({ name: "User id" })
    public stor_user_id: String;

    @IsStringRequired({ name: "User image" })
    public stor_user_image: String;

    @IsStringRequired({ name: "User name" })
    public stor_user_name: String;

    @IsStringRequired({ name: "Story one line" })
    public stor_one_line: String;

    @IsStringRequired({ name: "Story Short Description" })
    public stor_short_description: String;

    @IsStringOptional({ name: "Story description" })
    public stor_description: String;

    @IsArrayOptional({ name: "Story images" })
    public stor_images: String[];

    @IsArrayOptional({ name: "Story likes" })
    public stor_likes: String[];
}