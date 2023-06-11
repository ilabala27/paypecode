import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/common/entity/base/base.entity';
import schema, { RECHARGE_TRANSACTION_STATUS } from 'src/common/consts/schema';


@Schema({ collection: schema.recharge_transaction })
export class RechargeTransaction extends BaseEntity {
    @Prop({ type: String, required: true })
    public retr_id: String;

    @Prop({ type: String, required: true })
    public retr_user_id: String;

    @Prop({ type: String, required: false, default: '' })
    public retr_cust_name: String;

    @Prop({ type: String, required: true })
    public retr_mobile: String;

    @Prop({ type: String, required: true })
    public retr_operator_object: String;

    @Prop({ type: String, required: true })
    public retr_operator: String;

    @Prop({ type: String, required: true })
    public retr_plan_object: String;

    @Prop({ type: String, required: true })
    public retr_plan: String;

    @Prop({ type: String, required: true })
    public retr_total_before_tax: String;

    @Prop({ type: String, required: true })
    public retr_tds: String;

    @Prop({ type: String, required: true })
    public retr_tds_rate: String;

    @Prop({ type: String, required: true })
    public retr_total_after_tax: String;

    @Prop({ type: String, required: true })
    public retr_net_payable: String;

    @Prop({ type: String, required: true })
    public retr_response_object: String;

    @Prop({ type: String, required: true })
    public retr_transact_user_id: String;

    @Prop({ type: String, required: true })
    public retr_description: String;

    @Prop({ type: String, required: true })
    public retr_short_description: String;

    @Prop({ type: String, enum: RECHARGE_TRANSACTION_STATUS, required: true, default: RECHARGE_TRANSACTION_STATUS[0] })
    public retr_status: String;

    @Prop({ type: String })
    public retr_org: String;

    @Prop({ type: String })
    public retr_super_distributor: String;

    @Prop({ type: String })
    public retr_distributor: String;

    @Prop({ type: String })
    public retr_retailer: String;
}

export const RechargeTransactionSchema = SchemaFactory.createForClass(RechargeTransaction);
export type RechargeTransactionDocument = RechargeTransaction & Document;