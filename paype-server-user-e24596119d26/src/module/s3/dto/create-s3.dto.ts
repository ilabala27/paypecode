import { IsStringOptional, IsStringRequired } from 'src/common/decorators/dto/datatype.decorator';


export class GetSignedUrlDto {
    @IsStringRequired({ name: "File Name" })
    fileName: string;

    @IsStringRequired({ name: "Content Type" })
    contentType: string;

    @IsStringOptional({ name: "Description" })
    description: string;

    @IsStringOptional({ name: "Folder" })
    folder: string;
}

export class GetDownloadUrlDto {
    @IsStringRequired({ name: "File Name" })
    fileName: string;

    @IsStringRequired({ name: "Original File Name" })
    originalFileName: string;

    @IsStringOptional({ name: "Description" })
    description: string;
}