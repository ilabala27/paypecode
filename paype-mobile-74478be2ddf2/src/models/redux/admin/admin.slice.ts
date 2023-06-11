import { createSlice } from '@reduxjs/toolkit'
import {
  userTypes, bankAccountTypes, documentTypes, addressTypes, cashDepositBanks
} from '@models/static/adminSlice.static';


export interface adminInitialState {
  isLoading: boolean;
  // ### User related options
  userTypes: any[];
  bankAccountTypes: any[];
  documentTypes: any[];
  cashDepositBanks: any[];
  // Address options
  addressTypes: any[];
  district: any[];
  state: any[];
  country: any[];
  postal: any[];
  // ### RBAC options
  permissions: any[];
  permissionsTree: any[];
  permissionGroups: any[];
  permissionGroupsTree: any[];
  roles: any[];
  rolesTree: any[];
}

const slice = createSlice({
  name: 'recharge',
  initialState: {
    isLoading: true,
    userTypes: userTypes,
    bankAccountTypes: bankAccountTypes,
    documentTypes: documentTypes,
    cashDepositBanks: cashDepositBanks,
    addressTypes: addressTypes,
    district: [],
    state: [],
    country: [],
    postal: [],
    permissions: [],
    permissionsTree: [],
    permissionGroups: [],
    permissionGroupsTree: [],
    roles: [],
    rolesTree: [],
  },
  reducers: {
    setAdminStore: (state, incoming) => {
      return state = {
        ...state,
        ...incoming.payload
      }
    }
  }
})

export const adminreducer = slice.reducer
export const adminActions = slice.actions
