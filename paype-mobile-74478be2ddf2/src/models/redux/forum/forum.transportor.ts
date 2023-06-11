import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { forumActions, forumInitialState } from '@models/redux/forum/forum.slice';
import { FORUM_SAGA_ACTIONS } from './forum.sagaActions';


export const forumTransportor = () => {
    // ### store
    const store = () => useSelector((state: { forum: forumInitialState }) => state.forum, shallowEqual)
    // ### Actions
    const dispatch = useDispatch()
    // @@@ Redux actions
    const setForumStore = (payload: any) => dispatch(forumActions.setForumStore(payload))
    // @@@ Saga actions
    const initForum = () => dispatch({ type: FORUM_SAGA_ACTIONS.INIT_FORUM })

    return {
        forumStore: store,
        setForumStore,
        initForum,
    };
}
