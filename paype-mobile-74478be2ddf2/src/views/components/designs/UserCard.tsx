import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import design from '@config/design.config';
import { hs, ws } from '@utilis/designs/measurements.design';
import colors from '@config/colors.config';
import appConfig from '@config/app.config';


interface IUserCard {
    item: any,
    index: string | number;
    onPress?: ((args: any) => void) | undefined
}

export const UserCard = ({ item, index, onPress }: IUserCard) => {
    if (!item) return null
    return (
        <TouchableOpacity
            onPress={() => onPress && onPress({ item, index })}
            style={styles.container}
            activeOpacity={design.OPACITY_AVG}
            key={index}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: appConfig.apiConnections.s3 + '/' + item?.user_image }}
                    style={design.GENERIC_IMAGE}
                />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={design.P_TEXT}>{item?.user_name}</Text>
                <Text style={design.S_TEXT}>{item?.user_mobile_ex}{item?.user_mobile_no}</Text>
                {item?.user_email ?
                    <Text style={design.S_TEXT}>{item?.user_email}</Text>
                    : null}
            </View>
            {item?.tag ?
                <View style={styles.tagContainer}>
                    <Text style={[design.T_TEXT, { color: colors.WHITE1, alignSelf: 'flex-end' }]}>{item?.tag}</Text>
                </View>
                : null}
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: colors.P_BG,
        width: '95%',
        borderRadius: 8,
        borderBottomRightRadius: 0,
        alignSelf: 'center',
        paddingHorizontal: ws(16),
        paddingVertical: hs(10),
        marginTop: hs(16),
        marginBottom: hs(24),
        justifyContent: 'center'
    },
    imageContainer: {
        height: hs(60),
        width: hs(60),
        borderRadius: 100,
        backgroundColor: colors.S_BG,
        marginRight: ws(12),
        overflow: 'hidden'
    },
    tagContainer: {
        position: 'absolute',
        bottom: -hs(20),
        right: 0,
        height: hs(20),
        justifyContent: 'center',
        paddingHorizontal: ws(24),
        backgroundColor: colors.BLUE,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
    }
})