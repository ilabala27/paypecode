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
import moment from 'moment';
import { toLowerAndFirstcapAndReplace } from '@utilis/methods/string.method';
import { Icon } from '@views/components/functional/Icon';
import { rechargeTransportor } from '@models/redux/recharge/recharge.transportor';

interface ICommission {

}

export const Commission = ({ }: ICommission) => {
    const { rechargeStore } = rechargeTransportor()
    const { mobileRechargeManagement } = rechargeStore() ?? {}
    const { isLoading, settings: { commissions } } = mobileRechargeManagement

    const renderItem = ({ item, index }: any) => {
        return (
            <TouchableOpacity
                activeOpacity={design.OPACITY_AVG}
                onPress={() => NavServiceUtils.navigate(NavKeys.WALLET.CASH_DEPOSIT_FORM, { _id: item?.cade_id })}
                style={design.CARD}
            >
                <View style={{ marginBottom: hs(4) }}>
                    <Text style={design.P_TEXT}>{item?.comm_operator?.oper_name}</Text>
                    <Text style={design.P_TEXT}>{item?.comm_operator?.oper_type}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={design.S_TEXT}></Text>
                    <Text style={design.S_TEXT}>Is active {item?.comm_operator?.oper_is_active ? 'Yes' : 'No'}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const renderCommissions = ({ item, index }: any) => {
        return (
            <View style={{ paddingHorizontal: ws(16), paddingVertical: hs(8) }}>
                <Text style={design.P_TEXT}>{item.user_name} - {item.user_type}</Text>
                <FlatList
                    data={item.commissions}
                    contentContainerStyle={{ paddingBottom: hs(50) }}
                    renderItem={renderItem}
                    onRefresh={() => null}
                    refreshing={false}
                />
            </View>
        )
    }

    return (
        <View style={design.GENERIC_SCREEN_S}>
            {isLoading ? <Loader /> :
                <FlatList
                    data={commissions.filter((e: any) => e?.commissions?.length)}
                    contentContainerStyle={{ paddingBottom: hs(50) }}
                    renderItem={renderCommissions}
                    onRefresh={() => null}
                    refreshing={false}
                />
            }
        </View>
    );
};
