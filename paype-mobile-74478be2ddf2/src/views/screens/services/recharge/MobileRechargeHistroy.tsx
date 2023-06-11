import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, } from 'react-native';

import NavServiceUtils from '@controllers/utils/NavService.utils';
import design from '@config/design.config';
import { NavKeys } from '@controllers/utils/NavKeys.utils';
import { FlatList } from '@views/components/functional/Flatlist';
import { hs, ms, ws } from '@utilis/designs/measurements.design';
import colors from '@config/colors.config';
import fonts from '@config/fonts.config';
import { Loader } from '@views/components/functional/Loader';
import { rechargeTransportor } from '@models/redux/recharge/recharge.transportor';
import { MainHeader } from '@views/components/functional/MainHeader';

interface INavigationProps {

}

export default ({ }: INavigationProps) => {
    const { rechargeStore, getContacts, setHistory } = rechargeTransportor()
    const { history, mobileContacts } = rechargeStore()
    const { isLoading, data } = history

    const renderItem = ({ item, index }: any) => {
        return (
            <TouchableOpacity
                activeOpacity={design.OPACITY_AVG}
                // onPress={() => NavServiceUtils.navigate(NavKeys.WALLET.CASH_DEPOSIT_FORM, { _id: item?.cade_id })}
                style={design.CARD}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={styles.labelT}>Transaction{'\n'}<Text style={styles.labelS}>{item.retr_id}</Text></Text>
                    <Text style={styles.labelT}>Status{'\n'}<Text style={styles.labelS}>{item.retr_status}</Text></Text>
                </View>
                <View style={{ marginVertical: hs(8) }}>
                    <Text style={styles.labelTitle}>{item.retr_mobile}</Text>
                    <Text style={styles.labelSubTitle}>{item.retr_short_description}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={styles.labelS}>Plan: <Text style={styles.labelS_B}>Rs. {parseFloat(item.retr_plan).toFixed(2)}</Text></Text>
                    <Text style={styles.labelS}>Net.: <Text style={styles.labelP}>Rs. {parseFloat(item.retr_net_payable).toFixed(2)}</Text></Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={design.GENERIC_SCREEN_S}>
            <MainHeader
                render={[
                    { type: "Icon", iconType: "Entypo", iconName: "chevron-left", onPress: () => NavServiceUtils.goBack() },
                    { type: "Title", title: "Mobile Recharge History" },
                    { type: "Icon", },
                ]}
            />
            {isLoading ? <Loader /> :
                <FlatList
                    data={data}
                    contentContainerStyle={{ paddingBottom: hs(50) }}
                    renderItem={renderItem}
                    onRefresh={() => null}
                    refreshing={false}
                />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    labelP: {
        fontSize: ms(12),
        fontFamily: fonts.Bold,
        color: colors.P_TEXT_COLOR,
    },
    labelS: {
        fontSize: ms(12),
        fontFamily: fonts.Regular,
        color: colors.S_TEXT_COLOR,
    },
    labelT: {
        fontSize: ms(11),
        fontFamily: fonts.Regular,
        color: colors.T_TEXT_COLOR,
    },
    labelS_B: {
        fontSize: ms(11),
        fontFamily: fonts.Bold,
        color: colors.S_TEXT_COLOR,
    },
    labelTitle: {
        fontSize: ms(12),
        fontFamily: fonts.Bold,
        color: colors.P_TEXT_COLOR,
    },
    labelSubTitle: {
        fontSize: ms(12),
        fontFamily: fonts.Regular,
        color: colors.S_TEXT_COLOR,
    },
})