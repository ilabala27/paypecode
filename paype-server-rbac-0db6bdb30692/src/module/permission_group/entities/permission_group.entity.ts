import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/common/entity/base/base.entity';
import schema, { PERMISSION_GROUP_EFFECT } from 'src/common/consts/schema';


@Schema({ collection: schema.permission_group })
export class PermissionGroup extends BaseEntity {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: schema.permission_group })
  public pegr_parent_id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, index: { unique: true, dropDups: true } })
  public pegr_name: String;

  @Prop({ default: '' })
  public pegr_description: String;

  @Prop({ required: false, type: Boolean, default: false })
  public pegr_isFolder: Boolean;

  @Prop({ required: false, default: '', enum: PERMISSION_GROUP_EFFECT })
  public pegr_effect: String;

  @Prop({ required: true, type: [{ type: mongoose.Schema.Types.ObjectId, required: true }], ref: schema.permission })
  public pegr_permissions: mongoose.Schema.Types.ObjectId[];
}

export const PermissionGroupSchema = SchemaFactory.createForClass(PermissionGroup);
export type PermissionGroupDocument = PermissionGroup & Document;