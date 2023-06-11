import { CreditWalletAxios } from "@models/api/paype/wallet/creditWallet.axios";


interface request {
    url?: string | any;
    header?: object | any;
    body?: object | any;
    params?: object | any;
}

const CreditWalletApis = {
    // ### Wallet
    getCreditBalance: ({ params }: request) => CreditWalletAxios.get(`/cr-wallet/user/${params?.user_id}/balance`),
    getCreditTransactions: ({ params }: request) => CreditWalletAxios.get(`/cr-wallet-transaction/query?type=all&wallet_id=${params?.wallet_id}`),

    // ### CashDeposit
    createCashDepositRequest: ({ body }: request) => CreditWalletAxios.post('/cash-deposit', body),
    getCashDeposit: ({ params }: request) => CreditWalletAxios.get(`/cash-deposit/deposit/query?_id=${params?._id}&user_id=${params?.user_id}&status=${params?.status}`),
    getCashDepositList: ({ params }: request) => CreditWalletAxios.get(`/cash-deposit/deposits/query?_id=${params?._id}&user_id=${params?.user_id}&status=${params?.status}`),
    transactCashDeposit: ({ params, body }: request) => CreditWalletAxios.post(`/cash-deposit/transact/${params?._id}/${params?.status}`, body),

    // ### Razor pay
    createRazorPay: ({ body }: request) => CreditWalletAxios.post('/razor-pay', body),
    transactRazorPay: ({ params, body }: request) => CreditWalletAxios.post(`/razor-pay/transact/${params?._id}/${params?.status}`, body),


}

export default CreditWalletApis