import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import design from '@config/design.config';
import { hs, ms, ws } from '@utilis/designs/measurements.design';
import colors from '@config/colors.config';
import fontsConfig from '@config/fonts.config';


interface IBankCard {
    item: any,
    index: string;
    onPress?: ((args: any) => void) | undefined;
    bg?: string;
    color?: string;
}

export const BankCard = ({ item, index, onPress, bg, color }: IBankCard) => {
    return (
        <TouchableOpacity
            onPress={() => onPress && onPress({ item, index })}
            style={[styles.bankCardConatiner, { backgroundColor: bg }]}
            activeOpacity={design.OPACITY_AVG}
            key={index}
        >
            <Text style={[styles.title, { color }]}>{item.name}</Text>
            <Text style={[styles.subTitle, { color }]}>{item.accountName} ( {item.accountNo} )</Text>
            <Text style={[styles.subTitle, { color }]}>{item.branch} - {item.ifsc}</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    bankCardConatiner: {
        minHeight: hs(80),
        width: "100%",
        paddingVertical: hs(8),
        paddingHorizontal: ws(16),
        borderRadius: 6,
        marginTop: hs(8),
        backgroundColor: colors.P_COLOR,
        justifyContent: "center"
    },
    title: {
        fontSize: ms(12),
        fontFamily: fontsConfig.Bold,
        color: colors.P_TEXT_COLOR,
    },
    subTitle: {
        fontSize: ms(12),
        fontFamily: fontsConfig.Medium,
        color: colors.P_TEXT_COLOR,
    },
})