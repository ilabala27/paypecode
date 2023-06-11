import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/common/entity/base/base.entity';
import schema from 'src/common/consts/schema';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('services')
@Schema({ collection: schema.services })
export class Services extends BaseEntity {
    @Prop({ type: String, required: true })
    public serv_id: String;

    @Prop({ type: String, required: true, ref: schema.category })
    public serv_cate_id: String;

    @Prop({ type: Boolean, default: true })
    public serv_is_visible: boolean;

    @Prop({ type: Boolean, default: false })
    public serv_is_coming_soon: boolean;

    @Prop({ type: Boolean, default: true })
    public serv_is_new: boolean;

    @Prop({ type: Boolean, default: false })
    public serv_is_Popular: boolean;

    @Prop({ type: Number, required: true, dafult: 0 })
    public serv_priority: Number;

    @Prop({ type: String, required: true })
    public serv_label: String;

    @Prop({ type: String, required: true, index: { unique: true, dropDups: true } })
    public serv_key: String;

    @Prop({ type: String, required: false, default: '' })
    public serv_image: String;

    @Prop({ type: String, required: false, default: '' })
    public serv_icon_type: String;

    @Prop({ type: String, required: false, default: '' })
    public serv_icon_name: String;

    @Prop({ type: String, required: false, default: '' })
    public serv_icon_color: String;

    @Prop({ type: String, required: false, default: '' })
    public serv_nav_key: String;

    @Prop({ type: String, required: false, default: '' })
    public serv_nav_params: String;

    @Prop({ type: String, required: false, default: '' })
    public serv_description: String;

    @Prop({ type: String, required: false, default: '' })
    public serv_short_description: String;
}

export const ServicesSchema = SchemaFactory.createForClass(Services);
export type ServicesDocument = Services & Document;