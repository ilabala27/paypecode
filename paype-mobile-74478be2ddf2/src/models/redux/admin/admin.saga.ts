import UserAPIs from '@models/api/paype/user/user.api';
import RbacApis from '@models/api/paype/rbac/rbac.api';
import { AxiosResponse } from 'axios';
import { takeLatest, call, put, delay, } from 'redux-saga/effects';
import { ADMIN_SAGA_ACTIONS } from './admin.sagaActions';
import { adminActions } from './admin.slice';
import { permissionGroupsList, permissionsList, rolesList, servicesList } from './admin.utils';
import { systemActions } from '../system/system.slice';
import { SYSTEM_SAGA_ACTIONS } from '../system/system.sagaActions';


function* getAddressOptionsSaga() {
  try {
    const response: AxiosResponse<any, any> =
      yield call(() =>
        UserAPIs.getAllAddressOptions()
      );
    const { data }: any = response
    yield put(adminActions.setAdminStore(data));
  } catch (e) {
    console.log("Error from saga middleware", e)
  }
}

function* getRbacOptionsSaga({ payload, type }: any) {
  try {
    const grant = type == ADMIN_SAGA_ACTIONS.SET_RBAC_OPTIONS
    const response: AxiosResponse<any, any> =
      yield call(() =>
        RbacApis.getRBACOptions(payload)
      );
    const { data }: any = response

    if (grant || type == ADMIN_SAGA_ACTIONS.SET_PERMISSION_OPTIONS) {
      const permissions = permissionsList(data.permissionsTree)
        , permissionsTree = data.permissionsTree
      yield put(adminActions.setAdminStore({ permissions, permissionsTree }));
    }

    if (grant || type == ADMIN_SAGA_ACTIONS.SET_PERMISSION_GROUP_OPTIONS) {
      const permissionGroups = permissionGroupsList(data.permissionGroupsTree)
        , permissionGroupsTree = data.permissionGroupsTree
      yield put(adminActions.setAdminStore({ permissionGroups, permissionGroupsTree }));
    }

    if (grant || type == ADMIN_SAGA_ACTIONS.SET_ROLE_OPTIONS) {
      const roles = rolesList(data.rolesTree)
        , rolesTree = data.rolesTree
      yield put(adminActions.setAdminStore({ roles, rolesTree }));
    }

    if (grant || type == SYSTEM_SAGA_ACTIONS.SET_AVAILABLE_SERVICES) {
      const servies = servicesList(data.servicesTree)
      yield put(systemActions.setSystemStore({ servies }));
    }

    yield put(adminActions.setAdminStore({ isLoading: false }));
  } catch (e) {
    console.log("Error from saga middleware", e)
  }
}

export function* adminSaga() {
  yield takeLatest(ADMIN_SAGA_ACTIONS.SET_ADDRESS_OPTIONS, getAddressOptionsSaga);
  yield takeLatest([
    ADMIN_SAGA_ACTIONS.SET_RBAC_OPTIONS,
    ADMIN_SAGA_ACTIONS.SET_PERMISSION_OPTIONS,
    ADMIN_SAGA_ACTIONS.SET_PERMISSION_GROUP_OPTIONS,
    SYSTEM_SAGA_ACTIONS.SET_AVAILABLE_SERVICES,
    ADMIN_SAGA_ACTIONS.SET_ROLE_OPTIONS,
  ], getRbacOptionsSaga);
};