import { IsEnum } from "class-validator";
import { ENUM_WALLET_CURRENCY, ENUM_WALLET_TRANSACTION_STATUS, ENUM_WALLET_TRANSACTION_TYPE } from "src/common/consts/schema";
import { IsIntRequired, IsStringOptional, IsStringRequired } from "src/common/decorators/dto/datatype.decorator";

export class CreateCrWalletDto {
    @IsStringRequired({ name: "User id" })
    crwa_user_id: string;
}

export class CreateCrWalletTransactionRequestDto {
    @IsStringRequired({ name: "Transact user id" })
    cwtr_transacted_user_id: string;

    @IsStringRequired({ name: "Session" })
    cwtr_session_id: string;

    @IsStringRequired({ name: "User id" })
    cwtr_user_id: string;

    @IsStringRequired({ name: "Transaction id" })
    cwtr_transaction_id: string;

    @IsStringRequired({ name: "Transaction Status" })
    @IsEnum(ENUM_WALLET_TRANSACTION_STATUS)
    cwtr_status: string;

    @IsStringRequired({ name: "Short description" })
    cwtr_short_description: string;

    @IsStringRequired({ name: "Description" })
    cwtr_description: string;

    @IsStringRequired({ name: "Transaction value" })
    cwtr_transaction_amount: string

    @IsStringOptional({ name: "Remark" })
    cwtr_remark: string;

    @IsStringOptional({ name: "Notes" })
    cwtr_note: string;
}
