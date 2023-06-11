import { Injectable } from '@nestjs/common';
import InterService from 'src/common/inter-service';
import { BAD_REQUEST } from 'src/common/methods/handler.methods';

@Injectable()
export class JSKRechargeApiService {
  constructor() { }

  private async JSKConfig() {
    return {
      baseURL: "https://jskfintech.com/Api/Service",
      token: "27a3dc4d-6d3e-4bd4-af2c-fa3ea01237a1"
    }
  }

  public async getRechargeDone(body: any) {
    try {
      const { baseURL, token, } = await this.JSKConfig()
      const endpoint = `${baseURL}/Recharge2?ApiToken=${token}&MobileNo=${body.canumber}&Amount=${body.amount}&OpId=${body.operator}&RefTxnId=${body.referenceid}`

      const rechargeResp = await Promise.all([
        await InterService.httpCommunicationChannel({
          service: 'external',
          method: 'get',
          endpoint,
          headers: {},
          query: {},
        })
      ])

      return rechargeResp[0] ?? BAD_REQUEST('Invalid response')
    } catch (err) {
      return err
    }
  }

  public async getRechargeStatus(body: any) {
    try {
      const { baseURL, token, } = await this.JSKConfig()
      const endpoint = `${baseURL}/statuscheck?ApiToken=${token}&RefTxnId=${body.referenceid}`

      const rechargeStatusResp = await Promise.all([
        await InterService.httpCommunicationChannel({
          service: 'external',
          method: 'get',
          endpoint,
          headers: {},
          query: {},
        })
      ])

      return rechargeStatusResp[0] ?? BAD_REQUEST('Invalid response')
    } catch (err) {
      return err
    }
  }

}