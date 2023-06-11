import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';

import NavServiceUtils from '@controllers/utils/NavService.utils';
import { NavKeys } from '@controllers/utils/NavKeys.utils';
import { MainHeader } from '@views/components/functional/MainHeader';
import { TextInput } from '@views/components/functional/TextInput';
import { Button } from '@views/components/functional/Button';
import { ScrollView } from '@views/components/functional/Scrollview';
import { rechargeTransportor } from '@models/redux/recharge/recharge.transportor';
import { hs, ms, ws } from '@utilis/designs/measurements.design';
import { INavigationProps } from '@utilis/interfaces/navigation.interface';
import design from '@config/design.config';
import { FlatList } from '@views/components/functional/Flatlist';
import colors from '@config/colors.config';
import fontsConfig from '@config/fonts.config';
import { isMobileNo } from '@utilis/methods/string.method';
import { ModelHalf } from '@views/components/functional/ModelHalf';
import { systemTransportor } from '@models/redux/system/system.transportor';
import { MobileContactBook } from '@views/components/functional/MobileContactBook';
import RechargeApis from '@models/api/paype/recharge/recharge.api';


export default ({ route, navigation }: INavigationProps) => {
    const { systemStore } = systemTransportor()
    const { initMobileRecharge } = rechargeTransportor()
    const { user } = systemStore()
    const { user_id, user_name, user_mobile_no, user_email, user_image, is_active, ...rest } = user?.user ?? {}
    const [searchString, setSearchString] = useState('')
    const [mobile, setMobile] = useState('')
    const isMobileNoValid = !isMobileNo({ label: "Mobile no", value: mobile })
    const [visible, setVisible] = useState(false)
    const [providerOptions, setProviderOptions] = useState({ isLoading: false, data: [] })

    useEffect(() => {
        initMobileRecharge()
    }, [])

    // Submit
    const goForPlanSelection = ({ mobile }: any) => {
        setProviderOptions({ isLoading: true, data: [] })
        RechargeApis.getOperator({ body: { mobileNo: mobile } }).then((res) => {
            setProviderOptions({ isLoading: false, data: res.data })
            if (res.data.length == 1) {
                NavServiceUtils.navigate(NavKeys.RECHARGE_SELECTPLAN, {
                    mobile, provider: res.data[0]
                })
                return
            }
            setVisible(true)
            return
        })
    }

    const goForPlanSelectionFromOptions = ({ mobile, provider }: any) => {
        setVisible(false)
        NavServiceUtils.navigate(NavKeys.RECHARGE_SELECTPLAN, { mobile, provider })
    }

    return (
        <View style={design.GENERIC_SCREEN_P}>
            <MainHeader
                render={[
                    { type: "Icon", iconType: "Entypo", iconName: "chevron-left", onPress: () => NavServiceUtils.goBack() },
                    { type: "Title", title: "MOBILE RECHARGE" },
                    { type: "Icon", iconType: 'FontAwesome', iconName: 'history', onPress: () => NavServiceUtils.navigate(NavKeys.RECHARGE_MOBILE_HISTORY) },
                ]}
            />
            <View style={[design.GENERIC_CONTAINER_P, { backgroundColor: 'white' }]} >
                <View style={[styles.container, { backgroundColor: colors.S_BG }]}>
                    <TextInput
                        iconType={"Entypo"}
                        iconName={"old-mobile"}
                        label={"Search / Enter Mobile no."}
                        star={true}
                        placeholder={'John / 9876543210'}
                        value={searchString}
                        onChangeText={(text: string) => {
                            setSearchString(text)
                            setMobile(text)
                        }}
                        focusable={true}
                        stopAnimation={true}
                        container={{ marginTop: 0, marginBottom: 0, borderRadius: 0 }}
                    />
                    <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={true}>
                        <MobileContactBook
                            type={'recharge history'}
                            label={"Recent recharge"}
                            selected={[mobile]}
                            onSelect={(mobile) => goForPlanSelection({ mobile })}
                            searchString={searchString}
                        />
                        <MobileContactBook
                            type={'phone book'}
                            selected={[mobile]}
                            onSelect={(mobile) => goForPlanSelection({ mobile })}
                            searchString={searchString}
                            showNoData={true}
                        />
                    </ScrollView>
                </View>
            </View>
            <Button
                label={mobile ? `Continue with ${mobile}` : `Continue`}
                isEditable={isMobileNoValid}
                isLoading={providerOptions.isLoading}
                onPress={() => goForPlanSelection({ mobile })}
                style={{ marginVertical: hs(16) }}
            />


            <ModelHalf title='Select Provider' visible={visible} onRequestClose={() => setVisible(!visible)}>
                <FlatList
                    data={providerOptions.data}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity onPress={() => goForPlanSelectionFromOptions({ mobile, provider: item })} style={[styles.contactCard, { height: hs(50), borderColor: colors.P_BG, justifyContent: 'center' }]} activeOpacity={design.OPACITY_AVG} key={index}>
                                <Text style={styles.title}>{item?.oper_name}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            </ModelHalf>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.P_BG,
        borderRadius: ms(16),
        paddingBottom: hs(4),
        marginTop: hs(8),
        marginHorizontal: ws(8),
        overflow: 'hidden'
    },
    contactCard: {
        backgroundColor: colors.P_BG,
        borderRadius: 8,
        paddingHorizontal: ws(16),
        paddingVertical: hs(8),
        marginHorizontal: ws(8),
        marginVertical: hs(4),
        borderLeftWidth: ws(4),
    },
    title: {
        fontSize: ms(13),
        fontFamily: fontsConfig.Bold,
        color: colors.P_TEXT_COLOR,
    }
})