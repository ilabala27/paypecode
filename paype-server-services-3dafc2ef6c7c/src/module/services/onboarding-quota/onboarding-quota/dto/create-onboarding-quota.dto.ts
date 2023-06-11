import { IsIntRequired, IsStringRequired } from "src/common/decorators/dto/datatype.decorator";
import { CreateBaseDto } from "src/common/entity/base/dto/create-base.dto";

export class CreateOnboardingQuotaDto extends CreateBaseDto {

    @IsStringRequired({ name: "Onboarding quoto id" })
    public onqu_id: String;

    @IsStringRequired({ name: "User id" })
    public onqu_user_id: String;

    @IsIntRequired({ name: "Available" })
    public onqu_available: Number;

    @IsIntRequired({ name: "Total" })
    public onqu_total: Number;

}
