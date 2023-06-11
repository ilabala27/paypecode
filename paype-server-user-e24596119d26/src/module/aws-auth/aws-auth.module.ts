import { forwardRef, Module } from '@nestjs/common';
import { AwsAuthService } from './aws-auth.service';
import { AwsAuthController } from './aws-auth.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
  ],
  controllers: [AwsAuthController],
  providers: [AwsAuthService],
  exports: [AwsAuthService]
})
export class AwsAuthModule { }
