import { AxiosResponse } from 'axios';
import { mobileRechargeManagement, rechargeActions } from './recharge.slice';
import { takeLatest, call, put, } from 'redux-saga/effects';
import { RECHARGE_SAGA_ACTIONS } from './recharge.sagaActions';
import { } from './recharge.utils';
import { getAll, requestPermissions } from '@utilis/methods/contacts.methods';
import RechargeApis from '@models/api/paype/recharge/recharge.api';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { constructQuery } from '@utilis/methods/string.method';

export function* initMobileRecharge({ payload, type }: any) {
  try {
    yield put(rechargeActions.setRechargeStore({ mobileRechargeManagement }));
    const operatorsRes: AxiosResponse<any, any> =
      yield call(() =>
        RechargeApis.getOperatorWithStrict({ query: { oper_type: "MOBILE_RECHARGE" } })
      );
    const { data: operators }: any = operatorsRes

    const providersRes: AxiosResponse<any, any> =
      yield call(() =>
        RechargeApis.getProviderWithStrict({ query: { is_deleted: false } })
      );
    const { data: providers }: any = providersRes

    const commissionsRes: AxiosResponse<any, any> =
      yield call(() =>
        RechargeApis.getCommissionWithStrict({ query: { is_deleted: false, comm_user_chain_ids: 'fsfsf' } })
      );
    const { data: commissions }: any = commissionsRes

    yield put(rechargeActions.setRechargeStore({
      mobileRechargeManagement: {
        isLoading: false,
        settings: {
          operators,
          providers,
          commissions
        }
      }
    }));
  } catch (e) {
    console.log("Error from saga middleware", e)
  }
}

export function* getHistory({ payload, type }: any) {
  try {
    yield put(rechargeActions.setRechargeStore({ history: { isLoading: true, data: [] } }));
    const response: AxiosResponse<any, any> =
      yield call(() =>
        RechargeApis.getHistory(payload)
      );
    const { data }: any = response

    yield put(rechargeActions.setRechargeStore({ history: { isLoading: false, data: data } }));
  } catch (e) {
    console.log("Error from saga middleware", e)
  }
}

export function* getContacts() {
  try {
    yield call(() => requestPermissions());
    const mobileContacts: Promise<any> = yield call(() => getAll());
    yield put(rechargeActions.setRechargeStore({ mobileContacts }));
  } catch (err) {
    console.log(err)
  }
}


export function* rechargeSaga() {
  yield takeLatest(RECHARGE_SAGA_ACTIONS.INIT_MOBILE_RECHARGE, initMobileRecharge);
  yield takeLatest(RECHARGE_SAGA_ACTIONS.GET_CONTACTS, getContacts);
  yield takeLatest(RECHARGE_SAGA_ACTIONS.SET_HISTORY, getHistory);
};
