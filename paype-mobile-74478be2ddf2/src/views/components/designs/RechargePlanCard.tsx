import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

import { Icon } from '@views/components/functional/Icon';
import { hs, ms, ws } from '@utilis/designs/measurements.design';
import design from '@config/design.config';
import colors from '@config/colors.config';
import { t } from 'i18next';
import fontsConfig from '@config/fonts.config';


interface IRechargePlanCard {
    item: any,
    index: string | number;
    onPress?: ((args: any) => void) | undefined;
    numberOfLines?: number | undefined
    iconType?: string;
    iconName?: string;
}

export const RechargePlanCard = ({ item, index, onPress, numberOfLines, iconType, iconName }: IRechargePlanCard) => {
    return (
        <TouchableOpacity
            onPress={() => onPress && onPress({ item, index })}
            style={styles.container}
            activeOpacity={design.OPACITY_AVG}
            key={index}
        >
            <View style={styles.RSContainer}>
                <Icon type={"FontAwesome"} name={"inr"} size={ms(12)} color={colors.P_TEXT} />
                <Text style={[styles.title, { fontSize: ms(14), marginBottom: hs(2.5) }]}> {item.rs}</Text>
            </View>
            <View style={styles.contentConatiner}>
                <Text style={[styles.title, { marginBottom: hs(4) }]}>{t('recharge.Validity')}{item.validity}</Text>
                <Text numberOfLines={numberOfLines} style={styles.subTitle}>{item.desc}</Text>
            </View>
            <View style={{ ...design.GENERIC_PADDING_HORIZONTAL_MED }}>
                {iconType && iconName ?
                    <Icon type={iconType} name={iconName} size={25} color={colors.T_TEXT} />
                    : null}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.P_BG,
        marginVertical: hs(4),
        paddingVertical: hs(8),
        borderRadius: ms(4)
    },
    RSContainer: {
        flexDirection: "row",
        width: ws(80),
        justifyContent: "center",
        alignItems: "center",
    },
    contentConatiner: {
        flex: 1,
        minHeight: hs(68),
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
    },
})