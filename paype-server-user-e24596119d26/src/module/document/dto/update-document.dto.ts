import { PartialType } from '@nestjs/mapped-types';
import { IsBooleanOptional, IsIntOptional } from 'src/common/decorators/dto/datatype.decorator';
import { CreateDocumentDto } from './create-document.dto';

export class UpdateDocumentDto extends PartialType(CreateDocumentDto) {
    @IsIntOptional({ name: "Identifier" })
    _id: number;

    @IsBooleanOptional({ name: "Delete" })
    is_deleted: boolean;
}
