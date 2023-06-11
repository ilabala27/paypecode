import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    Switch as NativeSwitch,
    SwitchProps,
    View,
    Animated,
    ViewStyle,
} from 'react-native'

import { Icon } from '@views/components/functional/Icon';
import { hs, ms, wp, ws } from '@utilis/designs/measurements.design';
import { useSlideAnimation } from '@utilis/hooks/animations/slide.animation';
import colors from '@config/colors.config';
import fonts from '@config/fonts.config';
import design from '@config/design.config';

interface ISwitch {
    label?: string;
    star?: boolean;
    iconType?: string;
    iconName?: string;
    error?: string
    isEditable?: boolean;

    // styles
    container?: ViewStyle;
    textInput?: ViewStyle;
    stopAnimation?: boolean
}

export const Switch = ({ iconType, iconName, label, star, error, value, container, stopAnimation, isEditable=true, ...rest }: SwitchProps & ISwitch) => {
    const position = !stopAnimation ? useSlideAnimation() : {}
    const labelColor = value ? colors.P_TEXT_COLOR : colors.S_TEXT_COLOR
    return (
        <Animated.View style={[styles.container, position, container,]}>
            {label ?
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        {iconType && iconName && (
                            <Icon type={iconType} name={iconName} size={ms(12)} color={labelColor} style={{ marginRight: ws(6) }} />
                        )}
                        <Text style={[styles.labelText, { color: labelColor }]}>{label}</Text>
                        {star && (
                            <Icon type={"AntDesign"} name={"star"} size={ms(6)} color={colors.RED} style={{ marginLeft: ws(2) }} />
                        )}
                    </View>
                    <NativeSwitch value={value} onValueChange={rest.onValueChange} disabled={!isEditable} {...rest}/>
                </View>
                : null}
            {error ?
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                    {iconType && iconName && (
                        <Icon type={"FontAwesome"} name={"warning"} size={ms(10)} color={colors.RED} style={{ marginRight: ws(6) }} />
                    )}
                    <Text style={[design.GENERIC_ERROR_TEXT, { textAlign: 'right' }]}>{error}</Text>
                </View>
                : null}
        </Animated.View>

    )
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: colors.P_BG,
        borderRadius: 6,
        marginVertical: hs(4),
        overflow: 'hidden',
        paddingVertical: hs(8),
        paddingHorizontal: ws(10),
    },
    labelText: {
        fontSize: ms(12),
        fontFamily: fonts.SemiBold,
        color: colors.S_TEXT_COLOR,
    }
})