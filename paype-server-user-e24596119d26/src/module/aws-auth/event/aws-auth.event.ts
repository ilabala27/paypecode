import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from "@nestjs/event-emitter";
import { AwsAuthService } from 'src/module/aws-auth/aws-auth.service';
import { UpdateUserDto } from 'src/module/user/dto/update-user.dto';
import { UserService } from 'src/module/user/user.service';

interface IupdateUserEntityOnLogin {
  user: UpdateUserDto;
  metaInfo: {
    user_fcm?: string
  };
}

@Injectable()
export class AwsAuthEvent {
  constructor(
    public userService: UserService,
  ) { }

  public awsAuthService: AwsAuthService = null
  public reverseRef(awsAuthService: AwsAuthService) {
    this.awsAuthService = awsAuthService
  }

  @OnEvent('aws-auth.login')
  async onLoginEvent({ user, metaInfo }: IupdateUserEntityOnLogin): Promise<boolean> {
    try {
      const { user_fcm } = metaInfo
      await this.updateUserEntityOnLogin({ ...user, user_fcm })
      await this.updateUserAwsEntityOnLogin(`${user.user_mobile_ex}${user.user_mobile_no}`, { ...user, user_fcm })
      return true
    } catch (err) {
      // Logger.log(err);
    }
  }


  private async updateUserEntityOnLogin(user: UpdateUserDto): Promise<boolean> {
    try {
      await this.userService.updateById(user._id, user, false)
      return true
    } catch (err) {
      // Logger.log(err);
    }
  }

  private async updateUserAwsEntityOnLogin(username: string, data: UpdateUserDto): Promise<boolean> {
    try {
      const { user_session_id, user_fcm } = data
      await this.awsAuthService.updateUserAttributesByAdmin(username, [
        { Name: 'custom:user_session_id', Value: user_session_id },
        { Name: 'custom:user_fcm', Value: user_fcm },
      ])
      return true
    } catch (err) {
      // Logger.log(err);
    }
  }

}