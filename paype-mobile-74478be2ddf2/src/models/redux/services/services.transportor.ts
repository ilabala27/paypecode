import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { servicesActions, servicesInitialState } from '@models/redux/services/services.slice';
import { SYSTEM_SAGA_ACTIONS } from '@models/redux/services/services.sagaActions';


export const servicesTransportor = () => {
    // ### store
    const store = () => useSelector((state: { services: servicesInitialState }) => state.services, shallowEqual)
    // ### Actions
    const dispatch = useDispatch()
    // @@@ Redux actions
    const setServicesStore = (payload: any) => dispatch(servicesActions.setServicesStore(payload))
    // @@@ Saga actions
    const setServicesWithCategories = (payload: any) => dispatch({ type: SYSTEM_SAGA_ACTIONS.SET_SERVICES_WITH_CATEGORIES, payload })
    const setOnboardingLimit = (payload: any) => dispatch({ type: SYSTEM_SAGA_ACTIONS.SET_ONBOARDING_LIMIT, payload })
    
    return {
        servicesStore: store,
        setServicesStore,
        setServicesWithCategories,
        setOnboardingLimit,
    }
};
