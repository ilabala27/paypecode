import { IsObjectRequired, IsStringOptional, IsStringRequired } from "src/common/decorators/dto/datatype.decorator";
import { CreateBaseDto } from "src/common/entity/base/dto/create-base.dto";

export class CreateCommissionDto extends CreateBaseDto {
    @IsStringRequired({ name: "Operator id" })
    public comm_operator_id: String;

    @IsStringRequired({ name: "Provider id" })
    public comm_provider_id: String;

    @IsStringRequired({ name: "User id" })
    public comm_user_id: String;

    @IsStringRequired({ name: "User name" })
    public comm_user_name: String;

    @IsStringRequired({ name: "User type" })
    public comm_user_type: String;

    @IsStringOptional({ name: "Commission meta" })
    public comm_meta_info: String;

    @IsStringOptional({ name: "System id" })
    public comm_system_id: String;

    @IsStringOptional({ name: "Organization id" })
    public comm_organization_id: String;

    @IsStringOptional({ name: "Super distributor id" })
    public comm_super_distributor_id: String;

    @IsStringOptional({ name: "Distributor id" })
    public comm_distributor_id: String;

    @IsStringOptional({ name: "Retailer id" })
    public comm_retailer_id: String;

    @IsStringOptional({ name: "User chain ids" })
    public comm_user_chain_ids: String;

    @IsStringOptional({ name: "Commission id" })
    public comm_id: String;

    @IsObjectRequired({ name: "Commission Commission" })
    public comm_commission: {
        "total": String,
        "system": String,
        "organization": String,
        "super_distributor": String,
        "distributor": String,
        "retailer": String,
    };

    @IsObjectRequired({ name: "Commission Tax" })
    public comm_commission_tax: {
        "tds": String,
        "cgst": String,
        "sgst": String,
        "igst": String,
    };
}