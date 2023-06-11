import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModuleModule } from './module/module.module';
import { ConfigModule } from '@nestjs/config';
import { envSelector } from './common/envs/selector.env';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmConfigService } from './common/connections/typeorm.connection';
import {
  AcceptLanguageResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import * as path from 'path';
import serverConst from './common/consts/server.const';
import { GlobalGuard } from './common/middleware/guard/default.guard';
const envFilePath: string = envSelector(`./src/common/envs`);


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true
    }),
    // Accept-language: "en" will be on header for lang processing
    I18nModule.forRoot({
      fallbackLanguage: serverConst.default_lang,
      fallbacks: {
        'tn-*': 'tn',
        'en-*': 'en',
      },
      loaderOptions: {
        path: path.join(__dirname, '/common/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService
    }),
    ModuleModule,
  ],
  controllers: [AppController],
  providers: [
    Logger,
    GlobalGuard,
    AppService
  ],
})
export class AppModule implements OnModuleInit {

  onModuleInit() {
    // console.log(`User Server Initialization...`);
  }

}
