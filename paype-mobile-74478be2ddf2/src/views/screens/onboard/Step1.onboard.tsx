import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { t } from 'i18next';

import NavigationServiceUtils from '@controllers/utils/NavService.utils';
import { NavKeys } from '@controllers/utils/NavKeys.utils';
import colors from '@config/colors.config';
import design from '@config/design.config';
import { hs, ws } from '@utilis/designs/measurements.design';
import { INavigationProps } from '@utilis/interfaces/navigation.interface';
import { Images } from '@assets/images/png';


export default ({ route, navigation }: INavigationProps) => {
    return (
        <View style={design.GENERIC_SCREEN_P}>
            <View style={design.GENERIC_SCREEN_S}>
                <Image
                    source={Images.onBoardSlider1}
                    style={design.GENERIC_IMAGE}
                />
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.titleContainer}>
                    <Text style={design.GENERIC_TEXT_TITLE_P}>{t('onBoard.step1.title_prefix')}</Text>
                    <Text style={design.GENERIC_TEXT_TITLE_P}>{t('onBoard.step1.title_suffix')}</Text>
                </View>
                <View style={styles.contentconatiner}>
                    <Text numberOfLines={3} style={design.GENERIC_TEXT_CONTENT_S}>{t('onBoard.step1.content')}</Text>
                </View>
                <View style={styles.footerContainer}>
                    <View style={styles.dotConatiner}>
                        <View style={[styles.dot, { backgroundColor: colors.P_TEXT_COLOR, }]} />
                        <View style={styles.dot} />
                        <View style={styles.dot} />
                    </View>
                    <TouchableOpacity
                        onPress={() => NavigationServiceUtils.navigate(NavKeys.ONBOARD_STEP2)}
                        style={styles.imageconatiner}
                    >
                        <Image
                            source={Images.more}
                            style={design.GENERIC_IMAGE}
                        />
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
        ...design.GENERIC_MARGIN_VERTICAL_MED,
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
    imageconatiner: {
        height: ws(50),
        width: ws(50),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        overflow: 'hidden',
    }
});