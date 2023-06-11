import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/common/entity/base/base.entity';
import schema from 'src/common/consts/schema';


@Schema({ collection: schema.role })
export class Role extends BaseEntity {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: schema.role })
  public role_parent_id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, index: { unique: true, dropDups: true } })
  public role_name: String;

  @Prop({ default: '' })
  public role_description: String;

  @Prop({ required: true, type: [{ type: mongoose.Schema.Types.ObjectId, required: true }], ref: schema.permission_group })
  public role_permission_groups: mongoose.Schema.Types.ObjectId[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
export type RoleDocument = Role & Document;