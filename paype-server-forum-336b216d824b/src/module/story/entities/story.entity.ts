import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/common/entity/base/base.entity';
import schema, { } from 'src/common/consts/schema';


@Schema({ collection: schema.entity_story })
export class Story extends BaseEntity {
    @Prop({ type: Boolean, default: true })
    public stor_is_visible: boolean;
    
    @Prop({ type: String, required: true })
    public stor_id: String;

    @Prop({ type: String, required: true })
    public stor_user_id: String;

    @Prop({ type: String, required: true })
    public stor_user_image: String;

    @Prop({ type: String, required: true })
    public stor_user_name: String;

    @Prop({ type: String, required: false, default: '' })
    public stor_one_line: String;

    @Prop({ type: String, required: false, default: '' })
    public stor_description: String;

    @Prop({ type: String, required: false, default: '' })
    public stor_short_description: String;

    @Prop({ type: [String], required: false, default: [] })
    public stor_images: String[];

    @Prop({ type: [String], required: false, dafault: [] })
    public stor_likes: String[];
}

export const StorySchema = SchemaFactory.createForClass(Story);
export type StoryDocument = Story & Document;