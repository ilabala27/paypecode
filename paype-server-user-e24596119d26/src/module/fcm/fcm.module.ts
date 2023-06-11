import { Module } from '@nestjs/common';
import { AwsAuthModule } from '../aws-auth/aws-auth.module';
import { FCMController } from './fcm.controller';
import { FCMService } from './fcm.service';

@Module({
  imports: [AwsAuthModule],
  controllers: [FCMController],
  providers: [FCMService],
})
export class FCMModule { }
