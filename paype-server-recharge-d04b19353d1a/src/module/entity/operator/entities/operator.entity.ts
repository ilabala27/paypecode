import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/common/entity/base/base.entity';
import schema, { ENTITY_OPERATOR_TYPE } from 'src/common/consts/schema';


@Schema({ collection: schema.entity_operator })
export class Operator extends BaseEntity {
    @Prop({ type: String, required: true })
    public oper_id: String;

    @Prop({ type: String, required: true })
    public oper_name: String;

    @Prop({ type: String, required: true, unique: true })
    public oper_key: String;

    @Prop({ type: String, enum: ENTITY_OPERATOR_TYPE, required: true })
    public oper_type: String;
}

export const OperatorSchema = SchemaFactory.createForClass(Operator);
export type OperatorDocument = Operator & Document;