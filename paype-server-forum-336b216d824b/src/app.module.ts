import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GlobalGuard } from './common/middleware/guard/default.guard';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModuleModule } from './module/module.module';
import { mongoseConnection } from './common/connections/mongoose.connection';
import { envSelector } from './common/envs/selector.env';
const envFilePath: string = envSelector(`./src/common/envs`);


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    EventEmitterModule.forRoot(),
    mongoseConnection(),
    ModuleModule,
  ],
  controllers: [
    AppController
  ],
  providers: [
    Logger,
    GlobalGuard,
    AppService
  ],
})
export class AppModule implements OnModuleInit {

  onModuleInit() {
    console.log(`Service Server Initialization...`);
  }

}