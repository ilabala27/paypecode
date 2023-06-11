import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import design from '@config/design.config';
import { hs, ms, ws } from '@utilis/designs/measurements.design';
import colors from '@config/colors.config';
import fontsConfig from '@config/fonts.config';
import { Loader } from '../functional/Loader';
import UserApis from '@models/api/paype/user/user.api';


interface IUserCardFromAPI {
    userId: string;
    onPress?: ((args?: any) => void) | undefined;
    bg?: string;
    color?: string;
}

export const UserCardFromAPI = ({ userId, bg = colors.S_BG, color = colors.S_TEXT, onPress }: IUserCardFromAPI) => {
    const [user, setUser] = useState<{ data: any, isLoading: boolean }>({ data: null, isLoading: true })
    const { data } = user

    useEffect(() => {
        const body = { user_id: userId }
        UserApis.getUserByFields({ body }).then((res) => {
            if (res?.data?.length == 1) {
                setUser({ isLoading: false, data: res.data[0] })
            }
        }).catch((err) => console.log(err))
    }, [userId])

    return (
        <TouchableOpacity
            onPress={() => onPress && onPress()}
            disabled={!onPress}
            style={[styles.conatiner, { backgroundColor: bg }]}
            activeOpacity={design.OPACITY_AVG}
        >
            {user.isLoading ? <Loader container={{ width: '100%', backgroundColor: colors.TRANS }} /> :
                <>
                    <Text style={[styles.title, { color }]}>{data.user_name}</Text>
                    <Text style={[styles.subTitle, { color }]}>{data.user_mobile_no} ( {data.is_active ? "Active" : "Inactive"} )</Text>
                    <Text style={[styles.subTitle, { color }]}>{data.user_type}</Text>
                </>
            }
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    conatiner: {
        minHeight: hs(80),
        width: "100%",
        paddingVertical: hs(8),
        paddingHorizontal: ws(16),
        borderRadius: 6,
        marginTop: hs(8),
        backgroundColor: colors.P_COLOR,
        justifyContent: "center"
    },
    title: {
        fontSize: ms(12),
        fontFamily: fontsConfig.Bold,
        color: colors.P_TEXT_COLOR,
    },
    subTitle: {
        fontSize: ms(12),
        fontFamily: fontsConfig.Medium,
        color: colors.P_TEXT_COLOR,
    },
})