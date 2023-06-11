import { IsStringOptional, IsStringRequired } from "src/common/decorators/dto/datatype.decorator";
import { CreateBaseDto } from "src/common/entity/base/dto/create-base.dto";

export class CreateOperatorDto extends CreateBaseDto {
    @IsStringOptional({ name: "Operator id" })
    public oper_id: String;

    @IsStringRequired({ name: "Operator name" })
    public oper_name: String;

    @IsStringRequired({ name: "Operator key" })
    public oper_key: String;

    @IsStringRequired({ name: "Operator type" })
    public oper_type: String;
}