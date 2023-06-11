import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps, StyleProp, View, ViewStyle, } from 'react-native';

import colors from '@config/colors.config';
import design from '@config/design.config';


interface ILoader {
  container?: StyleProp<ViewStyle>;
}

export const Loader = ({ container, ...rest }: ILoader & ActivityIndicatorProps) => {
  return (
    <View style={[design.GENERIC_SCREEN_P, design.GENERAIC_CENTER, container]}>
      <ActivityIndicator
        color={colors.P_COLOR_DARK}
        size={'large'}
        {...rest}
      />
    </View>
  );
};
