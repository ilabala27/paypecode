import React from 'react';
import { ActivityIndicator, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle, } from 'react-native';

import { hs, ms, ws } from '@utilis/designs/measurements.design';
import colors from '@config/colors.config';
import design from '@config/design.config';
import fonts from '@config/fonts.config';
import { Icon } from './Icon';


interface IButtonRound {
    isLoading?: boolean;
    label?: string;
    iconType: string;
    iconName: string;
    isEditable?: boolean;
    onPress?: ((props: any) => void) | undefined;
    circleColor?: string;
    iconColor?: string;
    style?: StyleProp<ViewStyle>;
    circleContainer?: StyleProp<ViewStyle>;
}

export const ButtonRound = ({ isLoading, label, iconType, iconName, circleColor, iconColor, onPress, style, circleContainer, isEditable = true }: IButtonRound) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={design.OPACITY_AVG}
            style={[styles.container, style]}
            disabled={!isEditable || !onPress}
        >
            <View style={styles.shadow}>
                <View style={[styles.circleContainer, { backgroundColor: circleColor ?? colors.P_BG }, circleContainer]}>
                    {isLoading ?
                        <ActivityIndicator color={colors.P_BG} size={ms(14.5)} />
                        :
                        <Icon type={iconType} name={iconName} size={24} color={iconColor?? colors.P_TEXT_COLOR} />
                    }
                </View>
            </View>
            {label ? <Text style={styles.label}>{label}</Text> : null}
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    shadow: {
        height: ws(65),
        width: ws(65),
        borderRadius: 100,
        paddingLeft: ws(4),
        paddingTop: ws(1),
        backgroundColor: colors.SHADOW_WHITE
    },
    circleContainer: {
        height: ws(60),
        width: ws(60),
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center"
    },
    label: {
        marginVertical: hs(8),
        fontSize: ms(12),
        fontFamily: fonts.Bold,
        color: colors.S_TEXT_COLOR
    }
})