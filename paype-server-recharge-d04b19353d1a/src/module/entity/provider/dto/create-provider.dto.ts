import { IsObjectRequired, IsStringOptional, IsStringRequired } from "src/common/decorators/dto/datatype.decorator";
import { CreateBaseDto } from "src/common/entity/base/dto/create-base.dto";

export class CreateProviderDto extends CreateBaseDto {
    @IsStringRequired({ name: "Operator id" })
    public prov_operator_id: String;

    @IsStringOptional({ name: "Provider id" })
    public prov_id: String;

    @IsStringRequired({ name: "Provider name" })
    public prov_name: String;

    @IsStringRequired({ name: "Provider display name" })
    public prov_display_name: String;

    @IsStringRequired({ name: "Provider key" })
    public prov_key: String;

    @IsObjectRequired({ name: "Request data" })
    public prov_request_object: object

    @IsObjectRequired({ name: "Provider Commission" })
    public prov_commission: {
        "total": String,
        "system": String,
        "organization": String,
        "super_distributor": String,
        "distributor": String,
        "retailer": String,
    };

    @IsObjectRequired({ name: "Provider Tax" })
    public prov_commission_tax: {
        "tds": String,
        "cgst": String,
        "sgst": String,
        "igst": String,
    };
}