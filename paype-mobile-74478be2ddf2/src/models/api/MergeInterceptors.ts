// ### PayPe
import axiosInterceptorUser from "@models/api/paype/user/user.axios";
import axiosInterceptorRbac from "@models/api/paype/rbac/rbac.axios";
import axiosInterceptorCreditWallet from "@models/api/paype/wallet/creditWallet.axios";
import axiosInterceptorServices from "@models/api/paype/services/services.axios";
import axiosInterceptorRecharge from "@models/api/paype/recharge/recharge.axios";

export default () => {
    axiosInterceptorUser()
    axiosInterceptorRbac()
    axiosInterceptorCreditWallet()
    axiosInterceptorServices()
    axiosInterceptorRecharge()
}