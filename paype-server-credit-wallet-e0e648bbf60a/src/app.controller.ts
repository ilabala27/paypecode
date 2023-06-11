import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { JWTGrantGuard } from './common/middleware/grant/default.grant';

@ApiTags('default')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @JWTGrantGuard()
  @Get('welcome')
  getHello(): string {
    return this.appService.getHello();
  }
}
