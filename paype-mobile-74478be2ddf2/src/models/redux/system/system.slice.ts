import { createSlice } from '@reduxjs/toolkit'


export interface systemInitialState {
  snack: {
    message: string;
    type: string;
    timeout: number
  };
  lang: string;
  isSystemLoading: boolean;
  isLogOutLoading: boolean;
  isAppOnBoarded: boolean;
  isLoggedIn: boolean;
  fcm: string;
  user: any;
  isUserDetailsLoading: boolean,
  userAddress: any;
  userBusiness: any;
  userBusinessAddress: any;
  userBankDetails: any;
  userSupportingDocs: any;
  RBAC: any;
  servies: any[];
}

const slice = createSlice({
  name: 'system',
  initialState: {
    snack: {
      message: '',
      type: '',
      timeout: 0
    },
    lang: 'en',
    isSystemLoading: true,
    isLogOutLoading: false,
    isAppOnBoarded: false,
    isLoggedIn: false,
    fcm: null,
    user: null,
    isUserDetailsLoading: true,
    userAddress: null,
    userBusiness: null,
    userBusinessAddress: null,
    userBankDetails: null,
    userSupportingDocs: null,
    RBAC: null,
    servies: [],
  },
  reducers: {
    setSnack: (state, incoming) => {
      return state = { ...state, snack: { ...incoming.payload } }
    },
    setSystemStore: (state, incoming) => {
      return state = { ...state, ...incoming.payload }
    },
  },
})

export const systemreducer = slice.reducer
export const systemActions = slice.actions
