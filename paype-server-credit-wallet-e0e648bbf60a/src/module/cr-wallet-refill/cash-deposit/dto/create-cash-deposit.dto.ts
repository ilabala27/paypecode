import { IsEnum } from "class-validator";
import { ENUM_CASH_DEPOSIT_STATUS } from "src/common/consts/schema";
import { IsBooleanOptional, IsDateRequired, IsStringOptional, IsStringRequired } from "src/common/decorators/dto/datatype.decorator";

export class CreateCashDepositDto {
    @IsStringRequired({ name: "Transaction user id" })
    public cade_transacted_user_id: string;

    @IsStringRequired({ name: "Session id" })
    public cade_session_id: string;

    @IsStringRequired({ name: "Status" })
    @IsEnum(ENUM_CASH_DEPOSIT_STATUS)
    public cade_status: ENUM_CASH_DEPOSIT_STATUS;

    @IsStringRequired({ name: "user id" })
    public cade_user_id: string;

    @IsStringRequired({ name: "User wallet id" })
    public cade_user_wallet_id: string;

    @IsStringRequired({ name: "Summary" })
    public cade_short_description: string;

    @IsStringRequired({ name: "Description" })
    public cade_description: string;

    @IsStringOptional({ name: "Transaction id" })
    public cade_id: string;

    @IsDateRequired({ name: "Transaction date" })
    public cade_date: Date;

    @IsStringRequired({ name: "Bank id" })
    public cade_bank_id: string;

    @IsStringRequired({ name: "Reference number" })
    public cade_ref_no: string;

    @IsStringRequired({ name: "Transaction Amount" })
    public cade_transaction_amount: number;

    @IsStringRequired({ name: "Attachment" })
    public cade_attachment: string;

    @IsStringOptional({ name: "Other note" })
    public cade_other: string;

    @IsStringOptional({ name: "Remark" })
    public cade_remark: string;

    @IsStringOptional({ name: "Note" })
    public cade_note: string;

    @IsBooleanOptional({ name: "Is active" })
    public cade_is_active: Boolean;

    @IsBooleanOptional({ name: "Is deleted" })
    public cade_is_deleted: Boolean;
}

export class CashDepositTransactionDto {
    @IsStringOptional({ name: "User id" })
    user_id: string;

    @IsStringOptional({ name: "Cash deposit id" })
    _id: string;

    @IsStringOptional({ name: "Status" })
    status: string;
}