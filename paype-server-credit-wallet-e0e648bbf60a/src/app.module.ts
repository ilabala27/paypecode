import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModuleModule } from './module/module.module';
import { ConfigModule } from '@nestjs/config';
import { envSelector } from './common/envs/selector.env';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmConfigService } from './common/connections/typeorm.connection';
import { ScheduleModule } from '@nestjs/schedule';
import { GlobalGuard } from './common/middleware/guard/default.guard';
const envFilePath: string = envSelector(`./src/common/envs`);


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true
    }),
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRootAsync({ 
      useClass: TypeOrmConfigService 
    }),
    ScheduleModule.forRoot(),
    ModuleModule
  ],
  controllers: [AppController],
  providers: [
    Logger, 
    GlobalGuard,
    AppService
  ],
})
export class AppModule  implements OnModuleInit {

  onModuleInit() {
    console.log(`Waller Server Initialization...`);
  }
  
}
