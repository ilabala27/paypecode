import React from 'react';
import { View } from 'react-native';
import { INavigationProps } from '@utilis/interfaces/navigation.interface';
import design from '@config/design.config';
import { ComingSoon } from '@views/components/functional/ComingSoon';
import { MainHeader } from '@views/components/functional/MainHeader';
import NavServiceUtils from '@controllers/utils/NavService.utils';


export default ({ route, navigation }: INavigationProps) => {
  return (
    <View style={design.GENERIC_SCREEN_S}>
      <MainHeader
        render={[
          {
            type: "Icon", iconType: "Entypo", iconName: "chevron-left",
            onPress: () => NavServiceUtils.goBack()
          },
          { type: "Title", title: "PAYPE" },
          { type: "Icon" }
        ]}
      />
      <ComingSoon />
    </View>
  );
};
