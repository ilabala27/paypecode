import { Inject, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';

@Injectable()
export class S3Service {
  constructor(
    @Inject(ConfigService)
    private readonly config: ConfigService
  ) {

  }

  private bucket: string = this.config.get<string>('AWS_S3_BUCKET_NAME')
  private expiresIn: number = parseInt(this.config.get<string>('AWS_S3_URL_EXPIRY'))
  private AWSS3(): AWS.S3 {
    AWS.config.update({
      signatureVersion: 'v4',
      region: this.config.get<string>('AWS_S3_REGION'),
    });
    return new AWS.S3();
  }

  public async getSignedUrl(fileDetails): Promise<any> {
    const { fileName, contentType, folder } = fileDetails;
    const key = folder ? `${folder}/${uuid()}-${fileName}` : `${uuid()}-${fileName}`
    const presignedUrl: string =
      await this.AWSS3().getSignedUrlPromise(
        'putObject',
        {
          Bucket: this.bucket,
          Expires: this.expiresIn,
          Key: key,
          ContentType: contentType,
        },
      );
    return {
      fileName,
      fileKey: key,
      fileUrl: presignedUrl,
      fileExpiresIn: this.expiresIn
    };
  }

  public async getDownloadUrl(fileDetails): Promise<any> {
    const { fileName, originalFileName } = fileDetails;
    const presignedUrl: string = await this.AWSS3().getSignedUrlPromise(
      'getObject',
      {
        Bucket: this.bucket,
        Expires: this.expiresIn,
        Key: fileName,
        ResponseContentDisposition: `attachment; filename=${originalFileName}`,
      },
    );
    return {
      fileUrl: presignedUrl,
      fileExpiresIn: this.expiresIn
    };
  }

}


/*
For many : https://stackoverflow.com/questions/47341704/async-await-looping-through-array-of-to-get-s3-signed-urls
*/