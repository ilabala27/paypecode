import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Business } from '../business/entities/business.entity';
import { AddressUserMapper } from '../address/entities/mapper/user.address.entity';
import { AwsAuthModule } from '../aws-auth/aws-auth.module';

@Module({
  imports: [
    forwardRef(() => AwsAuthModule),
    TypeOrmModule.forFeature([User, Business, AddressUserMapper])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
