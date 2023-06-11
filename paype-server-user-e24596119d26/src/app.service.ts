import { Injectable, Logger } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class AppService {
  constructor(
    private i18n: I18nService,
  ){ }
  
  async getHello({ i18n, acceptLanguage }): Promise<string> {
    // Logger.log({ message: "[server-user] Up and running.." });
    // return await i18n.t('lang.Welcome');
    return this.i18n.t('lang.Welcome', { lang: acceptLanguage })
  }

}
