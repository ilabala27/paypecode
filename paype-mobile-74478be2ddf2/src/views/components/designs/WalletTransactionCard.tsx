import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import design from '@config/design.config';
import { hs, ms, ws } from '@utilis/designs/measurements.design';
import colors from '@config/colors.config';
import fontsConfig from '@config/fonts.config';
import { Icon } from '../functional/Icon';
import moment from 'moment';
import { currencyInr } from '@utilis/methods/string.method';


interface IWalletTransactionCard {
    item: any,
    index: string;
    onPress?: ((args: any) => void) | undefined;
    bg?: string;
    color?: string;
}

export const WalletTransactionCard = ({ item, index, onPress }: IWalletTransactionCard) => {
    const isCredit = item?.cwtr_type == "CR"
    return (
        <TouchableOpacity
            onPress={() => onPress && onPress({ item, index })}
            disabled={!onPress}
            style={styles.shadow}
            activeOpacity={design.OPACITY_AVG}
            key={index}
        >
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <View style={styles.content1}>
                        <Text numberOfLines={1} style={styles.title}>{item?.cwtr_short_description}</Text>
                        <Text numberOfLines={3} style={styles.subTitle}>{item?.cwtr_description}</Text>
                    </View>
                    <View style={styles.content2}>
                        <Text style={isCredit ? styles.amountGreen : styles.amountRed}>
                            {isCredit ? " + " : " - "}
                            <Icon type={"FontAwesome"} name={"inr"} size={ms(14)} />
                            {" "}
                            {currencyInr(parseFloat(item?.cwtr_transaction_amount).toFixed(2))}
                        </Text>
                    </View>
                </View>
                <View style={[styles.content1, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
                    <Text numberOfLines={1} style={styles.triTitle}>{moment(item?.cwtr_created_at).format('DD-MM-YYYY HH:mm:ss')}</Text>
                    <Text numberOfLines={1} style={styles.triTitle}>Bal. Credit: {currencyInr(parseFloat(item?.cwtr_after_credit).toFixed(2))}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    shadow: {
        borderRadius: 16,
        backgroundColor: colors.SHADOW_WHITE,
        paddingLeft: ws(4),
        paddingBottom: ws(4),
        marginBottom: hs(16),
    },
    container: {
        minHeight: hs(70),
        width: ws(336),
        borderRadius: 16,
        backgroundColor: colors.P_BG,
        paddingVertical: hs(8),
        paddingHorizontal: ws(16),
        justifyContent: 'center'
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    content1: {
        flex: 1
    },
    content2: {
        paddingHorizontal: ws(8)
    },
    amountGreen: {
        fontSize: ms(14),
        fontFamily: fontsConfig.Bold,
        color: colors.GREEN,
    },
    amountRed: {
        fontSize: ms(14),
        fontFamily: fontsConfig.Bold,
        color: colors.RED,
    },
    title: {
        fontSize: ms(13),
        fontFamily: fontsConfig.Bold,
        color: colors.P_TEXT_COLOR,
    },
    subTitle: {
        fontSize: ms(11),
        fontFamily: fontsConfig.Medium,
        color: colors.S_TEXT_COLOR,
    },
    triTitle: {
        fontSize: ms(10),
        fontFamily: fontsConfig.Regular,
        color: colors.T_TEXT_COLOR,
    }
})