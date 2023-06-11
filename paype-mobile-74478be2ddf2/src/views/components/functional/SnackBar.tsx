import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, } from 'react-native';

import { systemTransportor } from '@models/redux/system/system.transportor';
import { hs, ms, ws } from '@utilis/designs/measurements.design';
import colors from '@config/colors.config';
import design from '@config/design.config';
import fonts from '@config/fonts.config';


interface ISnackBar {
    successTimeout?: number;
    failureTimeout?: number;
}

export const SnackBar = ({ successTimeout, failureTimeout }: ISnackBar) => {
    const { systemStore, resetSnack } = systemTransportor()
    const { snack } = systemStore()
    const { message, type, timeout } = snack
    const timer = useRef<any>(0)

    useEffect(() => {
        if (message) {
            clearTimeout(timer.current)
            timer.current = setTimeout(() => {
                resetSnack()
            }, timeout ?? localTimeout)
        }
    }, [message])

    const selectColor = () => {
        switch (type) {
            case 'SUCCESS':
                return { backgroundColor: colors.GREEN, color: colors.WHITE1, localTimeout: successTimeout }
            case 'ERROR':
                return { backgroundColor: colors.RED, color: colors.WHITE1, localTimeout: failureTimeout }
            case 'DOUBTFUL':
                return { backgroundColor: colors.ORANGE, color: colors.S_TEXT_COLOR, localTimeout: failureTimeout }
            default: return { backgroundColor: colors.RED, color: colors.WHITE1, localTimeout: failureTimeout }
        }
    }
    const { backgroundColor, color, localTimeout } = selectColor()

    if (!message) return null
    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Text style={[styles.label, { color }]}>{message}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: '2.5%',
        bottom: '8%',
        width: "95%",
        backgroundColor: 'rgba(135,135,135,0.9)',
        alignItems: "center",
        justifyContent: "center",
        ...design.GENERIC_PADDING_VERTICAL_LOW,
        ...design.GENERIC_PADDING_HORIZONTAL_MED,
        borderRadius: 5,
    },
    label: {
        fontSize: ms(14.5),
        fontWeight: 'bold',
        fontFamily: fonts.ExtraBold,
        color: colors.P_BG
    }
})