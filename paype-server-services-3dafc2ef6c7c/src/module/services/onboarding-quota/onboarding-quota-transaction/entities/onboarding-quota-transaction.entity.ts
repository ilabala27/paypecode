import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/common/entity/base/base.entity';
import schema from 'src/common/consts/schema';


@Schema({ collection: schema.onboarding_quota_transaction })
export class OnboardingQuotaTransaction extends BaseEntity {
    @Prop({ type: String, required: true })
    public oqtr_id: String;

    @Prop({ type: String, required: true })
    public oqtr_user_id: String;

    @Prop({ type: Number, required: true })
    public oqtr_qty: Number;

    @Prop({ type: String, required: true })
    public oqtr_per_rate: String;

    @Prop({ type: String, required: true })
    public oqtr_total_before_tax: String;

    @Prop({ type: String, required: true })
    public oqtr_sgst_tax: String;

    @Prop({ type: String, required: true })
    public oqtr_sgst_tax_amount: String;

    @Prop({ type: String, required: true })
    public oqtr_cgst_tax: String;

    @Prop({ type: String, required: true })
    public oqtr_cgst_tax_amount: String;

    @Prop({ type: String, required: true })
    public oqtr_gst_tax: String;

    @Prop({ type: String, required: true })
    public oqtr_gst_tax_amount: String;

    @Prop({ type: String, required: true })
    public oqtr_total_after_tax: String;

    @Prop({ type: String, required: true })
    public oqtr_net_payable: String;
}

export const OnboardingQuotaTransactionSchema = SchemaFactory.createForClass(OnboardingQuotaTransaction);
export type OnboardingQuotaTransactionDocument = OnboardingQuotaTransaction & Document;