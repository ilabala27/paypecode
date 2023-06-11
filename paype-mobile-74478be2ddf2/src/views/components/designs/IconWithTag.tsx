import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { Icon } from '@views/components/functional/Icon';
import design from '@config/design.config';
import { hs, ms, ws } from '@utilis/designs/measurements.design';
import { Images } from '@assets/images/png';
import appConfig from '@config/app.config';
import fontsConfig from '@config/fonts.config';
import colors from '@config/colors.config';



interface IIconWithTag {
    item: any,
    index: string;
    onPress?: ((args: any) => void) | undefined
}

export const IconWithTag = ({ item, index, onPress }: IIconWithTag) => {
    return (
        <TouchableOpacity
            onPress={() => onPress && onPress({ item, index })}
            style={styles.container}
            activeOpacity={design.OPACITY_AVG}
            key={index}
        >
            <View style={styles.iconContainer}>
                {item?.serv_image ?
                    <Image
                        source={item?.serv_image == "more" ? Images.more : { uri: appConfig.apiConnections.s3 + '/' + item.serv_image }}
                        style={design.GENERIC_IMAGE}
                    />
                    : item?.iconType && item?.iconName ?
                        <Icon type={item?.serv_icon_type} name={item?.serv_icon_name} size={30} color={item?.serv_icon_color} />
                        : <Image
                            source={Images.ImageHolder}
                            style={design.GENERIC_IMAGE}
                        />
                }
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.label} numberOfLines={1}>
                    {item.serv_label}
                </Text>
            </View>
            {item?.serv_is_coming_soon || item?.serv_is_Popular || item?.serv_is_new ?
                <View style={styles.absoluteLabelContainer}>
                    <Text style={styles.absoluteLabel} numberOfLines={1}>
                        {item.serv_is_coming_soon ? 'Soon' : item.serv_is_Popular ? '***' : item.serv_is_new ? 'New' : ''}
                    </Text>
                </View>
                : null}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: ws(100),
        width: ws(80),
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginVertical: hs(4),
    },
    iconContainer: {
        height: ws(60),
        width: ws(60),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        overflow: 'hidden',
    },
    textContainer: {

    },
    label: {
        fontSize: ms(11),
        fontFamily: fontsConfig.Bold,
        color: colors.S_TEXT_COLOR,
        textAlign: 'center'
    },
    absoluteLabelContainer: {
        position: 'absolute',
        top: 0, right: 0,
        backgroundColor: colors.P_COLOR_DARK,
        paddingVertical: hs(2),
        paddingHorizontal: ws(4),
        borderRadius: 100
    },
    absoluteLabel: {
        fontSize: ms(9),
        fontFamily: fontsConfig.Bold,
        color: colors.WHITE1,
        textAlign: 'center',
    }
})