import { PartialType } from '@nestjs/mapped-types';
import { IsBooleanOptional, IsIntOptional } from 'src/common/decorators/dto/datatype.decorator';
import { CreateBusinessDto } from './create-business.dto';

export class UpdateBusinessDto extends CreateBusinessDto {
    @IsIntOptional({ name: "Identifier" })
    _id: number;

    @IsBooleanOptional({ name: "Delete" })
    is_deleted: boolean;
}
