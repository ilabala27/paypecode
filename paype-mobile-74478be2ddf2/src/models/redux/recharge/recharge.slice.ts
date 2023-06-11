import { createSlice } from '@reduxjs/toolkit'
import { Contact } from 'react-native-contacts';

const listInit = { isLoading: true, data: [] }

export interface rechargeInitialState {
  isLoading: boolean;
  mobileRechargeManagement: {
    isLoading: boolean;
    settings: {
      operators: any[];
      providers: any[];
      commissions: any[];
    }
  };
  prepaidProviderOptions: any[];
  dthProviderOptions: any[];
  mobileContacts: Contact[];
  history: { isLoading: boolean, data: any[] };
}

export const mobileRechargeManagement = {
  isLoading: true,
  settings: {
    operators: [],
    providers: [],
    commissions: [],
  }
}

export const initialState = {
  isLoading: true,
  mobileRechargeManagement,
  prepaidProviderOptions: [],
  dthProviderOptions: [],
  mobileContacts: [],
  history: listInit
}

const slice = createSlice({
  name: 'recharge',
  initialState,
  reducers: {
    setRechargeStore: (state, incoming) => {
      return state = {
        ...state,
        ...incoming.payload
      }
    }
  },
})

export const rechargeReducer = slice.reducer
export const rechargeActions = slice.actions
