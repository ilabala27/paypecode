import React from 'react';
import { Image, StyleProp, StyleSheet, TouchableOpacity, TouchableOpacityProps, ViewStyle, } from 'react-native';
import colors from '@config/colors.config';
import { hs, ms, wp, ws } from '@utilis/designs/measurements.design';
import design from '@config/design.config';

interface IHomeBanner {
    source: any;
    index?: number;
    onPress?: ((props: any) => void) | undefined;
    container?: StyleProp<ViewStyle>;
}

export const HomeBanner = ({ source, index = 0, onPress, container }: IHomeBanner) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            key={index}
            style={[styles.container, container]}
            activeOpacity={design.OPACITY_HIGH}
        >
            <Image source={source} style={design.GENERIC_IMAGE} resizeMode={'stretch'} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        height: hs(104),
        width: wp('96%'),
        alignSelf: 'center',
        backgroundColor: colors.WHITE1,
        borderRadius: ms(10),
        overflow: 'hidden',
    }
})