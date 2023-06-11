import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavKeys } from '@controllers/utils/NavKeys.utils';
import { Loader } from '@views/components/functional/Loader';
import { systemTransportor } from '@models/redux/system/system.transportor';

{/* ### OnBoard screens - only on first open */ }
import Step1 from '@views/screens/onboard/Step1.onboard';
import Step2 from '@views/screens/onboard/Step2.onboard';
import Step3 from '@views/screens/onboard/Step3.onboard';

{/* ### Auth screens */ }
import WelcomeScreen from '@views/screens/auth/Welcome.screen';
import LoginScreen from '@views/screens/auth/Login.screen';
import ForceChangePasswordScreen from '@views/screens/auth/ForceChangePassword.screen';

{/* ### Main tab */ }
import { MainTab } from '@controllers/tabs/MainTab';

{/* ### Recharge screens */ }
import MobileRechargeScreen from '@views/screens/services/recharge/MobileRecharge.screen';
import SelectPlanScreen from '@views/screens/services/recharge/SelectPlan.screen';

{/* ### RBAC screens */ }
import PermissionScreen from '@views/screens/admin/rbac/Permission.screen';
import PermissionGroupScreen from '@views/screens/admin/rbac/PermissionGroup.screen';
import RoleScreen from '@views/screens/admin/rbac/Role.screen';
{/* ### RBAC forms */ }
import PermissionForm from '@views/screens/admin/rbac/form/Permission.form';
import PermissionGroupForm from '@views/screens/admin/rbac/form/PermissionGroup.form';
import RoleForm from '@views/screens/admin/rbac/form/Role.form';

{/* ### User onboarding screens */ }
import UserOnBoardingScreen from '@views/screens/admin/user/UserOnBoarding.screen';
import UserListScreen from '@views/screens/admin/user/UserList.screen';
import SupportingDocsListScreen from '@views/screens/admin/user/SupportingDocsList.screen';
{/* ### User onboarding forms */ }
import UserForm from '@views/screens/admin/user/form/User.form';
import BusniessForm from '@views/screens/admin/user/form/Busniess.form';
import BankForm from '@views/screens/admin/user/form/Bank.form';
import AddressForm from '@views/screens/admin/user/form/Address.form';
import SupportingDocsForm from '@views/screens/admin/user/form/SupportingDocs.form';
import ComingSoon from '@views/screens/common/ComingSoon.screen';
import CashDepositScreen from '@views/screens/wallet/CashDeposit.screen';
import CashDepositForm from '@views/screens/wallet/form/CashDeposit.form';
import ManageCategoryScreen from '@views/screens/admin/service/ManageCategory.screen';
import ManageCategoryForm from '@views/screens/admin/service/form/ManageCategory.form';
import ManageServiceScreen from '@views/screens/admin/service/ManageService.screen';
import ManageServiceForm from '@views/screens/admin/service/form/ManageService.form';
import OnboardingPurchaseScreen from '@views/screens/services/onboarding/OnboardingPurchase.screen';
import Profile from '@views/screens/profile/Profile.screen';
import ChangePasswordScreen from '@views/screens/profile/ChangePassword.screen';
import LanguagesScreen from '@views/screens/profile/Languages.screen';
import NotificationsScreen from '@views/screens/profile/Notifications.screen';
import UserDetailsScreen from '@views/screens/profile/UserDetails.screen';
import GstFilingFormScreen from '@views/screens/services/FormData/GstFiling.form.screen';
import GstRegistrationFormScreen from '@views/screens/services/FormData/GstRegistration.Form.Screen';
import MsmeFormScreen from '@views/screens/services/FormData/Msme.form.screen';
import FssaiRegistrationFormScreen from '@views/screens/services/FormData/FssaiRegistration.form.Screen';
import TrademarkFormScreen from '@views/screens/services/FormData/Trademark.form.Screen';
import WebDevelopmentFormScreen from '@views/screens/services/FormData/WebDevelopment.form.Screen';
import SoftwaresFormScreen from '@views/screens/services/FormData/Softwares.form.Screen';
import DigitalMarketingFormScreen from '@views/screens/services/FormData/DigitalMarketing.Form.Screen';
import IsoServicesFormScreen from '@views/screens/services/FormData/IsoServices.Form.Screen';
import TanAllotmentFormScreen from '@views/screens/services/FormData/TanAllotment.Form.Screen';
import DigitalSignatureFormScreen from '@views/screens/services/FormData/DigitalSignature.Form.Screen';
import PartnershipFirmFormScreen from '@views/screens/services/FormData/PartnershipFirm.Form.Screen';
import ImportExportLicenceFormScreen from '@views/screens/services/FormData/ImportExportLicence.Form.Screen';
import CompanyIncorprationFormScreen from '@views/screens/services/FormData/CompanyIncorpration.Form.Screen';
import ItrFilingSalariedFormScreen from '@views/screens/services/FormData/ItrFilingSalaried.Form.Screen';
import ItrFilingBusinessFormScreen from '@views/screens/services/FormData/ItrFilingBusiness.Form.Screen';
import PanRegistrationFormScreen from '@views/screens/services/FormData/PanRegistration.Form.Screen';
import ForgotPasswordScreen from '@views/screens/auth/ForgotPassword.screen';
import OtpScreen from '@views/screens/auth/Otp.screen';
import PDFManagementScreen from '@views/screens/common/PDFManagement.screen';
import RefillOptionsScreen from '@views/screens/wallet/RefillOptions.screen';
import RazorPayScreen from '@views/screens/wallet/RazorPay.screen';
import RazorPayForm from '@views/screens/wallet/form/RazorPay.form';
import SettingsScreen from '@views/screens/services/recharge/Settings.Screen';
import OperatorForm from '@views/screens/services/recharge/form/OperatorForm';
import MobileRechargeHistroy from '@views/screens/services/recharge/MobileRechargeHistroy';


const Stack = createNativeStackNavigator();
export default () => {
  const { systemStore, setSystemInit } = systemTransportor()
  const { isSystemLoading, isAppOnBoarded, user } = systemStore()

  useEffect(() => {
    setSystemInit()
  }, [])

  if (isSystemLoading) return <Loader />
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      initialRouteName={user ? NavKeys.TAB_DASHBOARD.NAME : isAppOnBoarded ? NavKeys.AUTH_WELCOME : NavKeys.ONBOARD_STEP1}
    >
      {/* Common screens */}
      <Stack.Screen name={NavKeys.COMING_SOON} component={ComingSoon} />
      <Stack.Screen name={NavKeys.PDF_MANAGEMENT} component={PDFManagementScreen} />
      <Stack.Screen name={NavKeys.MY_PROFILE} component={Profile} />

      {/* OnBoard screens */}
      <Stack.Screen name={NavKeys.ONBOARD_STEP1} component={Step1} />
      <Stack.Screen name={NavKeys.ONBOARD_STEP2} component={Step2} />
      <Stack.Screen name={NavKeys.ONBOARD_STEP3} component={Step3} />

      {/* Auth screens */}
      <Stack.Screen name={NavKeys.AUTH_WELCOME} component={WelcomeScreen} />
      <Stack.Screen name={NavKeys.AUTH_LOGIN} component={LoginScreen} />
      <Stack.Screen name={NavKeys.AUTH_FORCE_CHANGE_PASSWORD} component={ForceChangePasswordScreen} />
      <Stack.Screen name={NavKeys.AUTH_FORGOT_PASSWORD} component={ForgotPasswordScreen} />
      <Stack.Screen name={NavKeys.AUTH_OTP_VALIDATION} component={OtpScreen} />
      {/* RBAC screens & forms */}
      <Stack.Screen name={NavKeys.ADMIN.PERMISSION_SCREEN} component={PermissionScreen} />
      <Stack.Screen name={NavKeys.ADMIN.PERMISSION_FORM} component={PermissionForm} />
      <Stack.Screen name={NavKeys.ADMIN.PERMISSION_GROUP_SCREEN} component={PermissionGroupScreen} />
      <Stack.Screen name={NavKeys.ADMIN.PERMISSION_GROUP_FORM} component={PermissionGroupForm} />
      <Stack.Screen name={NavKeys.ADMIN.ROLE_SCREEN} component={RoleScreen} />
      <Stack.Screen name={NavKeys.ADMIN.ROLE_FORM} component={RoleForm} />

      {/* Manage Service screens & forms */}
      <Stack.Screen name={NavKeys.ADMIN.MANAGE_CATEGORIES_SCREEN} component={ManageCategoryScreen} />
      <Stack.Screen name={NavKeys.ADMIN.MANAGE_CATEGORIES_FORM} component={ManageCategoryForm} />
      <Stack.Screen name={NavKeys.ADMIN.MANAGE_SERVICES_SCREEN} component={ManageServiceScreen} />
      <Stack.Screen name={NavKeys.ADMIN.MANAGE_SERVICES_FORM} component={ManageServiceForm} />

      {/* User onboarding screens & forms */}
      <Stack.Screen name={NavKeys.ADMIN.USER_LIST} component={UserListScreen} />
      <Stack.Screen name={NavKeys.ADMIN.USER_ONBOARDING_SUPPORTING_DOCS_LIST} component={SupportingDocsListScreen} />
      <Stack.Screen name={NavKeys.ADMIN.USER_ONBOARDING_WELCOME} component={UserOnBoardingScreen} />
      <Stack.Screen name={NavKeys.ADMIN.USER_ONBOARDING_USER} component={UserForm} />
      <Stack.Screen name={NavKeys.ADMIN.USER_ONBOARDING_BUSINESS} component={BusniessForm} />
      <Stack.Screen name={NavKeys.ADMIN.USER_ONBOARDING_BANK} component={BankForm} />
      <Stack.Screen name={NavKeys.ADMIN.USER_ONBOARDING_ADDRESS} component={AddressForm} />
      <Stack.Screen name={NavKeys.ADMIN.USER_ONBOARDING_SUPPORTING_DOCS} component={SupportingDocsForm} />


      {/* Main Tab */}
      <Stack.Screen name={NavKeys.TAB_DASHBOARD.NAME} component={MainTab} />

      {/* Recharge screens */}
      <Stack.Screen name={NavKeys.RECHARGE_MOBILE} component={MobileRechargeScreen} />
      <Stack.Screen name={NavKeys.RECHARGE_MOBILE_HISTORY} component={MobileRechargeHistroy} />
      <Stack.Screen name={NavKeys.RECHARGE_SELECTPLAN} component={SelectPlanScreen} />
      <Stack.Screen name={NavKeys.RECHARGE_SETTINGS} component={SettingsScreen} />
      <Stack.Screen name={NavKeys.RECHARGE_OPERATOR_FORM} component={OperatorForm} />
      {/* Onboarding Purchase */}
      <Stack.Screen name={NavKeys.SERVICES.ONBOARDING_PURCHASE} component={OnboardingPurchaseScreen} />

      {/* Wallet screens */}
      <Stack.Screen name={NavKeys.WALLET.REFILL_OPTIONS} component={RefillOptionsScreen} />
      <Stack.Screen name={NavKeys.WALLET.RAZOR_PAY} component={RazorPayScreen} />
      <Stack.Screen name={NavKeys.WALLET.RAZOR_PAY_FORM} component={RazorPayForm} />
      <Stack.Screen name={NavKeys.WALLET.CASH_DEPOSIT} component={CashDepositScreen} />
      <Stack.Screen name={NavKeys.WALLET.CASH_DEPOSIT_FORM} component={CashDepositForm} />

      {/*Profile Screens*/}
      <Stack.Screen name={NavKeys.PROFILE.USER_DETAILS} component={UserDetailsScreen} />
      <Stack.Screen name={NavKeys.PROFILE.CHANGE_PASSWORD} component={ChangePasswordScreen} />
      <Stack.Screen name={NavKeys.PROFILE.LANGUAGES} component={LanguagesScreen} />
      <Stack.Screen name={NavKeys.PROFILE.NOTIFICATIONS} component={NotificationsScreen} />

      {/*Service Screen*/}
      <Stack.Screen name={NavKeys.FormData.GST_FILING} component={GstFilingFormScreen} />
      <Stack.Screen name={NavKeys.FormData.GST_REGISTRATION} component={GstRegistrationFormScreen} />
      <Stack.Screen name={NavKeys.FormData.MSME_REGISTRATION} component={MsmeFormScreen} />
      <Stack.Screen name={NavKeys.FormData.FSSAI_REGISTRATION} component={FssaiRegistrationFormScreen} />
      <Stack.Screen name={NavKeys.FormData.TRADEMARK_AND_COPYRIGHTS} component={TrademarkFormScreen} />
      <Stack.Screen name={NavKeys.FormData.WEB_DEVELOPMENT} component={WebDevelopmentFormScreen} />
      <Stack.Screen name={NavKeys.FormData.SOFTWARES} component={SoftwaresFormScreen} />
      <Stack.Screen name={NavKeys.FormData.DIGITAL_MARKETING} component={DigitalMarketingFormScreen} />
      <Stack.Screen name={NavKeys.FormData.ISO_SERVICES} component={IsoServicesFormScreen} />
      <Stack.Screen name={NavKeys.FormData.TAN_ALLOTMENT} component={TanAllotmentFormScreen} />
      <Stack.Screen name={NavKeys.FormData.DIGITAL_SIGNATURE} component={DigitalSignatureFormScreen} />
      <Stack.Screen name={NavKeys.FormData.PARTNERSHIP_FIRM_REGISTRATION} component={PartnershipFirmFormScreen} />
      <Stack.Screen name={NavKeys.FormData.IMPORT_EXPORT_LICENCE} component={ImportExportLicenceFormScreen} />
      <Stack.Screen name={NavKeys.FormData.COMPANY_INCORPORATION} component={CompanyIncorprationFormScreen} />
      <Stack.Screen name={NavKeys.FormData.ITR_FILING_SALARIED} component={ItrFilingSalariedFormScreen} />
      <Stack.Screen name={NavKeys.FormData.ITR_FILING_BUSINESS} component={ItrFilingBusinessFormScreen} />
      <Stack.Screen name={NavKeys.FormData.PAN_REGISTRATION} component={PanRegistrationFormScreen} />
    </Stack.Navigator>
  );
}