import { AxiosResponse } from 'axios';
import { servicesActions } from './services.slice';
import { takeLatest, call, put, } from 'redux-saga/effects';
import { SYSTEM_SAGA_ACTIONS } from './services.sagaActions';
import { } from './services.utils';
import ServicesApis from '@models/api/paype/services/services.api';


export function* getServicesWithCategory({ payload, type }: any) {
  try {
    yield put(servicesActions.setServicesStore({ servicesWithCategory: { data: [], isLoading: true } }));
    const response: AxiosResponse<any, any> =
      yield call(() =>
        ServicesApis.getServicesWithCategory()
      );
    const { data }: any = response
    const categories: AxiosResponse<any, any> =
      yield call(() =>
        ServicesApis.getAllCategories()
      );
    const { data: categoriesData }: any = categories
    const categoriesWithoutServices = categoriesData.filter((el: any) => !(data.find((e: any) => e.cate_key == el.cate_key)))

    yield put(servicesActions.setServicesStore({ servicesWithCategory: { data: [...data, ...categoriesWithoutServices], isLoading: false } }));
  } catch (e) {
    console.log("Error from saga middleware", e)
  }
}

export function* getOnboardingLimit({ payload, type }: any) {
  try {
    const response: AxiosResponse<any, any> =
      yield call(() =>
        ServicesApis.getOnboardingLimit(payload)
      );
    const { data }: any = response
    yield put(servicesActions.setServicesStore({ onBoardingLimit: data[0] ?? null }));
  } catch (e) {
    console.log("Error from saga middleware", e)
  }
}

export function* servicesSaga() {
  yield takeLatest(SYSTEM_SAGA_ACTIONS.SET_SERVICES_WITH_CATEGORIES, getServicesWithCategory);
  yield takeLatest(SYSTEM_SAGA_ACTIONS.SET_ONBOARDING_LIMIT, getOnboardingLimit);
};
