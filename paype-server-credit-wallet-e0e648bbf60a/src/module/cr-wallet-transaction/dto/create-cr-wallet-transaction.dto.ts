import { IsEnum } from "class-validator";
import { ENUM_WALLET_CURRENCY, ENUM_WALLET_TRANSACTION_STATUS, ENUM_WALLET_TRANSACTION_TYPE } from "src/common/consts/schema";
import { IsStringOptional, IsStringRequired, IsIntRequired } from "src/common/decorators/dto/datatype.decorator";

export class CreateCrWalletTransactionDto {
    @IsStringRequired({ name: "Transact user id" })
    cwtr_transacted_user_id: string;

    @IsStringRequired({ name: "Session" })
    cwtr_session_id: string;

    @IsStringRequired({ name: "User id" })
    cwtr_user_id: string;

    @IsStringRequired({ name: "Wallet id" })
    cwtr_wallet_id: string;

    @IsStringRequired({ name: "Transaction id" })
    cwtr_transaction_id: string;

    @IsStringRequired({ name: "Reference id" })
    cwtr_id: string;

    @IsStringRequired({ name: "Currency" })
    @IsEnum(ENUM_WALLET_CURRENCY)
    cwtr_currency: string;

    @IsStringRequired({ name: "Transaction Type" })
    @IsEnum(ENUM_WALLET_TRANSACTION_TYPE)
    cwtr_type: string;

    @IsStringRequired({ name: "Transaction Status" })
    @IsEnum(ENUM_WALLET_TRANSACTION_STATUS)
    cwtr_status: string;

    @IsStringRequired({ name: "Description" })
    cwtr_short_description: string;

    @IsStringRequired({ name: "Description" })
    cwtr_description: string;

    @IsIntRequired({ name: "Actual value" })
    cwtr_actual_credit: number

    @IsIntRequired({ name: "Before value" })
    cwtr_before_credit: number

    @IsIntRequired({ name: "After value" })
    cwtr_after_credit: number

    @IsIntRequired({ name: "Current value" })
    cwtr_current_credit

    @IsIntRequired({ name: "Transaction value" })
    cwtr_transaction_amount: number

    @IsStringOptional({ name: "Remark" })
    cwtr_remark: string;

    @IsStringOptional({ name: "Notes" })
    cwtr_note: string;
}
