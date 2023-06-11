import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Services, ServicesSchema } from './entities/service.entity';
import { Category, CategorySchema } from '../category/entities/category.entity';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Category.name, schema: CategorySchema },
    { name: Services.name, schema: ServicesSchema },
  ])],
  controllers: [ServicesController],
  providers: [ServicesService]
})
export class ServicesModule { }
