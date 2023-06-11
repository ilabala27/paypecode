import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/common/entity/base/base.entity';
import schema from 'src/common/consts/schema';

@Schema()
export class Commission_Class {
    @Prop({ required: true, type: String })
    public total: String;

    @Prop({ required: true, type: String })
    public system: String;

    @Prop({ required: true, type: String })
    public organization: String;

    @Prop({ required: true, type: String })
    public super_distributor: String;

    @Prop({ required: true, type: String })
    public distributor: String;

    @Prop({ required: true, type: String })
    public retailer: String;
}

@Schema()
export class Commission_Tax_Class {
    @Prop({ required: true, type: String })
    public tds: String;

    @Prop({ required: true, type: String })
    public cgst: String;

    @Prop({ required: true, type: String })
    public sgst: String;

    @Prop({ required: true, type: String })
    public igst: String;
}

@Schema({ collection: schema.entity_commission })
export class Commission extends BaseEntity {
    @Prop({ required: true, type: String, ref: schema.entity_operator })
    public comm_operator_id: String;

    @Prop({ required: true, type: String, ref: schema.entity_provider })
    public comm_provider_id: String;

    @Prop({ required: true, type: String })
    public comm_user_id: string;

    @Prop({ required: true, type: String, default: '' })
    public comm_user_name: String;

    @Prop({ required: true, type: String, default: '' })
    public comm_user_type: String;

    @Prop({ required: false, type: String, default: '' })
    public comm_meta_info: String;

    @Prop({ required: false, type: String, default: '' })
    public comm_system_id: string;

    @Prop({ required: false, type: String, default: '' })
    public comm_organization_id: string;

    @Prop({ required: false, type: String, default: '' })
    public comm_super_distributor_id: string;

    @Prop({ required: false, type: String, default: '' })
    public comm_distributor_id: string;

    @Prop({ required: false, type: String, default: '' })
    public comm_retailer_id: string;

    @Prop({ required: false, type: String })
    public comm_user_chain_ids: string;

    @Prop({ required: true, type: String })
    public comm_id: String;
    
    @Prop({ required: true, type: Commission_Class })
    public comm_commission: Commission_Class;

    @Prop({ required: true, type: Commission_Tax_Class })
    public comm_commission_tax: Commission_Tax_Class;
}

export const CommissionSchema = SchemaFactory.createForClass(Commission);
export type CommissionDocument = Commission & Document;