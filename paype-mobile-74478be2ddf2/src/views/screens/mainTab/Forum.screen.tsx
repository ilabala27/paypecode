import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { INavigationProps } from '@utilis/interfaces/navigation.interface';
import design from '@config/design.config';
import { ComingSoon } from '@views/components/functional/ComingSoon';
import { MainHeader } from '@views/components/functional/MainHeader';
import NavServiceUtils from '@controllers/utils/NavService.utils';
import { NavKeys } from '@controllers/utils/NavKeys.utils';
import { forumTransportor } from '@models/redux/forum/forum.transportor';
import { Loader } from '@views/components/functional/Loader';
import { FlatList } from '@views/components/functional/Flatlist';
import { hp, hs, ms, wp, ws } from '@utilis/designs/measurements.design';
import colors from '@config/colors.config';
import { Slider } from '@views/components/functional/Slider';
import fontsConfig from '@config/fonts.config';
import { Icon } from '@views/components/functional/Icon';
import appConfig from '@config/app.config';
import { Images } from '@assets/images/png';
import moment from 'moment';


export default ({ route, navigation }: INavigationProps) => {
  const { forumStore, initForum } = forumTransportor()
  const { isLoading, storyBoard } = forumStore()

  useEffect(() => {
    initForum()
  }, [])


  const renderIconButton = ({ iconName, iconType, onPress }: any) => {
    return (
      <TouchableOpacity onPress={onPress} style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 100, paddingRight: ws(16) }}>
        <Icon type={iconType} name={iconName} color={colors.S_TEXT} size={ms(25)} />
      </TouchableOpacity>
    )
  }

  const renderItem = ({ item, index }: any) => {
    return (
      <View style={styles.card} key={index}>
        <View style={styles.row}>
          <View style={styles.userProfileImage}>
            <Image
              source={item?.stor_user_image ? { uri: appConfig.apiConnections.s3 + '/' + item?.stor_user_image } : Images.ImageProfileHolder}
              style={design.GENERIC_IMAGE}
            />
          </View>
          <View>
            <Text style={styles.W_11_S}>{item.stor_user_name}</Text>
            <Text style={styles.W_11_S}>{item.stor_one_line}</Text>
          </View>
        </View>
        {item?.stor_images?.length > 0 ?
          <Slider
            data={item.stor_images}
            fHeight={hs(350)}
            fWidth={wp('100%')}
            renderItem={({ item, index }) => {
              return (
                <View style={{ width: wp('100%'), height: hs(350), backgroundColor: colors.S_BG }} key={index}>
                  <Image source={{ uri: item }} style={design.GENERIC_IMAGE} />
                </View>
              )
            }}
          />
          : null}
        <View style={styles.row}>
          {/* {renderIconButton({ iconType: 'Ionicons', iconName: 'ios-heart-outline', })}
          {renderIconButton({ iconType: 'Feather', iconName: 'send', })} */}
        </View>
        <View style={{ marginHorizontal: ws(16) }}>
          <Text style={styles.W_12_S}>{moment(item.created_at).format('DD-MM-YYYY HH:mm')}</Text>
          <Text style={styles.W_11_S}>{item.stor_short_description}</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={design.GENERIC_SCREEN_P}>
      <MainHeader
        BGcolors={[colors.WHITE1, colors.WHITE1]}
        render={[
          { type: "Title", title: "PAYPE FORUM" },
          { type: "Title" },
          { type: "ProfilePicture", onPress: () => NavServiceUtils.navigate(NavKeys.MY_PROFILE) },
        ]}
      />
      {isLoading ? <Loader /> :
        <FlatList
          data={storyBoard.data}
          contentContainerStyle={{ paddingBottom: hs(100) }}
          renderItem={renderItem}
          onRefresh={() => initForum()}
          refreshing={false}
        />
      }
    </View>
  );
};


const styles = StyleSheet.create({
  card: {
    maxHeight: hs(500),
    width: '100%',
    backgroundColor: colors.P_BG,
    marginVertical: hs(16)
  },
  userProfileImage: {
    height: hs(35),
    width: hs(35),
    borderRadius: 100,
    overflow: 'hidden',
    marginRight: ws(8),
    backgroundColor: colors.S_BG
  },
  W_12_P: {
    fontSize: ms(12),
    fontFamily: fontsConfig.Bold,
    color: colors.P_TEXT,
  },
  W_12_S: {
    fontSize: ms(12),
    fontFamily: fontsConfig.Regular,
    color: colors.S_TEXT,
  },
  W_11_S: {
    fontSize: ms(11),
    fontFamily: fontsConfig.Regular,
    color: colors.S_TEXT,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hs(16),
    marginBottom: hs(8),
    marginHorizontal: ws(16)
  }
})