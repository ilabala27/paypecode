import React from 'react';
import { ActivityIndicator, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle, } from 'react-native';

import { hs, ms, wp, ws } from '@utilis/designs/measurements.design';
import colors from '@config/colors.config';
import design from '@config/design.config';
import fonts from '@config/fonts.config';
import { Icon } from './Icon';


interface IIconButton {
    isLoading?: boolean;
    onPress?: ((props: any) => void) | undefined;
    disabled?: boolean;
    iconType?: string;
    iconName?: string;
    container?: StyleProp<ViewStyle>
    iconProps?: any
}

export const IconButton = ({ isLoading, iconType, iconName, onPress, disabled, container, iconProps }: IIconButton) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            activeOpacity={design.OPACITY_AVG}
            style={[styles.container, container]}
        >
            {isLoading ?
                <ActivityIndicator color={colors.P_BG} size={ms(20)} />
            : iconType && iconName? 
                <Icon type={iconType} name={iconName} size={ms(20)} color={colors.WHITE1} {...iconProps}/>
            : null
            }
        </TouchableOpacity>
    );
}

interface ICheckIconButton {
    active: boolean;
    onPress?: ((props: any) => void) | undefined;
    disabled?: boolean;
}

export const CheckIconButton = ({ active, onPress, disabled }: ICheckIconButton) => {
    return (
        <IconButton
            iconType={'Octicons'}
            iconName={active? 'check-circle-fill' : 'check-circle'}
            onPress={onPress}
            disabled={disabled}
            container={{ backgroundColor: colors.TRANS, }}
            iconProps={{ size: ms(16), color: active? colors.P_COLOR_DARK : colors.T_TEXT }}
        />
    )
}


const styles = StyleSheet.create({
    container: {
        height: hs(45),
        width: hs(45),
        backgroundColor: colors.P_COLOR,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center'
    },
})