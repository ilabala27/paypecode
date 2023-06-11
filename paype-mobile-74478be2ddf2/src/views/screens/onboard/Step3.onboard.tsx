import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { t } from 'i18next';

import NavigationServiceUtils from '@controllers/utils/NavService.utils';
import { NavKeys } from '@controllers/utils/NavKeys.utils';
import colors from '@config/colors.config';
import design from '@config/design.config';
import { hs, ws } from '@utilis/designs/measurements.design';
import { INavigationProps } from '@utilis/interfaces/navigation.interface';
import { setItem } from '@models/async/curd.async';
import AsyncKeys from '@models/async/keys.async';
import { Images } from '@assets/images/png';


export default ({ route, navigation }: INavigationProps) => {

    const getStarted = async () => {
        await setItem(AsyncKeys.onboarded, true)
        NavigationServiceUtils.navigate(NavKeys.AUTH_WELCOME)
    }

    return (
        <View style={design.GENERIC_SCREEN_P}>
            <View style={design.GENERIC_SCREEN_S}>
                <Image
                    source={Images.onBoardSlider3}
                    style={design.GENERIC_IMAGE}
                />
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.titleContainer}>
                    <Text style={design.GENERIC_TEXT_TITLE_P}>{t('onBoard.step3.title_prefix')}</Text>
                    <Text style={design.GENERIC_TEXT_TITLE_P}>{t('onBoard.step3.title_suffix')}</Text>
                </View>
                <View style={styles.contentconatiner}>
                    <Text numberOfLines={3} style={design.GENERIC_TEXT_CONTENT_S}>{t('onBoard.step3.content')}</Text>
                </View>
                <View style={styles.footerContainer}>
                    <View style={styles.dotConatiner}>
                        <View style={[styles.dot, { backgroundColor: colors.P_TEXT_COLOR, }]} />
                        <View style={[styles.dot, { backgroundColor: colors.P_TEXT_COLOR, }]} />
                        <View style={[styles.dot, { backgroundColor: colors.P_TEXT_COLOR, }]} />
                    </View>
                    <TouchableOpacity
                        onPress={getStarted}
                        style={styles.buttonconatiner}
                    >
                        <Text style={[design.GENERIC_TEXT_TITLE_P, { color: colors.WHITE1 }]}>{t('onBoard.step3.getStarted')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    bottomContainer: {
        height: hs(220),
        width: '100%',
    },
    titleContainer: {
        ...design.GENERIC_PADDING_VERTICAL_AVG,
        ...design.GENERIC_PADDING_HORIZONTAL_AVG,
    },
    contentconatiner: {
        width: "80%",
        ...design.GENERIC_PADDING_HORIZONTAL_AVG,
    },
    footerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        ...design.GENERIC_PADDING_HORIZONTAL_AVG,
        ...design.GENERIC_MARGIN_VERTICAL_AVG,
    },
    dotConatiner: {
        width: hs(50),
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    dot: {
        height: hs(10),
        width: hs(10),
        borderRadius: 100,
        backgroundColor: colors.S_BG,
        borderWidth: 0.25,
        borderColor: colors.S_TEXT
    },
    buttonconatiner: {
        height: ws(35),
        width: ws(120),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: colors.P_TEXT_COLOR
    }
});