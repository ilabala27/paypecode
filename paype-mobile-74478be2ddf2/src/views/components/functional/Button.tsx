import React from 'react';
import { ActivityIndicator, StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle, } from 'react-native';

import { hs, ms, ws } from '@utilis/designs/measurements.design';
import colors from '@config/colors.config';
import design from '@config/design.config';
import fonts from '@config/fonts.config';


interface IButton {
    isLoading?: boolean;
    label: string;
    onPress?: ((props: any) => void) | undefined;
    color?: string;
    style?: StyleProp<ViewStyle>;
    isEditable?: boolean;
}

export const Button = ({ isLoading, label, color, onPress, style, isEditable=true }: IButton) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={design.OPACITY_AVG}
            style={[styles.container, { backgroundColor: !isEditable? 'grey' : color ?? colors.P_COLOR_DARK }, style]}
            disabled={!isEditable || !onPress}
        >
            {isLoading ?
                <ActivityIndicator color={colors.P_BG} size={ms(14.5)} />
                :
                <Text style={styles.label}>{label}</Text>
            }
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    container: {
        height: hs(40),
        width: "80%",
        borderRadius: 20,
        alignSelf: 'center',
        alignItems: "center",
        justifyContent: "center"
    },
    label: {
        fontSize: ms(14.5),
        fontWeight: 'bold',
        fontFamily: fonts.ExtraBold,
        color: colors.P_BG
    }
})