import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as superagent from 'superagent';
import { AwsAuthService } from '../aws-auth/aws-auth.service';


@Injectable()
export class FCMService {
  constructor(
    public readonly config: ConfigService,
    public readonly awsAuthService: AwsAuthService,
  ) { }

  public SERVER_FCM: string = this.config.get<string>('SERVER_FCM')
  public SERVER_KEY: string = this.config.get<string>('SERVER_KEY')

  async broadcastifyToUser({ notificationDto }): Promise<any> {
    try {
      const { userId, ...rest } = notificationDto
      const user = await this.awsAuthService.getUsersByQuery(`preferred_username = \"${userId}\"`)
      const fcmList = user?.Users.map((u) => {
        const fcmAttr = u?.Attributes.find((attr) => attr.Name == "custom:user_fcm")
        return fcmAttr?.Value
      })

      if (fcmList.length > 0) {
        notificationDto.deviceTokens = fcmList
        await this.triggerNotificationToMobile(notificationDto)
        return {
          success: "Notification triggered successfully"
        }
      }

      return {
        success: "Notification failed"
      }
    } catch (err) {
      // Logger.log(err);
    }
  }

  private async triggerNotificationToMobile({ deviceTokens, title, body, data }) {
    try {
      const notificationData = {
        registration_ids: deviceTokens,
        collapse_key: "com.paype",
        notification: { title, body },
        data: data?? {},
        android: {
          priority: "high"
        }
      }
      return await superagent.post(this.SERVER_FCM)
        .set('Authorization', `key=${this.SERVER_KEY}`)
        .accept('application/json')
        .send(notificationData)
        .catch(err => { throw err; })
    } catch (err) {
      // Logger.log(err);
    }
  }

}