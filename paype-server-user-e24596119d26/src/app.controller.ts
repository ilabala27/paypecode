import { Controller, Get, Headers } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { I18n, I18nContext } from 'nestjs-i18n';
import { AppService } from './app.service';
import { JWTGrantGuard } from './common/middleware/grant/default.grant';

@ApiTags('default')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) { }

  @JWTGrantGuard()
  @Get('welcome')
  getHello(
    @I18n() i18n: I18nContext,
    @Headers('accept-language') acceptLanguage: any
  ): Promise<string> {
    return this.appService.getHello({ i18n, acceptLanguage });
  }

}