import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';

import NavServiceUtils from '@controllers/utils/NavService.utils';
import { MainHeader } from '@views/components/functional/MainHeader';
import { INavigationProps2 } from '@utilis/interfaces/navigation.interface';
import design from '@config/design.config';
import { NavKeys } from '@controllers/utils/NavKeys.utils';
import { FlatList } from '@views/components/functional/Flatlist';
import { hs, ms, ws } from '@utilis/designs/measurements.design';
import colors from '@config/colors.config';
import fonts from '@config/fonts.config';
import { systemTransportor } from '@models/redux/system/system.transportor';
import PPUserAPIs from '@models/api/paype/user/user.api';
import { Loader } from '@views/components/functional/Loader';
import moment from 'moment';
import { toLowerAndFirstcapAndReplace } from '@utilis/methods/string.method';
import { t } from 'i18next';

export default ({ route, navigation }: INavigationProps2) => {
    const { type } = route.params
    const { systemStore, setSnack } = systemTransportor()
    const { user, RBAC } = systemStore()
    const loggedInUserId = user?.user?._id
    const [data, setData] = useState({
        list: [],
        isLoading: false
    })

    useEffect(() => {
        getUser()
    }, [])

    const condBuilder = () => {
        let body: any = {}
            , title = ""

        switch (type) {
            case "ONBOARDING_IN_PROGRESS":
                body.user_is_blocked = false
                body.user_is_account_verified = false
                body.user_created_by = user?.user?._id
                body.orderBy = { updated_at: 'DESC' }
                title = "OnBoarding in progress"
                break;
            case "PENDING_VERIFICATION":
                body.user_is_profile_updated = true
                body.user_registration_status = "VERIFIER_ALLOCATION"
                body.user_is_kyc_verified = false
                body.orderBy = { updated_at: 'DESC' }
                title = "Pending verification"
                break;
            case "VERIFICATION_IN_PROGRESS":
                body.user_is_profile_updated = true
                body.user_registration_status = "VERIFICATION"
                body.user_kyc_verified_by = loggedInUserId
                body.user_is_kyc_verified = false
                body.orderBy = { updated_at: 'DESC' }
                title = "Verification in progress"
                break;
            case "PENDING_ACTIVATION":
                body.user_is_profile_updated = true
                body.user_is_kyc_verified = true
                body.user_registration_status = "ACTIVATOR_ALLOCATION"
                body.user_is_account_verified = false
                body.orderBy = { updated_at: 'DESC' }
                title = "Pending Activation"
                break;
            case "ACTIVATION_IN_PROGRESS":
                body.user_is_profile_updated = true
                body.user_is_kyc_verified = true
                body.user_registration_status = "ACTIVATION"
                body.user_account_verified_by = loggedInUserId
                body.user_is_account_verified = false
                body.orderBy = { updated_at: 'DESC' }
                title = "Activation in progress"
                break;
            default:
                body.user_is_account_verified = true
                body.orderBy = { user_name: 'ASC' }
                title = "Active users"
                if (!RBAC.isRoot)
                    body.user_created_by_chain = `,${user?.user?.user_id},`
        }
        return { body, title };
    }

    let { body, title }: any = condBuilder()

    const getUser = () => {
        if (!data.isLoading) {
            setData({ ...data, isLoading: true })
            PPUserAPIs.getUserByFields({ body }).then((res: any) => {
                setData({ list: res.data, isLoading: false })
                return
            }).catch(({ message }: any) => {
                setData({ ...data, isLoading: false })
                setSnack({ message, type: 'ERROR' })
            })
        }
    }

    const renderItem = ({ item, index }: any) => {
        return (
            <TouchableOpacity
                style={design.CARD}
                onPress={() => NavServiceUtils.navigate(NavKeys.ADMIN.USER_ONBOARDING_WELCOME, { user_id: item._id })}
            >
                <View style={{ paddingHorizontal: ws(8), paddingVertical: hs(8), backgroundColor: 'rgba(28, 123, 83, 0.3)', borderRadius: ms(6), alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center' }}>
                    <Text>{toLowerAndFirstcapAndReplace(item.user_registration_status, '_', ' ')}</Text>
                </View>
                <Text style={design.P_TEXT}>{item.user_name}</Text>
                <Text style={design.S_TEXT}>{item.user_mobile_ex}{item.user_mobile_no}</Text>
                <Text style={design.S_TEXT}>{item.user_email}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: hs(6) }}>
                    <Text style={design.S_TEXT}>{t("ACTIVE_USERS.CREATED")} {moment(item.created_at).format('DD-MM-YYYY')}</Text>
                    <Text style={design.S_TEXT}>{t("ACTIVE_USERS.STATUS")} {moment(item.updated_at).format('DD-MM-YYYY')}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={design.S_TEXT}>{item.user_type}</Text>
                    <Text style={design.S_TEXT}>{t("ACTIVE_USERS.PROFILE")}{item.user_is_profile_updated ? 'updated' : 'In progress'}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={design.GENERIC_SCREEN_S}>
            <MainHeader
                render={[
                    { type: "Icon", iconType: "Entypo", iconName: "chevron-left", onPress: () => NavServiceUtils.goBack() },
                    { type: "Title", title: title },
                    { type: "Icon" },
                ]}
            />
            {data?.isLoading ? <Loader /> :
                <FlatList
                    data={data.list}
                    contentContainerStyle={{ paddingBottom: hs(50) }}
                    renderItem={renderItem}
                    onRefresh={() => getUser()}
                    refreshing={false}
                />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    textValue: {
        flex: 1,
        fontSize: ms(13),
        fontFamily: fonts.Medium,
        color: colors.P_TEXT,
    },
    textContainer: {
        flexDirection: 'row',
        height: hs(45),
        width: "100%",
        paddingVertical: 0,
        paddingHorizontal: ws(10),
        borderRadius: 6,
        marginVertical: hs(4),
        backgroundColor: colors.WHITE1,
        alignItems: 'center',
        justifyContent: "center",
    },
    iconConatiner: {
        height: hs(40),
        width: ws(40),
        margin: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})