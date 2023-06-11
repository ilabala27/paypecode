import { AxiosResponse } from 'axios';
import { systemActions } from './system.slice';
import { takeLatest, call, put, } from 'redux-saga/effects';
import { SYSTEM_SAGA_ACTIONS } from './system.sagaActions';
import { } from './system.utils';
import UserAPIs from '@models/api/paype/user/user.api';
import NavServiceUtils from '@controllers/utils/NavService.utils';
import { NavKeys } from '@controllers/utils/NavKeys.utils';
import AsyncKeys, { onLogOutAsyncKeys } from '@models/async/keys.async';
import { getItem, getParsedItem, removeItems, setItem } from '@models/async/curd.async';
import RBACApis from '@models/api/paype/rbac/rbac.api';
import { getCredtBalanceAndTransaction } from '../wallet/wallet.saga';
import UserApis from '@models/api/paype/user/user.api';


function* getSystemInitSaga({ payload, type }: any) {
  try {
    const isAppOnBoarded: Promise<any> =
      yield call(() =>
        getItem(AsyncKeys.onboarded)
      );
    const userData: Promise<any> =
      yield call(() =>
        getParsedItem(AsyncKeys.user)
      );
    const { user, aws }: any = userData ?? {}
    if (user && aws) {
      const rolesId: any = user?.user_role?.split(',')
      if (rolesId?.length > 0) {
        yield call(() =>
          getAuthorizationSaga({ payload: { body: { rolesId } } })
        );
      }
      const payload = { params: { user_id: user?.user_id } }
      yield call(() =>
        getCredtBalanceAndTransaction({ payload })
      );
      yield put(systemActions.setSystemStore({ isAppOnBoarded, user: { user, aws }, isSystemLoading: false }));
    } else {
      yield put(systemActions.setSystemStore({ isAppOnBoarded, user: null, isSystemLoading: false }));
    }
  } catch (e) {
    console.log("Error from saga middleware", e)
  }
}

function* getLoginSaga({ payload, type }: any) {
  try {
    yield setItem(AsyncKeys.user, payload)
    yield call(() =>
      getSystemInitSaga({})
    );
    yield put(systemActions.setSnack({ message: "Successfully logged in", type: 'SUCCESS' }));
    NavServiceUtils.navigateAndReset(NavKeys.TAB_DASHBOARD.NAME, {
      screen: NavKeys.TAB_DASHBOARD.TAB_SCREEN_HOME
    })
  } catch (e) {
    console.log("Error from saga middleware", e)
  }
}

function* getAuthorizationSaga({ payload, type }: any) {
  try {
    const response: AxiosResponse<any, any> =
      yield call(() =>
        RBACApis.getRBACAuthorization(payload)
      );
    const { data }: any = response
    const isRoot = data?.roles?.value?.root ? true : false
    yield put(systemActions.setSystemStore({ RBAC: { ...data, isRoot } }));
  } catch (e) {
    console.log("Error from saga middleware", e)
  }
}

function* getLogOutSaga({ payload, type }: any) {
  try {
    console.log("Test")
    yield put(systemActions.setSystemStore({ isLogOutLoading: true }));
    const response: AxiosResponse<any, any> =
      yield call(() => UserAPIs.logout(payload));
    const { success }: any = response.data ?? {}
    yield call(() => justLogOut({ payload: { success } }))
  } catch ({ message }) {
    if (message != 'jwt expired' || message != 'Access Token has been revoked') {
      yield call(() => justLogOut({ payload: { success: false } }))
    }
  }
}

function* justLogOut({ payload, type }: any) {
  yield call(() => removeItems(onLogOutAsyncKeys))
  yield put(systemActions.setSystemStore({ isLogOutLoading: false }));
  yield call(() => NavServiceUtils.navigateAndReset(NavKeys.AUTH_LOGIN))
  if (payload?.success) {
    yield put(systemActions.setSnack({ message: "Successfully logged out", type: 'SUCCESS' }));
  } else {
    yield put(systemActions.setSnack({ message: payload?.message ?? "Something went wrong", type: 'ERROR' }));
  }
}

function* getUserInfoById({ payload, type }: any) {
  try {
    yield put(systemActions.setSystemStore({
      isUserDetailsLoading: true,
      userAddress: null,
      userBusiness: null,
      userBusinessAddress: null,
      userBankDetails: null,
      userSupportingDocs: null,
    }));
    const response: AxiosResponse<any, any> =
      yield call(() =>
        UserApis.getOnBoardingStatusByUserId(payload)
      );
    const { data }: any = response
    yield put(systemActions.setSystemStore({
      userAddress: data?.address_user ?? null,
      userBusiness: data?.business ?? null,
      userBusinessAddress: data?.address_business ?? null,
      userBankDetails: data?.bank ?? null,
      userSupportingDocs: data?.documents ?? null,
    }));
  } catch (e) {
    console.log("Error from saga middleware", e)
  }
}

export function* systemSaga() {
  yield takeLatest(SYSTEM_SAGA_ACTIONS.SET_SYSTEM_INIT, getSystemInitSaga);
  yield takeLatest(SYSTEM_SAGA_ACTIONS.SET_LOGIN, getLoginSaga);
  yield takeLatest(SYSTEM_SAGA_ACTIONS.SET_AUTHORIZATION, getAuthorizationSaga);
  yield takeLatest(SYSTEM_SAGA_ACTIONS.JUST_LOGOUT, justLogOut);
  yield takeLatest(SYSTEM_SAGA_ACTIONS.SET_LOGOUT, getLogOutSaga);
  yield takeLatest(SYSTEM_SAGA_ACTIONS.SET_USER_INFO_BY_ID, getUserInfoById);
};
