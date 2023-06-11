import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/common/entity/base/base.entity';
import schema from 'src/common/consts/schema';


@Schema({ collection: schema.onboarding_quota })
export class OnboardingQuota extends BaseEntity {
    @Prop({ type: String, required: true })
    public onqu_id: String;

    @Prop({ type: String, required: true })
    public onqu_user_id: String;

    @Prop({ type: Number, required: true })
    public onqu_available: Number;

    @Prop({ type: Number, required: true })
    public onqu_total: Number;
}

export const OnboardingQuotaSchema = SchemaFactory.createForClass(OnboardingQuota);
export type OnboardingQuotaDocument = OnboardingQuota & Document;