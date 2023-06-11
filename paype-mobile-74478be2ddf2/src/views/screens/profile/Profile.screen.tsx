import React, { useState } from 'react';
import { Alert, Linking, StyleSheet, Text, View } from 'react-native';
import { MainHeader } from '@views/components/functional/MainHeader';
import { INavigationProps } from '@utilis/interfaces/navigation.interface';
import { Loader } from '@views/components/functional/Loader';
import { FlatList } from '@views/components/functional/Flatlist';
import { hs, ms, ws } from '@utilis/designs/measurements.design';
import colors from '@config/colors.config';
import { systemTransportor } from '@models/redux/system/system.transportor';
import NavServiceUtils from '@controllers/utils/NavService.utils';
import { TitleWithList } from '@views/components/designs/TitleWithList';
import { Button } from '@views/components/functional/Button';
import { ScrollView } from '@views/components/functional/Scrollview';
import { openUrl } from '@utilis/methods/common.method';
import { MyAccountCard } from '@views/components/designs/MyAccountCard';
import { GradientView } from '@views/components/functional/GradientView';
import { NavKeys } from '@controllers/utils/NavKeys.utils';
import { Auth } from "aws-amplify";
import { useTranslation } from 'react-i18next';


export default ({ route, navigation }: INavigationProps) => {
  const { t } = useTranslation();
  const { systemStore, setLogout } = systemTransportor()
  const { isLogOutLoading } = systemStore()
  const [isLoading, setIsLoading] = useState(false)

  const list = [
    {
      name: t('PROFILE.MENU.ACCOUNT'), key: "user-onboarding", visible: true,
      childrens: [
        { name: t("PROFILE.MENU.ACCOUNT_MYPROFILE") ,iconType: 'FontAwesome', icon: 'user-o', key: "languages", visible: true, onPress: () => { NavServiceUtils.navigate(NavKeys.PROFILE.USER_DETAILS) } },
        { name: t("PROFILE.MENU.ACCOUNT_PARTNER_LICENCE"), iconType: 'MaterialCommunityIcons', icon: 'certificate-outline', key: "languages", visible: true, onPress: () => { NavServiceUtils.navigate(NavKeys.PDF_MANAGEMENT, { title: "Partner licence" }) } },
      ]
    },
    {
      name: t("PROFILE.MENU.SECURITY"), key: "user-onboarding", visible: true,
      childrens: [
        { name: t("PROFILE.MENU.SECURITY_CHANGE_PASSWORD"), iconType: 'MaterialCommunityIcons', icon: 'key-change', key: "languages", visible: true, onPress: () => { NavServiceUtils.navigate(NavKeys.PROFILE.CHANGE_PASSWORD) } },
      ]
    },
    {
      name: t("PROFILE.MENU.SETTINGS_PREFERENCES"), key: "rbac", visible: true,
      childrens: [
        { name: t("PROFILE.MENU.SETTINGS_PREFERENCES_LANGUAGES"), iconType: 'Entypo', icon: 'language', key: "languages", visible: true, onPress: () => { NavServiceUtils.navigate(NavKeys.PROFILE.LANGUAGES) } },
        { name: t("PROFILE.MENU.SETTINGS_PREFERENCES_NOTIFICATIONS"), iconType: 'FontAwesome', icon: 'bell-o', key: "notifications", visible: true, onPress: () => { NavServiceUtils.navigate(NavKeys.PROFILE.NOTIFICATIONS) } },
      ]
    },
    {
      name: t("PROFILE.MENU.LEGAL"), key: "user", visible: true,
      childrens: [
        { name: t("PROFILE.MENU.LEGAL_PRIVACY_POLICY"), iconType: 'Ionicons', icon: 'ios-document-text-outline', key: "about-paype", onPress: () => openUrl({ url: 'https://www.paype.co.in' }), visible: true },
        { name: t("PROFILE.MENU.LEGAL_TERMS_CONDITIONS"), iconType: 'Ionicons', icon: 'ios-document-text-outline', key: "about-paype", onPress: () => openUrl({ url: 'https://www.paype.co.in' }), visible: true },
        { name: t("PROFILE.MENU.LEGAL_ABOUT_PAYPE"), iconType: 'Ionicons', icon: 'ios-document-text-outline', key: "about-paype", onPress: () => openUrl({ url: 'https://www.paype.co.in/#about' }), visible: true }
      ]
    }
  ]

  const logout = async () => {
    try {
      const body = { token: (await Auth.currentSession()).getAccessToken().getJwtToken() }
      setLogout({ body })
    } catch (err) {
      setLogout({ body: {} })
    }
  }

  const logoutAlert = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout ?",
      [
        { text: "Cancel", onPress: () => null, style: 'cancel' },
        {
          text: "Sure", onPress: logout
        },
      ],
      {
        cancelable: false
      }
    )
  };

  return (
    <GradientView style={{ flex: 1 }} x={1} y={0}>
      <MainHeader
        render={[
          {
            type: "Icon", iconType: "Entypo", iconName: "chevron-left",
            onPress: () => NavServiceUtils.goBack()
          },
          { type: "Title", title: t("My Profile") },
          {
            type: "Icon", iconType: "Ionicons", iconName: "ios-power", iconSize: ms(24),
            onPress: logoutAlert
          },
        ]}
      />
      {isLoading ? <Loader /> :
        <ScrollView contentContainerStyle={{ paddingBottom: hs(100) }}>
          <MyAccountCard />
          <FlatList
            data={list}
            bottomSpace={true}
            renderItem={({ item, index }) => {
              return (
                item.visible &&
                <TitleWithList
                  item={item}
                  index={index}
                  listContainer={{ width: '95%', alignSelf: 'center', borderRadius: 8, marginVertical: hs(8) }}
                />
              )
            }}
          />
          <Button style={{ marginTop: 40 }}
            onPress={logoutAlert}
            label={'Logout'}
            isLoading={isLogOutLoading}
          />
        </ScrollView>
      }
    </GradientView>
  );
};