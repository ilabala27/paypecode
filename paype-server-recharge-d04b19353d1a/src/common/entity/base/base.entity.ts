import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { UpdateEntity, UpdateSchema } from './update.entity';


export class BaseEntity {
    @Prop({ type: Boolean, default: true })
    public is_active: boolean;

    @Prop({ type: Boolean, default: false })
    public is_deleted: boolean;

    @Prop({ type: String, required: true })
    public created_by: string;

    @Prop({ type: Date, default: Date.now })
    public created_at!: Date;

    @Prop({ _id: false, type: [UpdateSchema], default: [] })
    public updated: Types.Array<UpdateEntity>;

    @Prop({ type: Number, default: 1 })
    public schema_version!: number

    @Prop({ required: false, default: '' })
    public remarks: String;

    @Prop({ required: false, default: '' })
    public notes: String;
}