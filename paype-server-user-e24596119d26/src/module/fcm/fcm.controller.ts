import { Body, Controller, Get, Headers, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotificationDto } from './dto/create-fcm.dto';
import { FCMService } from './fcm.service';


@ApiTags('fcm')
@Controller('fcm')
export class FCMController {
  constructor(private readonly fcmService: FCMService) { }

  @Post('broadcastify-user')
  async broadcastifyToUser(@Body() notificationDto: NotificationDto) {
    return await this.fcmService.broadcastifyToUser({ notificationDto });
  }

}
