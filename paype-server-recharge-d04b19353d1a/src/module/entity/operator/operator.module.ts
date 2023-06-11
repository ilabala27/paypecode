import { Module } from '@nestjs/common';
import { OperatorService } from './operator.service';
import { OperatorController } from './operator.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Operator, OperatorSchema } from './entities/operator.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Operator.name, schema: OperatorSchema }
    ])
  ],
  controllers: [OperatorController],
  providers: [OperatorService]
})
export class OperatorModule { }