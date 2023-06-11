import { IsStringOptional, } from "src/common/decorators/dto/datatype.decorator";

export class cipherDto {
    @IsStringOptional({ name: "Cipher" })
    cipherTime: string;

    @IsStringOptional({ name: "Cipher" })
    cipher: string;
}
