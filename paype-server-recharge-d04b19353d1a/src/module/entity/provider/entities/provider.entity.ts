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

@Schema({ collection: schema.entity_provider })
export class Provider extends BaseEntity {
    @Prop({ required: true, type: String, ref: schema.entity_operator })
    public prov_operator_id: String;

    @Prop({ required: true, type: String })
    public prov_id: String;

    @Prop({ required: true, type: String })
    public prov_name: String;

    @Prop({ required: true, type: String })
    public prov_display_name: String;

    @Prop({ unique: true, required: true, type: String })
    public prov_key: String;

    @Prop({ required: true, type: Object })
    public prov_request_object: Object;

    @Prop({ required: true, type: Commission_Class })
    public prov_commission: Commission_Class;

    @Prop({ required: true, type: Commission_Tax_Class })
    public prov_commission_tax: Commission_Tax_Class;
}

export const ProviderSchema = SchemaFactory.createForClass(Provider);
export type ProviderDocument = Provider & Document;