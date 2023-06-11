import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exception/http-exception.filter';
import { swaggerInit } from './common/swagger/api.swagger';
import { loggerInit } from './common/logger/logger';
import serverConst from './common/consts/server.const';


async function bootstrap() {
  const app: NestExpressApplication = 
    await NestFactory.create(AppModule, {
      logger: loggerInit()
    });

  // init process / configuration into pipeline 
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT') || serverConst.port;
  const baseUrl: string = config.get<string>('BASE_URL') || serverConst.base_url;
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix("api/v1")

  // swagger init
  swaggerInit(app)

  // init server
  await app.listen(port, () => {
    Logger.log(`[server-user] listening on ${port}`);
  });
}
bootstrap();
