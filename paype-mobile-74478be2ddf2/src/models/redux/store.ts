import { combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'
// Root saga imports
import { rootSaga } from './rootSaga'
// Reducer imports
import { systemreducer } from '@models/redux/system/system.slice'
import { adminreducer } from '@models/redux/admin/admin.slice'
import { rechargeReducer } from '@models/redux/recharge/recharge.slice'
import { walletreducer } from './wallet/wallet.slice'
import { servicesreducer } from './services/services.slice'
import { forumReducer } from './forum/forum.slice'


// ### Saga init
const sagaMiddleware = createSagaMiddleware()

// ### Reducer
const combinedReducers = combineReducers({
  system: systemreducer,
  admin: adminreducer,
  wallet: walletreducer,
  services: servicesreducer,
  recharge: rechargeReducer,
  forum: forumReducer,
})

// ### Store
export default configureStore({
  reducer: combinedReducers,
  middleware: (getDefaultMiddleware) => {
    const defaultMiddleware = getDefaultMiddleware({ thunk: false, serializableCheck: false })
    return [
      ...defaultMiddleware,
      sagaMiddleware
    ]
  }
})

// ### Saga execute
sagaMiddleware.run(rootSaga);