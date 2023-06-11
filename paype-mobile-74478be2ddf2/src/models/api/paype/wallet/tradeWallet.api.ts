import { TradeWalletAxios } from "@models/api/paype/wallet/tradeWallet.axios";


interface request {
    url?: string | any;
    header?: object | any;
    body?: object | any;
    params?: object | any;
}

const TradeWalletApis = {
    // ### Wallet
    getTradeBalance: ({ params }: request) => TradeWalletAxios.get(`/trade-wallet/user/${params?.user_id}/balance`),
    getTradeTransactions: ({ params }: request) => TradeWalletAxios.get(`/trade-wallet-transaction/query?type=all&wallet_id=${params?.wallet_id}`),

}

export default TradeWalletApis