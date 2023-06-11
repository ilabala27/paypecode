import { AxiosResponse } from 'axios';
import { walletActions } from './wallet.slice';
import { takeLatest, call, put, } from 'redux-saga/effects';
import { SYSTEM_SAGA_ACTIONS } from './wallet.sagaActions';
import { } from './wallet.utils';
import CreditWalletApis from '@models/api/paype/wallet/creditWallet.api';
import NavServiceUtils from '@controllers/utils/NavService.utils';
import { systemActions } from '../system/system.slice';
import TradeWalletApis from '@models/api/paype/wallet/tradeWallet.api';


export function* getCredtBalanceAndTransaction({ payload, type }: any) {
  try {
    yield put(walletActions.setWalletStore({ creditWalletTransactions: { isLoading: true, data: [] } }));
    const balanceResp: AxiosResponse<any, any> =
      yield call(() =>
        CreditWalletApis.getCreditBalance(payload)
      );
    yield put(walletActions.setWalletStore({ creditWalletBalance: balanceResp.data }));
    const transactionRep: AxiosResponse<any, any> =
      yield call(() =>
        CreditWalletApis.getCreditTransactions({ params: { wallet_id: balanceResp?.data?.crwa_id } })
      );
    yield put(walletActions.setWalletStore({ creditWalletTransactions: { isLoading: false, data: transactionRep.data } }));
  } catch (e) {
    console.log("Error from saga middleware", e)
  }
}

export function* getTradeBalanceAndTransaction({ payload, type }: any) {
  try {
    yield put(walletActions.setWalletStore({ tradeWalletTransactions: { isLoading: true, data: [] } }));
    const balanceResp: AxiosResponse<any, any> =
      yield call(() =>
        TradeWalletApis.getTradeBalance(payload)
      );
    yield put(walletActions.setWalletStore({ tradeWalletBalance: balanceResp.data }));
    const transactionRep: AxiosResponse<any, any> =
      yield call(() =>
        TradeWalletApis.getTradeTransactions({ params: { wallet_id: balanceResp?.data?.crwa_id } })
      );
    yield put(walletActions.setWalletStore({ tradeWalletTransactions: { isLoading: false, data: transactionRep.data } }));
  } catch (e) {
    console.log("Error from saga middleware", e)
  }
}

function* getCashDepositList({ payload, type }: any) {
  try {
    yield put(walletActions.setWalletStore({ cashDeposit: { isLoading: true, data: [] } }));
    const response: AxiosResponse<any, any> =
      yield call(() =>
        CreditWalletApis.getCashDepositList(payload)
      );
    const { data }: any = response
    yield put(walletActions.setWalletStore({ cashDeposit: { isLoading: false, data } }));
  } catch (e) {
    console.log("Error from saga middleware", e)
  }
}

function* transactCashDeposit({ payload, type }: any) {
  try {
    const response: AxiosResponse<any, any> =
      yield call(() =>
        CreditWalletApis.transactCashDeposit(payload)
      );
    const { data }: any = response
    const body = { payload: { params: { user_id: payload.extraData.user_id } } }
    yield call(() =>
      getCredtBalanceAndTransaction(body)
    );
    NavServiceUtils.goBack()
    yield put(systemActions.setSnack({ message: 'Transaction successful', type: 'SUCCESS' }));
  } catch ({ message }) {
    NavServiceUtils.goBack()
    yield put(systemActions.setSnack({ message: message ?? 'Something went wrong', type: 'ERROR' }));
  }
}

function* transactRazorPay({ payload, type }: any) {
  try {
    const response: AxiosResponse<any, any> =
      yield call(() =>
        CreditWalletApis.transactRazorPay(payload)
      );
    const { data }: any = response
    const body = { payload: { params: { user_id: payload.extraData.user_id } } }
    yield call(() =>
      getCredtBalanceAndTransaction(body)
    );

    NavServiceUtils.goBack()
    if (data?.message == "Transaction successful") {
      yield put(systemActions.setSnack({ message: 'Transaction successful', type: 'SUCCESS' }));
    } else {
      yield put(systemActions.setSnack({ message: 'Transaction Failed', type: 'ERROR' }));
    }
  } catch ({ message }) {
    NavServiceUtils.goBack()
    yield put(systemActions.setSnack({ message: message ?? 'Transaction failed', type: 'ERROR' }));
  }
}


export function* walletSaga() {
  yield takeLatest(SYSTEM_SAGA_ACTIONS.SET_BALANCE_TRANSACTION, getCredtBalanceAndTransaction);
  yield takeLatest(SYSTEM_SAGA_ACTIONS.SET_BALANCE_TRANSACTION, getTradeBalanceAndTransaction);
  yield takeLatest(SYSTEM_SAGA_ACTIONS.SET_CASH_DEPOSIT, getCashDepositList);
  yield takeLatest(SYSTEM_SAGA_ACTIONS.TRANSACT_CASH_DEPOSIT, transactCashDeposit);
  yield takeLatest(SYSTEM_SAGA_ACTIONS.TRANSACT_RAZOR_PAY, transactRazorPay);
};
