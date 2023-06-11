import { RechargeAxios } from "@models/api/paype/recharge/recharge.axios";
import { constructQuery } from "@utilis/methods/string.method";

interface request {
    url?: string | any;
    header?: object | any;
    body?: object | any;
    params?: object | any;
    query?: object | any;
}

const RechargeApis = {
    // Mobile recharge
    getOperatorWithStrict: ({ query }: request) => RechargeAxios.get(`/operator/and${constructQuery(query)}`),
    createOperator: ({ body }: request) => RechargeAxios.post('/operator', body),

    getProviderWithStrict: ({ query }: request) => RechargeAxios.get(`/provider/and${constructQuery(query)}`),
    getCommissionWithStrict: ({ query }: request) => RechargeAxios.get(`/commission/and${constructQuery(query)}`),

    getOperator: ({ body }: request) => RechargeAxios.post(`/recharge-api/get-operator`, body),
    getPlan: ({ body }: request) => RechargeAxios.post('/recharge-api/get-plan', body),
    doRecharge: ({ body }: request) => RechargeAxios.post(`/recharge-transaction-make/now`, body),
    getHistory: ({ body }: request) => RechargeAxios.post('/recharge-transaction/fields', body),
}

export default RechargeApis