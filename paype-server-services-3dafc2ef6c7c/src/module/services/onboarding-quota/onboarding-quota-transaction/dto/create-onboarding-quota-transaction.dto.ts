import { IsIntRequired, IsStringRequired } from "src/common/decorators/dto/datatype.decorator";
import { CreateBaseDto } from "src/common/entity/base/dto/create-base.dto";

export class CreateOnboardingQuotaTransactionDto extends CreateBaseDto {
    @IsStringRequired({ name: "Transaction id" })
    public oqtr_id: String;

    @IsStringRequired({ name: "User id" })
    public oqtr_user_id: String;

    @IsIntRequired({ name: "Qunatity" })
    public oqtr_qty: Number;

    @IsStringRequired({ name: "Amount @ per" })
    public oqtr_per_rate: String;

    @IsStringRequired({ name: "Total before tax" })
    public oqtr_total_before_tax: String;

    @IsStringRequired({ name: "SGST Tax" })
    public oqtr_sgst_tax: String;

    @IsStringRequired({ name: "SGST Tax amount" })
    public oqtr_sgst_tax_amount: String;

    @IsStringRequired({ name: "CGST Tax amount" })
    public oqtr_cgst_tax: String;

    @IsStringRequired({ name: "CGST Tax amount" })
    public oqtr_cgst_tax_amount: String;

    @IsStringRequired({ name: "GST Tax amount" })
    public oqtr_gst_tax: String;

    @IsStringRequired({ name: "GST Tax amount" })
    public oqtr_gst_tax_amount: String;

    @IsStringRequired({ name: "Total after tax" })
    public oqtr_total_after_tax: String;

    @IsStringRequired({ name: "Net pay" })
    public oqtr_net_payable: String;

    @IsStringRequired({ name: "User id" })
    public oqtr_transact_user_id: String;

    @IsStringRequired({ name: "Description" })
    public oqtr_description: String;

    @IsStringRequired({ name: "Short description" })
    public oqtr_short_description: String;
}
