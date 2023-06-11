import { IsBooleanOptional, IsStringRequired } from "src/common/decorators/dto/datatype.decorator";
import { CreateBaseDto } from "src/common/entity/base/create-base.dto";

export class UpdateBankAccountDto extends CreateBaseDto {
    @IsStringRequired({ name: "" })
    bank_acco_name: string;

    @IsStringRequired({ name: "Branch name" })
    bank_acco_branch: string;

    @IsStringRequired({ name: "IFSC" })
    bank_acco_ifsc: string;

    @IsStringRequired({ name: "Account name" })
    bank_acco_account_name: string;

    @IsStringRequired({ name: "Account number" })
    bank_acco_account_no: string;

    @IsStringRequired({ name: "Account Type" })
    bank_acco_type: string;
}
