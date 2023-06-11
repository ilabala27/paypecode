import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetSignedUrlDto, GetDownloadUrlDto } from './dto/create-s3.dto';
import { S3Service } from './s3.service';


@ApiTags('auth-auth')
@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) { }

  @Get('get-signed-url')
  getSignedUrl(@Query() getSignedUrlDto: GetSignedUrlDto) {
    return this.s3Service.getSignedUrl(getSignedUrlDto);
  }

  @Get('get-download-url')
  getDownloadUrl(@Query() getDownloadUrlDto: GetDownloadUrlDto) {
    return this.s3Service.getDownloadUrl(getDownloadUrlDto);
  }

}
