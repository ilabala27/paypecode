import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class UpdateEntity {
    @Prop({ type: String, required: true })
    public _by: string;

    @Prop({ type: Date, required: true, default: Date.now })
    public _at!: Date;
}

export const UpdateSchema = SchemaFactory.createForClass(UpdateEntity);