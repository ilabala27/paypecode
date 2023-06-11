import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { t } from 'i18next';

import NavigationServiceUtils from '@controllers/utils/NavService.utils';
import { NavKeys } from '@controllers/utils/NavKeys.utils';
import { Button } from '@views/components/functional/Button';
import { hs, ws } from '@utilis/designs/measurements.design';
import { navigateToDailerPad } from '@utilis/methods/common.method';
import { INavigationProps } from '@utilis/interfaces/navigation.interface';
import appConfig from '@config/app.config';
import design from '@config/design.config';
import colors from '@config/colors.config';
import { Images } from '@assets/images/png';


export default ({ route, navigation }: INavigationProps) => {
    return (
        <View style={design.GENERIC_SCREEN_P}>
            <View style={design.GENERIC_SCREEN_S}>
                <Image
                    source={Images.loginBanner}
                    style={design.GENERIC_IMAGE}
                />
            </View>
            <View style={styles.bottomContainer}>
                <Text style={design.GENERIC_TEXT_HEADER_AVG_P}>{t('auth.welcome.title')}</Text>
                <Button
                    label={t('auth.welcome.loginButton')}
                    onPress={() => NavigationServiceUtils.navigate(NavKeys.AUTH_LOGIN)}
                    style={{ ...design.GENERIC_MARGIN_VERTICAL_AVG, borderRadius: 5 }}
                />
                <Text style={design.GENERIC_TEXT_TITLE_S}>
                    {t('auth.welcome.content')}
                    <Text onPress={() => navigateToDailerPad(appConfig.reachUsContact)} style={[design.GENERIC_TEXT_TITLE_S, { color: colors.RED }]}>
                        {"  "}{t('auth.welcome.reachUs')}
                    </Text>
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    bottomContainer: {
        height: hs(220),
        width: '100%',
        ...design.GENERAIC_CENTER
    }
});