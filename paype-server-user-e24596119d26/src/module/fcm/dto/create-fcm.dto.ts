import { IsArrayRequired, IsStringOptional, IsStringRequired } from 'src/common/decorators/dto/datatype.decorator';


export class NotificationDto {
    @IsStringRequired({ name: "User id" })
    userId: string;

    @IsStringRequired({ name: "Tile" })
    title: string;

    @IsStringRequired({ name: "Body" })
    body: string;

    @IsArrayRequired({ name: "Device Tokens" })
    deviceTokens: string;
}