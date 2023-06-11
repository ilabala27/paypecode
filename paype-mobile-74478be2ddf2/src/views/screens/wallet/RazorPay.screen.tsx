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
import { walletTransportor } from '@models/redux/wallet/wallet.transportor';
import { Icon } from '@views/components/functional/Icon';


export default ({ route, navigation }: INavigationProps2) => {
    const { type } = route.params
    const { walletStore, setCashDeposit } = walletTransportor()
    const { cashDeposit } = walletStore() ?? {}
    const { systemStore, setSnack } = systemTransportor()
    const { user } = systemStore()
    const user_id = user?.user?.user_id

    const condBuilder = () => {
        let params: any = {}, title = ""
        if (type == "CREATED") {
            title = `Cash reposit request`
            params.status = type
        } else {
            title = "Cash Deposit"
            params.user_id = user_id
        }
        return { params, title };
    }
    const { params, title } = condBuilder()

    // ### OnMount
    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        const payload = { params }
        setCashDeposit(payload)
    }

    const renderItem = ({ item, index }: any) => {
        return (
            <TouchableOpacity activeOpacity={design.OPACITY_AVG} onPress={() => NavServiceUtils.dispatchPush(NavKeys.WALLET.CASH_DEPOSIT_FORM, { _id: item?.cade_id })} style={design.CARD}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={design.S_TEXT}>Created{'\n'}{moment(item.cade_created_at).format('DD-MM-YYYY')}</Text>
                    <Text style={design.S_TEXT}>Deposited{'\n'}{moment(item.cade_date).format('DD-MM-YYYY')}</Text>
                </View>
                <Text style={[design.S_TEXT, { marginVertical: hs(8) }]}>{item.cade_description}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ paddingHorizontal: ws(8), paddingVertical: hs(8), backgroundColor: colors.P_COLOR, borderRadius: ms(6), alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center' }}>
                        <Text>{toLowerAndFirstcapAndReplace(item.cade_status, '_', ' ')}</Text>
                    </View>
                    <Text style={design.P_TEXT}>
                        <Icon type={"FontAwesome"} name={"inr"} size={ms(16)} />
                        {" "}{parseFloat(item.cade_transaction_amount).toFixed(2)}
                    </Text>
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
            {cashDeposit?.isLoading ? <Loader /> :
                <FlatList
                    data={cashDeposit.data}
                    contentContainerStyle={{ paddingBottom: hs(50) }}
                    renderItem={renderItem}
                    onRefresh={() => getData()}
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