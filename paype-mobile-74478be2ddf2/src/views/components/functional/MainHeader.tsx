import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Platform, StyleProp, ViewStyle, Image, } from 'react-native';

import { Icon } from '@views/components/functional/Icon';
import { hs, ws } from '@utilis/designs/measurements.design';
import design from '@config/design.config';
import colors from '@config/colors.config';
import LinearGradient from 'react-native-linear-gradient';
import { Images } from '@assets/images/png';
import { systemTransportor } from '@models/redux/system/system.transportor';
import appConfig from '@config/app.config';


interface IRenderIcon {
    type: string;
    iconName: string;
    iconType: string;
    iconSize?: number;
    onPress?: ((args: any) => void) | undefined;
    index: number;
}

interface IRenderTitle {
    type: string;
    title: string;
    index: number;
}

export interface IHeader {
    BGcolors?: string[];
    render: {
        type: string;
        title?: string;
        iconName?: string;
        iconType?: string;
        iconSize?: number;
        onPress?: ((args: any) => void) | undefined
    }[]
    container?: StyleProp<ViewStyle>;
}

export const MainHeader = ({ render, BGcolors, container }: IHeader) => {

    const renderProfiePicture = ({ onPress, index }: IRenderIcon) => {
        const { systemStore } = systemTransportor()
        const { user } = systemStore() ?? {}
        const { user_name, user_mobile_no, user_image } = user?.user ?? {}

        return (
            <TouchableOpacity onPress={onPress} style={styles.iconContainer} activeOpacity={design.OPACITY_AVG} key={index} >
                <View style={styles.imageContainer}>
                    <Image
                        source={user_image ? { uri: appConfig.apiConnections.s3 + '/' + user_image } : Images.ImageProfileHolder}
                        style={design.GENERIC_IMAGE}
                    />
                </View>
            </TouchableOpacity >
        )
    }

    const renderIcon = ({ iconName, iconType, iconSize, onPress, index }: IRenderIcon) => {
        return (
            <TouchableOpacity onPress={onPress} style={styles.iconContainer} activeOpacity={design.OPACITY_AVG} key={index}>
                {iconType && iconName && (
                    <Icon type={iconType} name={iconName} size={iconSize ?? 24} color={colors.P_TEXT_COLOR} />
                )}
            </TouchableOpacity>
        )
    }

    const renderTitle = ({ title, index }: IRenderTitle) => {
        return (
            <Text style={[design.GENERIC_TEXT_HEADER_P, styles.titleText]} key={index}>{title}</Text>
        )
    }

    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={BGcolors ?? [colors.P_COLOR, colors.S_COLOR]} style={[styles.container, container]}>
            {render?.map((item: any, index: any) => {
                switch (item.type) {
                    case "ProfilePicture":
                        return renderProfiePicture({ ...item, index })
                    case "Icon":
                        return renderIcon({ ...item, index })
                    case "Title":
                        return renderTitle({ ...item, index })
                    default:
                        return null
                }
            })}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: "100%",
        height: hs(80),
        backgroundColor: colors.P_COLOR,
        paddingTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight,
        alignItems: 'center',

        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 3,
    },
    iconContainer: {
        height: "100%",
        width: ws(50),
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageContainer: {
        height: ws(30),
        width: ws(30),
        borderRadius: 100,
        overflow: 'hidden',
    },
    titleText: {
        flex: 1,
        textAlign: 'center',
        color: colors.P_TEXT_COLOR
    }
})