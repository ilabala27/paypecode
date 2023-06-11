import { Module } from '@nestjs/common';
import { CommissionService } from './commission.service';
import { CommissionController } from './commission.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Commission, CommissionSchema } from './entities/commission.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Commission.name, schema: CommissionSchema }
    ])
  ],
  controllers: [CommissionController],
  providers: [CommissionService]
})
export class CommissionModule { }