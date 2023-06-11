import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { INavigationProps } from '@utilis/interfaces/navigation.interface';
import design from '@config/design.config';
import { ComingSoon } from '@views/components/functional/ComingSoon';
import { MainHeader } from '@views/components/functional/MainHeader';
import NavServiceUtils from '@controllers/utils/NavService.utils';
import { NavKeys } from '@controllers/utils/NavKeys.utils';
import { servicesTransportor } from '@models/redux/services/services.transportor';
import { systemTransportor } from '@models/redux/system/system.transportor';
import { Slider } from '@views/components/functional/Slider';
import { hp, hs, ms, wp, ws } from '@utilis/designs/measurements.design';
import colors from '@config/colors.config';
import { HomeBanner } from '@views/components/designs/HomeBanner';
import { Images } from '@assets/images/png';
import { FlatList } from '@views/components/functional/Flatlist';
import appConfig from '@config/app.config';
import { DASHBOARD_MENU_LIST } from '@models/static/dashboard.static';
import { ScrollView } from '@views/components/functional/Scrollview';
import fontsConfig from '@config/fonts.config';
import { Icon } from '@views/components/functional/Icon';


export default ({ route, navigation }: INavigationProps) => {
  const { setOnboardingLimit } = servicesTransportor()
  const { systemStore, setSnack } = systemTransportor()
  const { user, servies } = systemStore()
  const [menuList] = useState(DASHBOARD_MENU_LIST)

  useEffect(() => {
    const body = {
      "is_active": true,
      "onqu_user_id": user?.user?.user_id
    }
    setOnboardingLimit({ body })
  }, [])

  const welcomeBanner = [
    `${appConfig.apiConnections.s3}/%40system-resources/slide1.png`,
    `${appConfig.apiConnections.s3}/%40system-resources/slide2.png`,
    `${appConfig.apiConnections.s3}/%40system-resources/slide4.png`,
    `${appConfig.apiConnections.s3}/%40system-resources/slide3.png`,
  ]

  return (
    <ScrollView style={design.GENERIC_SCREEN_P} contentContainerStyle={{ paddingBottom: hs(150) }}>
      <Slider
        data={welcomeBanner}
        fHeight={hp('65%')}
        fWidth={wp('100%')}
        renderItem={({ item, index }) => {
          return (
            <View style={{ width: wp('100%'), height: hp('65%'), backgroundColor: colors.S_BG, borderWidth: 0.5 }} key={index}>
              <Image source={{ uri: item }} style={design.GENERIC_IMAGE} />
            </View>
          )
        }}
      />

      <HomeBanner
        source={{ uri: `${appConfig.apiConnections.s3}/%40system-resources/dashboard-banner1.jpg` }}
        container={{ marginTop: hs(16), marginBottom: hs(16), backgroundColor: colors.S_BG }}
      />
      <FlatList
        data={menuList}
        numColumns={3}
        bounces={false}
        columnWrapperStyle={{ justifyContent: 'space-evenly' }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={item.onPress}
              key={index}
              style={styles.container}
              activeOpacity={design.OPACITY_HIGH} >
              <View style={styles.textContainer}>
                <Text numberOfLines={2} style={styles.label}>{item.name}</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Icon type={item?.iconType} name={item?.iconName} size={30} color={colors.P_TEXT_COLOR} />
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hs(112),
    width: ws(96),
    borderRadius: ms(6),
    overflow: 'hidden',
    backgroundColor: colors.P_COLOR,
    marginBottom: hs(12),
    padding: hs(4)
  },
  textContainer: {
    height: hs(40),
    width: '100%',
    backgroundColor: colors.P_COLOR_DARK,
    paddingHorizontal: ws(8),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ms(4)
  },
  label: {
    fontSize: ms(12),
    fontFamily: fontsConfig.Bold,
    fontWeight: '500',
    color: colors.WHITE1,
    textAlign: 'center'
  },
})