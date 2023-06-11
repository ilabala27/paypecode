import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput as NativeTextInput,
    TextInputProps,
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

interface ITextInput {
    label?: string;
    star?: boolean;
    iconType?: string;
    iconName?: string;
    error?: string
    isEditable?: boolean;
    showEye?: boolean;
    
    info?: string
    infoIconType?: string;
    infoIconName?: string;

    // styles
    container?: ViewStyle;
    textInput?: ViewStyle;
    stopAnimation?: boolean;
}

export const TextInput = ({ 
    iconType, iconName, label, star, error, value, secureTextEntry, showEye=true, onChangeText, 
    container, textInput, stopAnimation, isEditable=true, info, infoIconType, infoIconName, ...rest 
}: TextInputProps & ITextInput) => {
    const [isFieldVisible, setIsFieldVisible] = useState(false)
    const position = !stopAnimation ? useSlideAnimation() : {}
    const labelColor = value ? colors.P_TEXT_COLOR : colors.S_TEXT_COLOR
    return (
        <Animated.View style={[styles.container, position, container,]}>
            {label ?
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {iconType && iconName && (
                        <Icon type={iconType} name={iconName} size={ms(12)} color={labelColor} style={{ marginRight: ws(6) }} />
                    )}
                    <Text style={[styles.labelText, { color: labelColor }]}>{label}</Text>
                    {star && (
                        <Icon type={"AntDesign"} name={"star"} size={ms(6)} color={colors.RED} style={{ marginLeft: ws(2) }} />
                    )}
                </View>
                : null}
            <View style={{ justifyContent: 'center' }}>
                <NativeTextInput
                    placeholderTextColor={colors.T_TEXT}
                    value={value}
                    onChangeText={onChangeText}
                    style={[styles.textInput, textInput]}
                    secureTextEntry={secureTextEntry ? !isFieldVisible : false}
                    editable={isEditable}
                    {...rest}
                />
                {secureTextEntry && showEye && (
                    <Icon
                        onPress={() => setIsFieldVisible(!isFieldVisible)}
                        type={"Ionicons"}
                        name={!isFieldVisible ? "ios-eye" : "ios-eye-off"}
                        size={ms(22)} color={colors.S_TEXT_COLOR}
                        style={{ position: 'absolute', right: ws(10), }}
                    />
                )}
            </View>
            {info ?
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                    {infoIconType && infoIconName && (
                        <Icon type={infoIconType} name={infoIconName} size={ms(10)} color={colors.T_TEXT} style={{ marginRight: ws(6) }} />
                    )}
                    <Text style={[design.GENERIC_INFO_TEXT, { textAlign: 'right' }]}>{info}</Text>
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
    textInput: {
        fontSize: ms(13),
        fontFamily: fonts.Medium,
        color: colors.S_TEXT_COLOR,
        height: hs(45),
        width: "100%",
        paddingVertical: 0,
        paddingHorizontal: ws(10),
        borderRadius: 6,
        backgroundColor: "#f1f1f1",
        marginVertical: hs(8),
    },
    labelText: {
        fontSize: ms(12),
        fontFamily: fonts.SemiBold,
        color: colors.S_TEXT_COLOR,
    }
})