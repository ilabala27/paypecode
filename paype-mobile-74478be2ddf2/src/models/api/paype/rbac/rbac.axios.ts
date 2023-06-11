import DefaultAxios from "axios";
import { getInfo } from "@utilis/plugins/NetInfo.plugin";
import { getParsedItem } from "@models/async/curd.async";
import AsyncKeys from "@models/async/keys.async";
import appConfig from '@config/app.config';
import { SYSTEM_SAGA_ACTIONS } from "@models/redux/system/system.sagaActions";
import store from "@models/redux/store";
const { baseURL, header, log, timeout } = appConfig.apiConnections.paype.rbac
import { Auth } from "aws-amplify";

export const RBACAxios = DefaultAxios.create({
    baseURL,
    timeout: timeout
});

// onRequest
const requestHandler = async (request: any) => {
    const user = await getParsedItem(AsyncKeys.user)
    const network = await getInfo(), session_id = user?.user?.user_session_id
    const token = (await Auth.currentSession()).getAccessToken().getJwtToken();
    const IdToken = (await Auth.currentSession()).getIdToken().getJwtToken();

    // Set default header if exist
    if (header) request.headers = { ...request.headers, ...header, session_id }
    // Set token if exist
    if (token) request.headers.Authorization = `Bearer ${token}`
    if (IdToken) request.headers.IdToken = `${IdToken}`
    // stop req if network not exist
    if (!network.isOnline) return false
    // log req if apiLog is true
    if (log) console.log("### request from PAYPE-RBAC", request)
    return request;
}

// onResponse
const responseHandler = (response: any) => {
    return response
}

// onError
const errorHandler = (mode: string, error: any) => {
    const { statusCode, status_code, message } = error?.response?.data ?? {}
    const status = status_code ?? statusCode ?? ''
    let finalMessage = ''

    if (status === 400) {
        finalMessage = message ?? 'ERROR.400'
        if (finalMessage == 'jwt expired' || finalMessage == 'Access Token has been revoked') {
            finalMessage = 'Session expired'
            store.dispatch({ type: SYSTEM_SAGA_ACTIONS.JUST_LOGOUT, payload: { success: false, message: finalMessage } })
        }
    } else if (status === 401) finalMessage = message ?? 'ERROR.401'
    else if (status === 404) finalMessage = message ?? 'ERROR.404'
    else if (status === 422) finalMessage = message ?? 'ERROR.422'
    else if (status === 1001) finalMessage = message ?? 'ERROR.DEFAULT'
    else finalMessage = message ?? 'ERROR.DEFAULT'

    return Promise.reject({ mode, message: finalMessage, error })
}

// onRequest Interceptor
const requestInterceptor = RBACAxios.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler("onRequest-RBAC-interceptor", error)
);

// onResponse Interceptor
const responseInterceptor = RBACAxios.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler("onResponse-RBAC-interceptor", error)
);

// Interceptor configure
export default () => {
    props: {
        navigation: {
            type: Object
        }
    }
    requestInterceptor
    responseInterceptor
}