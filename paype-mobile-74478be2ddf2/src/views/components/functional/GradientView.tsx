import React, { memo, useEffect, useState } from 'react';
import { Platform, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { BlurView as NativeBlurView, BlurViewProperties } from '@react-native-community/blur';
import { NavigationContainerProps, NavigationProp } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import _colors from '@config/colors.config';

interface IGradientView {
    style?: StyleProp<ViewStyle>
    colors?: string[];
    x?: number;
    y?: number;
}

export const GradientView: React.FC<IGradientView> = memo(({ style, colors, x = 0, y = 1, ...rest }) => {
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: x, y: y }}
            colors={colors ?? [_colors.P_COLOR, _colors.S_COLOR]}
            style={[styles.container, style]} {...rest} />
    )
});


const styles = StyleSheet.create({
    container: {
        
    },
})