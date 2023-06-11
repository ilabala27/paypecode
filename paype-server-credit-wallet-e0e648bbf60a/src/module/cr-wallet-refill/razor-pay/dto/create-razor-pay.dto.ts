import { IsEnum } from "class-validator";
import { ENUM_CASH_DEPOSIT_STATUS, ENUM_DEFAULT_STATUS } from "src/common/consts/schema";
import { IsBooleanOptional, IsDateRequired, IsStringOptional, IsStringRequired } from "src/common/decorators/dto/datatype.decorator";

export class CreateRazorPayDto {
    @IsStringRequired({ name: "Transaction user id" })
    public rapa_transacted_user_id: string;

    @IsStringRequired({ name: "Session id" })
    public rapa_session_id: string;

    @IsStringRequired({ name: "user id" })
    public rapa_user_id: string;

    @IsStringRequired({ name: "User wallet id" })
    public rapa_user_wallet_id: string;

    @IsStringRequired({ name: "Status" })
    @IsEnum(ENUM_DEFAULT_STATUS)
    public rapa_status: ENUM_DEFAULT_STATUS;

    @IsStringRequired({ name: "Summary" })
    public rapa_short_description: string;

    @IsStringRequired({ name: "Description" })
    public rapa_description: string;

    @IsStringOptional({ name: "Transaction id" })
    public rapa_id: string;

    @IsStringOptional({ name: "Reference number" })
    public rapa_ref_no: string;

    @IsStringRequired({ name: "Transaction Amount" })
    public rapa_transaction_amount: number;

    @IsStringOptional({ name: "Remark" })
    public rapa_remark: string;

    @IsStringOptional({ name: "Note" })
    public rapa_note: string;

    @IsBooleanOptional({ name: "Is active" })
    public rapa_is_active: Boolean;

    @IsBooleanOptional({ name: "Is deleted" })
    public rapa_is_deleted: Boolean;
}

export class RazorPayTransactionDto {
    @IsStringRequired({ name: "User id" })
    rapa_user_id: string;

    @IsStringRequired({ name: "Razor pay transaction id" })
    rapa_id: string;

    @IsStringRequired({ name: "Razor pay Reference number" })
    rapa_ref_no: string;

    @IsStringRequired({ name: "Transaction Status" })
    @IsEnum(ENUM_DEFAULT_STATUS)
    rapa_status: ENUM_DEFAULT_STATUS;
}