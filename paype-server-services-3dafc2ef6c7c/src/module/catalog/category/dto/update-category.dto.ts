import { PartialType } from '@nestjs/mapped-types';
import { IsStringRequired } from 'src/common/decorators/dto/datatype.decorator';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) { }


export class UpdateCategoryParams {
    @IsStringRequired({ name: "User id" })
    user_id: string;

    @IsStringRequired({ name: "cate_id" })
    cate_id: string;
}