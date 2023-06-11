import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/common/entity/base/base.entity';
import schema from 'src/common/consts/schema';


@Schema({ collection: schema.permission })
export class Permission extends BaseEntity {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: schema.permission })
  public perm_parent_id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, index: { unique: true, dropDups: true } })
  public perm_name: String;

  @Prop({ default: '' })
  public perm_description: String;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
export type PermissionDocument = Permission & Document;