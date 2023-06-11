import { BadRequestException, HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { nanoid } from 'nanoid/async';
import { CipherService } from 'src/common/cipher/cipher.service';
import InterService from 'src/common/inter-service';
import { JSKRechargeApiService } from '../recharge-api/services/partner/jsk-api.service';
import { RechargeTransaction, RechargeTransactionDocument } from '../recharge-transaction/entities/recharge-transaction.entity';
import { ProviderService } from '../entity/provider/provider.service';
import { BAD_REQUEST } from 'src/common/methods/handler.methods';


@Injectable()
export class RechargeTransactionMakeService {
  constructor(
    private readonly cipherService: CipherService,
    private readonly providerService: ProviderService,
    @InjectModel(RechargeTransaction.name)
    private rechargeTransaction: Model<RechargeTransactionDocument>,
    @InjectConnection()
    private readonly connection: mongoose.Connection,
  ) { }


  async makeNow(header: any, createRechargeTransactionDto: any): Promise<RechargeTransaction | any> {
    // ### Init transaction
    const session = await this.connection.startSession();
    try {
      // ### Start session
      session.startTransaction();

      // ### Payload manipulation
      const headers = { authorization: header.authorization }
      const {
        org, super_distributor, distributor, reatailor, reatailor_name,
        mobile, provider, plan
      } = createRechargeTransactionDto


      const providerRes: any = await this.providerService.findAllByANDQuery({ is_deleted: false, prov_id: provider });
      if (providerRes.length !== 1 || providerRes[0]?.providers?.length !== 1) BAD_REQUEST("Something went wrong")

      const operatorData = providerRes[0] ?? null
      const providerData = operatorData?.providers[0] ?? null
      if (!operatorData || !providerData) BAD_REQUEST("Something went wrong")


      const operatorName = operatorData?.oper_name
      const CommissionR = ((parseFloat(plan.rs) * parseFloat(providerData?.prov_commission?.retailer)) / 100).toFixed(8)
      const CommissionR_Debit = (parseFloat(plan.rs) - parseFloat(CommissionR)).toFixed(8)
      const description = "Amount Debited"
      const shortDescription = `${operatorName} Mobile recharge for ${mobile}`
      const transaction_id = await nanoid(24)

      // ### Debit from credit wallet
      const debitPayload = {
        "cwtr_transacted_user_id": reatailor,
        "cwtr_session_id": header?.session_id,
        "cwtr_user_id": reatailor,
        "cwtr_transaction_id": transaction_id,
        "cwtr_status": "DT_SUCCESS_RECHARGE",
        "cwtr_short_description": description,
        "cwtr_description": shortDescription,
        "cwtr_transaction_amount": CommissionR_Debit,
        "cwtr_remark": "",
        "cwtr_note": ""
      }

      const cipher = this.cipherService.encryptWithFormat(debitPayload)
      const debit = await Promise.all([
        await InterService.httpCommunicationChannel({
          service: 'cr-wallet',
          method: 'post',
          endpoint: `/cr-wallet/user/${createRechargeTransactionDto.retr_user_id}/transaction/debit`,
          headers,
          query: {},
          body: cipher
        })
      ])

      const debitMessage = debit[0]?.message ?? ''
      if (debitMessage != "Transaction successful")
        throw new HttpException({ message: "Unable to detect money from your wallet at this moment" }, HttpStatus.BAD_REQUEST);

      // ### Create recharge order with processing status
      if (debitMessage == "Transaction successful") {
        const transactionPayload = {
          "retr_org": org,
          "retr_super_distributor": super_distributor,
          "retr_distributor": distributor,
          "retr_retailer": reatailor,

          "retr_id": transaction_id,
          "retr_user_id": reatailor,
          "retr_transact_user_id": reatailor,
          "created_by": reatailor,
          "retr_cust_name": reatailor_name,
          "retr_mobile": mobile,
          "retr_operator_object": JSON.stringify(operatorData),
          "retr_operator": operatorName,
          "retr_plan_object": JSON.stringify(plan),
          "retr_plan": parseFloat(plan?.rs).toFixed(8),
          "retr_description": description,
          "retr_short_description": shortDescription,

          "retr_total_before_tax": parseFloat(CommissionR_Debit).toFixed(8),
          "retr_tds": parseFloat("0").toFixed(8),
          "retr_tds_rate": parseFloat("0").toFixed(8),
          "retr_total_after_tax": parseFloat(CommissionR_Debit).toFixed(8),
          "retr_net_payable": parseFloat(CommissionR_Debit).toFixed(8),

          "retr_status": 'PROCESSING',
          "retr_response_object": "{}",
        }
        await this.rechargeTransaction.create(transactionPayload)

        // ### Create live recharge
        const { method, url } = providerData?.prov_request_object
        let endpoint = url
        const params = {
          __MOBILE__: mobile,
          __AMOUNT__: plan?.rs,
          __REFNO__: transaction_id,
        }
        const keys = Object.keys(params)
        keys.map(e => endpoint = endpoint.replaceAll(e, params[e]))

        const payload: any = {
          service: 'external',
          method,
          endpoint,
          headers: {},
          query: {},
          options: {}
        }

        const rechargeRes: any = await Promise.all([
          await InterService.httpCommunicationChannel(payload)
        ])
        const rechargeData = rechargeRes[0] ?? false
        console.log("rechargeRes", rechargeRes)

        const jskStatus = rechargeData?.STATUS
        const rechmeStatus = rechargeData?.status
        if (jskStatus == 1 || rechmeStatus == 2) {
          await this.initCommission(headers, "DIRECT", transaction_id, rechargeData)
          return {
            status: 'success',
            message: "Recharge Successful"
          }
        } else if (jskStatus == 3 || rechmeStatus == 3) {
          await this.revertRechargeTransaction(headers, "DIRECT", transaction_id, rechargeData)
          return {
            status: 'failed',
            message: "Recharge Failed"
          }
        }
      }

      // ### End transaction
      await session.commitTransaction();
      session.endSession();
      return {
        status: 'processing',
        message: "Recharge is in processing"
      }
    } catch ({ message }) {
      session?.endSession();
      throw new HttpException({ message }, HttpStatus.BAD_REQUEST);
    }
  }

  async initCommission(headers, successType: string, transaction_id: string, successResponse) {
    const rechargeTransactionBody = {
      "retr_status": 'SUCCESSFUL',
      "retr_response_object": JSON.stringify(successResponse),
    }
    const {
      retr_status,
      retr_org, retr_super_distributor, retr_distributor, retr_retailer,
      retr_operator, retr_mobile, retr_plan, retr_net_payable,
      retr_transact_user_id, retr_user_id, retr_operator_object
    } = await this.rechargeTransaction.findOneAndUpdate({ "retr_id": transaction_id }, rechargeTransactionBody)

    if (retr_status != 'PROCESSING')
      throw new HttpException({ message: "Somethign went wrong" }, HttpStatus.BAD_REQUEST);

    // ### Payload construction 
    const { prov_commission } = JSON.parse(retr_operator_object + '')?.providers[0] ?? {}
    const CommissionSD = ((parseFloat(retr_plan + '') * parseFloat(prov_commission.super_distributor)) / 100).toFixed(8)
    const CommissionD = ((parseFloat(retr_plan + '') * parseFloat(prov_commission.distributor)) / 100).toFixed(8)
    const commissionORG = ((parseFloat(retr_plan + '') * parseFloat(prov_commission.organization)) / 100).toFixed(8)
    const creditPayload = {
      "cwtr_status": "CR_SUCCESS_RECHARGE_COMMISION",
      "cwtr_transaction_id": transaction_id,
      "cwtr_transacted_user_id": retr_transact_user_id,
      "cwtr_session_id": 'n/a',
      "cwtr_short_description": "Organisation Commision Credited",
      "cwtr_description": `${retr_operator} Mobile recharge for ${retr_mobile} got successfull`,
      "cwtr_remark": "",
      "cwtr_note": "",
      // ### User & Commission
      "cwtr_user_id": retr_org,
      "cwtr_transaction_amount": commissionORG,
    }

    // ### Org Commission
    const cipherO = this.cipherService.encryptWithFormat(creditPayload)
    const creditO = await Promise.all([
      await InterService.httpCommunicationChannel({
        service: 'trade-wallet',
        method: 'post',
        endpoint: `/trade-wallet/user/${retr_transact_user_id}/transaction/credit`,
        headers,
        query: {},
        body: cipherO
      })
    ])
    // console.log("O", creditO)
    InterService.triggerUserNotification({
      header: headers,
      title: "Commission Earned",
      body: `${parseFloat(creditPayload.cwtr_transaction_amount + '').toFixed(4)} Organisation Commission recevied for ${retr_operator} Mobile recharge.`,
      userId: creditPayload.cwtr_user_id
    })

    // ### SD Commission
    creditPayload.cwtr_user_id = retr_super_distributor
    creditPayload.cwtr_transaction_amount = CommissionSD
    creditPayload.cwtr_short_description = "Super distributor Commision Credited"
    const cipherSD = this.cipherService.encryptWithFormat(creditPayload)
    const creditSD = await Promise.all([
      await InterService.httpCommunicationChannel({
        service: 'trade-wallet',
        method: 'post',
        endpoint: `/trade-wallet/user/${retr_transact_user_id}/transaction/credit`,
        headers,
        query: {},
        body: cipherSD
      })
    ])
    // console.log("SD", creditSD)
    InterService.triggerUserNotification({
      header: headers,
      title: "Commission Earned",
      body: `${parseFloat(creditPayload.cwtr_transaction_amount + '').toFixed(4)} Super distributor Commission recevied for ${retr_operator} Mobile recharge.`,
      userId: creditPayload.cwtr_user_id
    })

    // ### D Commission
    creditPayload.cwtr_user_id = retr_distributor
    creditPayload.cwtr_transaction_amount = CommissionD
    creditPayload.cwtr_short_description = "Distributor Commision Credited"
    const cipherD = this.cipherService.encryptWithFormat(creditPayload)
    const creditD = await Promise.all([
      await InterService.httpCommunicationChannel({
        service: 'trade-wallet',
        method: 'post',
        endpoint: `/trade-wallet/user/${retr_transact_user_id}/transaction/credit`,
        headers,
        query: {},
        body: cipherD
      })
    ])
    // console.log("D", creditD)
    InterService.triggerUserNotification({
      header: headers,
      title: "Commission Earned",
      body: `${parseFloat(creditPayload.cwtr_transaction_amount + '').toFixed(4)} Distributor Commission recevied for ${retr_operator} Mobile recharge.`,
      userId: creditPayload.cwtr_user_id
    })

    return true
  }

  async revertRechargeTransaction(headers, successType: string, transaction_id: string, failureResponse) {
    const rechargeTransactionBody = {
      "retr_status": 'FAILED',
      "retr_response_object": JSON.stringify(failureResponse),
    }
    const {
      retr_status,
      retr_org, retr_super_distributor, retr_distributor, retr_retailer,
      retr_operator, retr_mobile, retr_plan, retr_net_payable,
      retr_transact_user_id, retr_user_id, retr_operator_object,
    } = await this.rechargeTransaction.findOneAndUpdate({ "retr_id": transaction_id }, rechargeTransactionBody)

    if (retr_status != 'PROCESSING')
      throw new HttpException({ message: "Somethign went wrong" }, HttpStatus.BAD_REQUEST);

    // ### Payload construction 
    const { prov_commission } = JSON.parse(retr_operator_object + '')?.providers[0] ?? {}
    const CommissionR = ((parseFloat(retr_plan + '') * parseFloat(prov_commission.retailer)) / 100).toFixed(8)
    const CommissionR_CREDIT = (parseFloat(retr_plan + '') - parseFloat(CommissionR)).toFixed(8)
    const creditPayload = {
      "cwtr_status": "CR_SUCCESS_RECHARGE_REFUND",
      "cwtr_transaction_id": transaction_id,
      "cwtr_transacted_user_id": retr_transact_user_id,
      "cwtr_session_id": 'n/a',
      "cwtr_short_description": "Amount Refunded",
      "cwtr_description": `${retr_operator} Mobile recharge for ${retr_mobile} got failed`,
      "cwtr_remark": "",
      "cwtr_note": "",

      "cwtr_transaction_amount": CommissionR_CREDIT,
      "cwtr_user_id": retr_user_id,
    }

    // ### R Refund credit
    const cipher = this.cipherService.encryptWithFormat(creditPayload)
    const creditR = await Promise.all([
      await InterService.httpCommunicationChannel({
        service: 'cr-wallet',
        method: 'post',
        endpoint: `/cr-wallet/user/${retr_transact_user_id}/transaction/credit`,
        headers,
        query: {},
        body: cipher
      })
    ])
    // console.log("R", creditR)

    return true
  }

  async jskCallback(query: any) {
    try {
      Logger.log(query)
      return true
    } catch (err) {
      return err
    }
  }

}