import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { systemActions, systemInitialState } from '@models/redux/system/system.slice';
import { SYSTEM_SAGA_ACTIONS } from '@models/redux/system/system.sagaActions';


export const systemTransportor = () => {
    // ### store
    const store = () => useSelector((state: { system: systemInitialState }) => state.system, shallowEqual)
    // ### Actions
    const dispatch = useDispatch()
    // @@@ Redux actions
    const setSystemStore = (payload: any) => dispatch(systemActions.setSystemStore(payload))
    const setSnack = (payload: any) => dispatch(systemActions.setSnack(payload))
    const resetSnack = () => dispatch(systemActions.setSnack({ message: '', type: '', timeout: 0 }))
    // @@@ Saga actions
    const setSystemInit = (payload?: any) => dispatch({ type: SYSTEM_SAGA_ACTIONS.SET_SYSTEM_INIT, payload })
    const setLogin = (payload: any) => dispatch({ type: SYSTEM_SAGA_ACTIONS.SET_LOGIN, payload })
    const setAuthorization = (payload: any) => dispatch({ type: SYSTEM_SAGA_ACTIONS.SET_AUTHORIZATION, payload })
    const setLogout = (payload: any) => dispatch({ type: SYSTEM_SAGA_ACTIONS.SET_LOGOUT, payload })
    const setUSerInfoById = (payload: any) => dispatch({ type: SYSTEM_SAGA_ACTIONS.SET_USER_INFO_BY_ID, payload })

    return {
        systemStore: store,
        setSystemStore,
        setSnack,
        resetSnack,
        setSystemInit,
        setLogin,
        setAuthorization,
        setLogout,
        setUSerInfoById
    }
};
