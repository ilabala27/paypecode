import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import NavServiceUtils from '@controllers/utils/NavService.utils';
import { MainHeader } from '@views/components/functional/MainHeader';
import { ScrollView } from '@views/components/functional/Scrollview';
import { hs, ms } from '@utilis/designs/measurements.design';
import { INavigationProps } from '@utilis/interfaces/navigation.interface';
import design from '@config/design.config';
import { systemTransportor } from '@models/redux/system/system.transportor';
import { setItem } from '@models/async/curd.async';
import AsyncKeys from '@models/async/keys.async';
import { useTranslation } from 'react-i18next';
import { FlatList } from '@views/components/functional/Flatlist';
import { languages } from '@models/static/adminSlice.static';
import fontsConfig from '@config/fonts.config';
import colors from '@config/colors.config';
export default ({ route, navigation }: INavigationProps) => {
    const { t, i18n } = useTranslation();
    const { setSystemStore } = systemTransportor()

    // # Change language
    const changeLanguage = async (item: any) => {
        const lang = item?.code?.toLowerCase()
        setSystemStore({ lang })
        await setItem(AsyncKeys.lang, lang)
        await i18n.changeLanguage(lang)
        NavServiceUtils.goBack()
    }

    return (
        <View style={design.GENERIC_SCREEN_P}>
            <MainHeader
                render={[
                    { type: "Icon", iconType: "Entypo", iconName: "chevron-left", onPress: () => NavServiceUtils.goBack() },
                    { type: "Title", title: "MY LANGUAGE" },
                    { type: "Icon", iconType: "AntDesign", iconName: "question" }
                ]}
            />
            <View style={styles.mainContainer}>
                <FlatList
                    data={languages}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity onPress={() => changeLanguage(item)} style={styles.langContainer} activeOpacity={0.95} key={index}>
                                <Text style={styles.langText}>{item.name}</Text>
                            </TouchableOpacity>

                        )
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        height: hs(500),
        width: '100%',
        marginTop: hs(10),

    },
    langContainer: {
        height: hs(30),
        width: '95%',
        alignSelf: 'center'
    },
    langText: {
        fontSize: ms(12.5),
        fontFamily: fontsConfig.Bold,
        color: colors.P_TEXT,
    },
});