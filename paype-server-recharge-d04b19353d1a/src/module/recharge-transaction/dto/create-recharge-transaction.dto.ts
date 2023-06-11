import { IsStringOptional, IsStringRequired } from "src/common/decorators/dto/datatype.decorator";
import { CreateBaseDto } from "src/common/entity/base/dto/create-base.dto";

export class CreateRechargeTransactionDto extends CreateBaseDto {
    @IsStringRequired({ name: "Transaction id" })
    public retr_id: String;

    @IsStringRequired({ name: "User id" })
    public retr_user_id: String;

    @IsStringOptional({ name: "Customer name" })
    public retr_cust_name: String;

    @IsStringRequired({ name: "Mobile number" })
    public retr_mobile: String;

    @IsStringRequired({ name: "Operator" })
    public retr_operator: String;

    @IsStringRequired({ name: "Operator info" })
    public retr_operator_object: String;

    @IsStringRequired({ name: "Plan" })
    public retr_plan: String;

    @IsStringRequired({ name: "Plan info" })
    public retr_plan_object: String;

    @IsStringRequired({ name: "Total before tax" })
    public retr_total_before_tax: String;

    @IsStringRequired({ name: "TDS" })
    public retr_tds: String;

    @IsStringRequired({ name: "TDS rate" })
    public retr_tds_rate: String;

    @IsStringRequired({ name: "Total after tax" })
    public retr_total_after_tax: String;

    @IsStringRequired({ name: "Net payable" })
    public retr_net_payable: String;

    @IsStringRequired({ name: "Transact user id" })
    public retr_transact_user_id: String;

    @IsStringRequired({ name: "Description" })
    public retr_description: String;

    @IsStringRequired({ name: "Short description" })
    public retr_short_description: String;

    @IsStringRequired({ name: "Plan info" })
    public retr_response_object: String;
}
