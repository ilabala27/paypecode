import { PartialType } from '@nestjs/mapped-types';
import { IsBooleanOptional, IsIntOptional } from 'src/common/decorators/dto/datatype.decorator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsIntOptional({ name: "Identifier" })
    _id?: number;

    @IsBooleanOptional({ name: "Delete" })
    is_deleted?: boolean;

    @IsBooleanOptional({ name: "Wallet info" })
    activateWallet?: boolean;
}
