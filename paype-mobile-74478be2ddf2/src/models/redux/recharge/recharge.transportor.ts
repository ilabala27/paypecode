import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { rechargeActions, rechargeInitialState } from '@models/redux/recharge/recharge.slice';
import { RECHARGE_SAGA_ACTIONS } from './recharge.sagaActions';


export const rechargeTransportor = () => {
    // ### store
    const store = () => useSelector((state: { recharge: rechargeInitialState }) => state.recharge, shallowEqual)
    // ### Actions
    const dispatch = useDispatch()
    // @@@ Redux actions
    const setRechargeStore = (payload: any) => dispatch(rechargeActions.setRechargeStore(payload))
    // @@@ Saga actions
    const initMobileRecharge = () => dispatch({ type: RECHARGE_SAGA_ACTIONS.INIT_MOBILE_RECHARGE })
    const getContacts = () => dispatch({ type: RECHARGE_SAGA_ACTIONS.GET_CONTACTS })
    const setHistory = (payload: any) => dispatch({ type: RECHARGE_SAGA_ACTIONS.SET_HISTORY, payload })

    return {
        rechargeStore: store,
        initMobileRecharge,
        setRechargeStore,
        getContacts,
        setHistory
    };
}
