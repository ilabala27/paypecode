import { createSlice } from '@reduxjs/toolkit'

const listInit = { isLoading: true, data: [] }

export interface walletInitialState {
  // Credit wallet
  creditWalletBalance: any;
  creditWalletTransactions: { isLoading: boolean, data: any[] };
  cashDeposit: { isLoading: boolean, data: any[] };

  // Trade wallet
  tradeWalletBalance: any;
  tradeWalletTransactions: { isLoading: boolean, data: any[] };
}

const slice = createSlice({
  name: 'wallet',
  initialState: {
    // Credit wallet
    creditWalletBalance: null,
    creditWalletTransactions: listInit,
    cashDeposit: listInit,

    // Trade wallet
    tradeWalletBalance: null,
    tradeWalletTransactions: listInit,
  },
  reducers: {
    setWalletStore: (state, incoming) => {
      return state = { ...state, ...incoming.payload }
    },
  },
})

export const walletreducer = slice.reducer
export const walletActions = slice.actions
