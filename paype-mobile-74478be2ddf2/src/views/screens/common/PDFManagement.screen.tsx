import React from 'react';
import { View } from 'react-native';
import { INavigationProps2 } from '@utilis/interfaces/navigation.interface';
import design from '@config/design.config';
import { ComingSoon } from '@views/components/functional/ComingSoon';
import { MainHeader } from '@views/components/functional/MainHeader';
import NavServiceUtils from '@controllers/utils/NavService.utils';
import { HTMLToPDF } from '@views/components/functional/HTMLToPDF';
import { GradientBGLoader } from '@views/components/functional/GradientBGLoader';
import { systemTransportor } from '@models/redux/system/system.transportor';


export default ({ route, navigation }: INavigationProps2) => {
  const { title } = route.params
  const { systemStore, setLogout } = systemTransportor()
  const { user } = systemStore()
  const url = `/business/partner-license/${user?.user?._id}`

  return (
    <View style={design.GENERIC_SCREEN_S}>
      <MainHeader
        render={[
          {
            type: "Icon", iconType: "Entypo", iconName: "chevron-left",
            onPress: () => NavServiceUtils.goBack()
          },
          { type: "Title", title: title ?? "PAYPE" },
          { type: "Icon" }
        ]}
      />
      {user?.user?._id ? <HTMLToPDF url={url} /> : null}
      <GradientBGLoader />
    </View>
  );
};
