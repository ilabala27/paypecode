import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { adminActions, adminInitialState } from '@models/redux/admin/admin.slice';
import { ADMIN_SAGA_ACTIONS } from '@models/redux/admin/admin.sagaActions';


export const adminTransportor = () => {
    // ### store
    const store = () => useSelector((state: { admin: adminInitialState }) => state.admin, shallowEqual)
    // ### Actions
    const dispatch = useDispatch()
    // @@@ Redux actions
    const setAdminStore = (payload: any) => dispatch(adminActions.setAdminStore(payload))
    // @@@ Saga actions
    const setAddressOptions = () => dispatch({ type: ADMIN_SAGA_ACTIONS.SET_ADDRESS_OPTIONS })
    const setRBACOptions = (payload: any) => dispatch({ type: ADMIN_SAGA_ACTIONS.SET_RBAC_OPTIONS, payload })
    const setPermissionOptions = (payload: any) => dispatch({ type: ADMIN_SAGA_ACTIONS.SET_PERMISSION_OPTIONS, payload })
    const setPermissionGroupOptions = (payload: any) => dispatch({ type: ADMIN_SAGA_ACTIONS.SET_PERMISSION_GROUP_OPTIONS, payload })
    const setRoleOptions = (payload: any) => dispatch({ type: ADMIN_SAGA_ACTIONS.SET_ROLE_OPTIONS, payload })


    return {
        adminStore: store,
        setAdminStore,
        setAddressOptions,
        setRBACOptions,
        setPermissionOptions,
        setPermissionGroupOptions,
        setRoleOptions
    }
};
