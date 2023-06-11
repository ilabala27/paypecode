import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MainHeader } from '@views/components/functional/MainHeader';
import { INavigationProps } from '@utilis/interfaces/navigation.interface';
import design from '@config/design.config';
import NavigationServiceUtils from '@controllers/utils/NavService.utils';
import { NavKeys } from '@controllers/utils/NavKeys.utils';
import { adminTransportor } from '@models/redux/admin/admin.transportor';
import { Loader } from '@views/components/functional/Loader';
import { FlatList } from '@views/components/functional/Flatlist';
import { hs, ws } from '@utilis/designs/measurements.design';
import colors from '@config/colors.config';
import { systemTransportor } from '@models/redux/system/system.transportor';
import { grantStatus } from '@utilis/hooks/rbac/authorization.rbac';
import NavServiceUtils from '@controllers/utils/NavService.utils';
import { TitleWithList } from '@views/components/designs/TitleWithList';
import { servicesTransportor } from '@models/redux/services/services.transportor';
import { useTranslation } from 'react-i18next';


export default ({ route, navigation }: INavigationProps) => {
  const { t } = useTranslation();
  const { systemStore } = systemTransportor()
  const { user } = systemStore() ?? {}
  const { adminStore, setRBACOptions, setAddressOptions, } = adminTransportor()
  const { isLoading } = adminStore() ?? {}
  const { servicesStore, setOnboardingLimit } = servicesTransportor()
  const { onBoardingLimit } = servicesStore()
  const userCreationLimit = onBoardingLimit?.onqu_available ?? 0
  const grant = grantStatus([
    "root:rbac",
    "root:onboarding-user", "onboarding-user:new-user", "onboarding-user:in-progress", "onboarding-user:verification", "onboarding-user:activation",
    "root:user-management", "user-management:active-user", "user-management:cash-deposit-approve",
    "root:service-management", "service-management:categories", "service-management:services"
  ])
  const list = [
    {
      name: "RBAC Management", key: "rbac", visible: grant["root:rbac"],
      childrens: [
        { name: t("CONSOLE.RBAC_MANAGEMENT.PERMISSION"), key: "permission", iconType: 'Entypo', icon: 'shield', navKey: NavKeys.ADMIN.PERMISSION_SCREEN, params: {}, visible: true },
        { name: t("CONSOLE.RBAC_MANAGEMENT.PERMISSION_GROUP"), iconType: 'FontAwesome', icon: 'object-group', key: "permission-group", navKey: NavKeys.ADMIN.PERMISSION_GROUP_SCREEN, params: {}, visible: true },
        { name:t("CONSOLE.RBAC_MANAGEMENT.ROLE"), key: "role", iconType: 'FontAwesome', icon: 'users', navKey: NavKeys.ADMIN.ROLE_SCREEN, params: {}, visible: true },
      ]
    },
    {
      name: "User Onboarding", key: "user-onboarding", visible: grant["root:onboarding-user"],
      childrens: [
        { name: `${t("CONSOLE.USER_ONBOARDING.NEW_USER")} ( ${userCreationLimit} )`, iconType: 'FontAwesome', icon: 'user-plus', key: "new-user-onboarding", navKey: NavKeys.ADMIN.USER_ONBOARDING_WELCOME, params: {}, visible: userCreationLimit > 0 && grant["onboarding-user:new-user"], },
        { name: t("CONSOLE.USER_ONBOARDING.ONBOARDING_PROCESS"), iconType: 'Entypo', icon: 'progress-empty', key: "onboarding-in-progress", navKey: NavKeys.ADMIN.USER_LIST, params: { type: 'ONBOARDING_IN_PROGRESS' }, visible: grant["onboarding-user:in-progress"], },
        { name: t("CONSOLE.USER_ONBOARDING.PENDING_VERIFICATION"), iconType: 'Entypo', icon: 'progress-one', key: "pending-verification", navKey: NavKeys.ADMIN.USER_LIST, params: { type: 'PENDING_VERIFICATION' }, visible: grant["onboarding-user:verification"], },
        { name:t("CONSOLE.USER_ONBOARDING.VERIFICATION_IN_PROGRESS"), iconType: 'MaterialCommunityIcons', icon: 'clipboard-clock', key: "verification-in-progress", navKey: NavKeys.ADMIN.USER_LIST, params: { type: 'VERIFICATION_IN_PROGRESS' }, visible: grant["onboarding-user:verification"], },
        { name: t("CONSOLE.USER_ONBOARDING.PENDING_ACTIVATION"), iconType: 'Entypo', icon: 'progress-two', key: "pending-activation", navKey: NavKeys.ADMIN.USER_LIST, params: { type: 'PENDING_ACTIVATION' }, visible: grant["onboarding-user:activation"], },
        { name: t("CONSOLE.USER_ONBOARDING.ACTIVATION_IN_PROGRESSS"), iconType: 'FontAwesome5', icon: 'user-clock', key: "activation-in-progress", navKey: NavKeys.ADMIN.USER_LIST, params: { type: 'ACTIVATION_IN_PROGRESS' }, visible: grant["onboarding-user:activation"], },
      ]
    },
    {
      name: "User Management", key: "user-management", visible: grant["root:user-management"],
      childrens: [
        { name: t("CONSOLE.USER_MANAGEMENT.ACTIVE_USERS"), iconType: 'FontAwesome', icon: 'user', key: "active-users", navKey: NavKeys.ADMIN.USER_LIST, params: { type: 'ACTIVE' }, visible: grant["user-management:active-user"], },
        { name: t("CONSOLE.USER_MANAGEMENT.CASH_DEPOSIT"), iconType: 'Ionicons', icon: 'cash', key: "ios-cash-outline", navKey: NavKeys.WALLET.CASH_DEPOSIT, params: { type: 'CREATED' }, visible: grant["user-management:cash-deposit-approve"], },
      ]
    },
    {
      name: "Service Management", key: "service-management", visible: grant["root:service-management"],
      childrens: [
        { name: t("CONSOLE.SERVICE_MANAGEMENT.CATEGORIES"), iconType: 'MaterialIcons', icon: 'category', key: "categories", navKey: NavKeys.ADMIN.MANAGE_CATEGORIES_SCREEN, params: {}, visible: grant["service-management:categories"], },
        { name:t("CONSOLE.SERVICE_MANAGEMENT.SERVICES"), iconType: 'Entypo', icon: 'list', key: "services", navKey: NavKeys.ADMIN.MANAGE_SERVICES_SCREEN, params: {}, visible: grant["service-management:services"], },
      ]
    }
  ]

  
  useEffect(() => {
    initAdminState()
  }, [])

  const initAdminState = () => {
    setAddressOptions()
    setRBACOptions({
      body: {
        "permissionId": "root",
        "permissionGroupId": "root",
        "roleId": user?.user?.user_role,
        "serviceRootId": "root:services"
      }
    })
    const body = {
      "is_active": true,
      "onqu_user_id": user?.user?.user_id
    }
    setOnboardingLimit({ body })
  }


  return (
    <View style={design.GENERIC_SCREEN_S}>
      <MainHeader
        render={[
          { type: "Icon" },
          { type: "Title", title: "Console" },
          { type: "ProfilePicture", onPress: () => NavServiceUtils.navigate(NavKeys.MY_PROFILE) },
        ]}
      />
      {isLoading ? <Loader /> :
        <FlatList
          data={list}
          bottomSpace={true}
          onRefresh={initAdminState}
          refreshing={false}
          renderItem={({ item, index }) => {
            return (
              item.visible &&
              <TitleWithList
                item={item}
                index={index}
                onPress={() => item?.navKey && NavigationServiceUtils.navigate(item.navKey, item.params)}
              />
            )
          }}
        />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
    paddingVertical: hs(8),
    paddingHorizontal: ws(16),
    backgroundColor: colors.P_BG,
    marginBottom: hs(8)
  },
  list: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hs(12),
    paddingRight: ws(16),
    marginBottom: 1
  }
})
