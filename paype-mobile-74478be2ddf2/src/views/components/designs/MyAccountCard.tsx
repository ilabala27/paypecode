import React from 'react';
import { Text, View, StyleSheet, Image, StyleProp, ViewStyle } from 'react-native';
import design from '@config/design.config';
import { hs, ms, ws } from '@utilis/designs/measurements.design';
import { Images } from '@assets/images/png';
import colors from '@config/colors.config';
import { systemTransportor } from '@models/redux/system/system.transportor';
import fontsConfig from '@config/fonts.config';
import { Icon } from '../functional/Icon';
import appConfig from '@config/app.config';


interface IMyAccountCard {
    listContainer?: StyleProp<ViewStyle>;
}

export const MyAccountCard = ({ listContainer }: IMyAccountCard) => {
    const { systemStore } = systemTransportor()
    const { user } = systemStore() ?? {}
    const { user_name, user_mobile_no, user_email, user_image, is_active, ...rest } = user?.user ?? {}

    return (
        <View style={[styles.listContainer, listContainer]}>
            <View style={styles.imageContainer}>
                <Image
                    source={user_image ? { uri: appConfig.apiConnections.s3 + '/' + user_image } : Images.ImageProfileHolder}
                    style={design.GENERIC_IMAGE}
                />
            </View>
            <View style={styles.contentContainer}>
                <Text numberOfLines={1} style={styles.title}>
                    {user_name}{"  "}
                    <Icon
                        type={'MaterialCommunityIcons'}
                        name={'check-decagram'}
                        size={ms(14)}
                        color={is_active ? colors.GREEN : colors.RED}
                    />
                </Text>
                <Text numberOfLines={2} style={styles.subTitle}>{user_mobile_no}</Text>
                <Text numberOfLines={2} style={styles.subTitle}>{user_email}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        flexDirection: 'row',
        height: hs(100),
        width: '100%',
        paddingVertical: hs(8),
        paddingHorizontal: ws(16),
        backgroundColor: colors.P_BG,
        marginBottom: hs(8),
        borderBottomLeftRadius: ms(24),
        borderBottomRightRadius: ms(24),
        alignItems: 'center',
    },
    imageContainer: {
        height: hs(65),
        width: hs(65),
        borderRadius: 100,
        overflow: 'hidden'
    },
    contentContainer: {
        flex: 1,
        paddingLeft: ws(20),
    },
    title: {
        fontSize: ms(16),
        fontFamily: fontsConfig.Bold,
        color: colors.P_TEXT_COLOR,
    },
    subTitle: {
        fontSize: ms(14),
        fontFamily: fontsConfig.Medium,
        color: colors.S_TEXT_COLOR,
    }
})