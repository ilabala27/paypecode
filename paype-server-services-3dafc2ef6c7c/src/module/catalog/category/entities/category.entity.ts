import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/common/entity/base/base.entity';
import schema from 'src/common/consts/schema';


@Schema({ collection: schema.category })
export class Category extends BaseEntity {
    @Prop({ type: String, required: true })
    public cate_id: String;

    @Prop({ type: Boolean, default: true })
    public cate_is_visible: boolean;

    @Prop({ type: Boolean, default: false })
    public cate_is_coming_soon: boolean;

    @Prop({ type: Boolean, default: true })
    public cate_is_new: boolean;

    @Prop({ type: Boolean, default: false })
    public cate_is_Popular: boolean;

    @Prop({ type: Number, required: true, dafult: 0 })
    public cate_priority: Number;

    @Prop({ type: String, required: true })
    public cate_label: String;

    @Prop({ type: String, required: true, index: { unique: true, dropDups: true } })
    public cate_key: String;

    @Prop({ type: String, required: false, default: '' })
    public cate_image: String;

    @Prop({ type: String, required: false, default: '' })
    public cate_icon_type: String;

    @Prop({ type: String, required: false, default: '' })
    public cate_icon_name: String;

    @Prop({ type: String, required: false, default: '' })
    public cate_icon_color: String;

    @Prop({ type: String, required: false, default: '' })
    public cate_description: String;

    @Prop({ type: String, required: false, default: '' })
    public cate_short_description: String;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
export type CategoryDocument = Category & Document;