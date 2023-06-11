import { Injectable } from '@nestjs/common';
import InterService from 'src/common/inter-service';
import { BAD_REQUEST } from 'src/common/methods/handler.methods';
import { ProviderService } from 'src/module/entity/provider/provider.service';

@Injectable()
export class PlanApiService {
  constructor(private readonly providerService: ProviderService) { }

  private async planApiConfig() {
    return {
      baseURL: "http://planapi.in",
      apiKey: "4451",
      apiPassword: "Amit@121"
    }
  }

  public async getHLRCheck(body: any) {
    try {
      const { baseURL, apiKey, apiPassword, } = await this.planApiConfig()
      const hlrRes = await Promise.all([
        await InterService.httpCommunicationChannel({
          service: 'external',
          method: 'get',
          endpoint: `${baseURL}/api/Mobile/OperatorFetchNew?ApiUserID=${apiKey}&ApiPassword=${apiPassword}&Mobileno=${body.mobileNo}`,
          headers: {},
          query: {},
        })
      ])
      return hlrRes[0] ?? BAD_REQUEST('Invalid response')
    } catch (err) {
      return err
    }
  }

  public async getOperator(body: any) {
    const { OpCode, Operator, CircleCode, Circle, ...rest } = await this.getHLRCheck(body)
    const result = []
    const providers = await this.providerService.findAllByANDQuery({ is_deleted: false });

    providers.filter((el: any) => {
      const mobileOperator = Operator?.toLocaleLowerCase()
      if (mobileOperator?.includes(el?.oper_key)) {
        const newOperator = { ...el, operator_code: OpCode, circle_code: CircleCode, circle: Circle, }
        result.push(newOperator)
        return true
      }
    })

    return result?.length > 0 ? result : providers
  }

  public async getPlan(body: any) {
    try {
      const { OpCode, CircleCode } = await this.getHLRCheck(body)
      if (!OpCode || !CircleCode)
        BAD_REQUEST("Something went wrong")

      const { baseURL, apiKey, apiPassword, } = await this.planApiConfig()
      const planRes = await Promise.all([
        await InterService.httpCommunicationChannel({
          service: 'external',
          method: 'get',
          endpoint: `${baseURL}/api/Mobile/Operatorplan?apimember_id=${apiKey}&api_password=${apiPassword}&cricle=${CircleCode}&operatorcode=${OpCode}`,
          headers: {},
          query: {},
        })
      ])
      return planRes[0] ?? BAD_REQUEST('Invalid response')
    } catch (err) {
      return err
    }
  }

}