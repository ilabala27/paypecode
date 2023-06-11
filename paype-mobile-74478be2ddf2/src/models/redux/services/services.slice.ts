import { serviceNavigationKeyOptions } from '@controllers/utils/NavKeys.utils';
import { createSlice } from '@reduxjs/toolkit'

const listInit = { isLoading: true, data: [] }

export interface servicesInitialState {
  navigationKeyOptions: { isLoading: boolean, data: any[] };
  servicesWithCategory: { isLoading: boolean, data: any[] };
  onBoardingLimit: any;
}

const slice = createSlice({
  name: 'services',
  initialState: {
    navigationKeyOptions: { ...listInit, data: serviceNavigationKeyOptions },
    servicesWithCategory: listInit,
    onBoardingLimit: null
  },
  reducers: {
    setServicesStore: (state, incoming) => {
      return state = { ...state, ...incoming.payload }
    },
  },
})

export const servicesreducer = slice.reducer
export const servicesActions = slice.actions
