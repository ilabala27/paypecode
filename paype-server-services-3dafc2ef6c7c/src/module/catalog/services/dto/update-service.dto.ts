import { PartialType } from '@nestjs/mapped-types';
import { IsStringRequired } from 'src/common/decorators/dto/datatype.decorator';
import { CreateServiceDto } from './create-service.dto';

export class UpdateServiceDto extends PartialType(CreateServiceDto) { }


export class UpdateServiceParams {
    @IsStringRequired({ name: "User id" })
    user_id: string;

    @IsStringRequired({ name: "Service id" })
    serv_id: string;
}