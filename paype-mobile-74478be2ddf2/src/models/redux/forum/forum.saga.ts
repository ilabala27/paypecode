import { AxiosResponse } from 'axios';
import { initialState, forumActions } from './forum.slice';
import { takeLatest, call, put, } from 'redux-saga/effects';
import { FORUM_SAGA_ACTIONS } from './forum.sagaActions';
import ForumApis from '@models/api/paype/forum/forum.api';
import { } from './forum.utils';


export function* initStoryBoard({ payload, type }: any) {
  try {
    yield put(forumActions.setForumStore(initialState));
    const storyRes: AxiosResponse<any, any> =
      yield call(() =>
        ForumApis.getStoryWithStrict({ query: { is_deleted: false } })
      );
    const { data: storyBoard }: any = storyRes

    yield put(forumActions.setForumStore({
      isLoading: false,
      storyBoard: { isLoading: false, data: storyBoard }
    }));
  } catch (e) {
    console.log("Error from saga middleware", e)
  }
}

export function* forumSaga() {
  yield takeLatest(FORUM_SAGA_ACTIONS.INIT_FORUM, initStoryBoard);
};
