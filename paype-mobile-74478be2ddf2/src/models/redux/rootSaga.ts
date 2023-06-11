import { all, fork } from 'redux-saga/effects';

// Saga imports
import { systemSaga } from './system/system.saga';
import { adminSaga } from './admin/admin.saga';
import { walletSaga } from './wallet/wallet.saga';
import { servicesSaga } from './services/services.saga';
import { rechargeSaga } from './recharge/recharge.saga';
import { forumSaga } from './forum/forum.saga';


export function* rootSaga() {
  yield all(
    [
      fork(systemSaga),
      fork(adminSaga),
      fork(walletSaga),
      fork(servicesSaga),
      fork(rechargeSaga),
      fork(forumSaga),
    ]
  );
};