import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import design from '@config/design.config';

import NavServiceUtils from '@controllers/utils/NavService.utils';
import { NavKeys } from '@controllers/utils/NavKeys.utils';
import { MainHeader } from '@views/components/functional/MainHeader';
import { TabWithSlider } from '@views/components/functional/TabWithSlider';
import { FlatList } from '@views/components/functional/Flatlist';
import { RechargePlanCard } from '@views/components/designs/RechargePlanCard';
import { INavigationProps2 } from '@utilis/interfaces/navigation.interface';
import { Button } from '@views/components/functional/Button';
import { hs, ms, ws } from '@utilis/designs/measurements.design';
import colors from '@config/colors.config';
import fontsConfig from '@config/fonts.config';
import { systemTransportor } from '@models/redux/system/system.transportor';
import { walletTransportor } from '@models/redux/wallet/wallet.transportor';
import { TextInput } from '@views/components/functional/TextInput';
import { Loader } from '@views/components/functional/Loader';
import { AxiosResponse } from 'axios';
import RechargeApis from '@models/api/paype/recharge/recharge.api';
import { ModelHalf } from '@views/components/functional/ModelHalf';
import { ConsoleLogger } from '@aws-amplify/core';

// mobile, provider, plan
export default ({ route, navigation }: INavigationProps2) => {
    const { mobile, provider } = route.params
    const { systemStore, setSnack } = systemTransportor()
    const { user } = systemStore()
    const { walletStore, setCreditBalanceAndTransaction } = walletTransportor()
    const { crwa_user_id, crwa_id } = walletStore()?.creditWalletBalance ?? {}
    const {
        user_id, user_name, user_mobile_no, user_email, user_image, is_active,
        user_super_distributor, user_distributor, user_org, user_type, ...rest
    } = user?.user ?? {}
    const [visible, setVisible] = useState(false)
    const [providerOptions, setProviderOptions] = useState({ isLoading: true, data: [] })
    const [selectedProvider, setSelectedProvider] = useState<any>(null)
    const [plan, setPlan] = useState<any>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [mobileRechargePlans, setMobileRechargePlans] = useState<any>({ isLoading: true, data: {} })
    const tabKeys = Object.keys(mobileRechargePlans?.data)

    useEffect(() => {
        getPlan()
    }, [])

    const getPlan = () => {
        setProviderOptions({ ...providerOptions, data: provider?.providers ?? [] })
        setSelectedProvider(provider?.providers[0] ?? null)
        RechargeApis.getPlan({ body: { mobileNo: mobile } }).then((res) => {
            setMobileRechargePlans({ isLoading: false, data: res?.data?.RDATA ?? {} })
        }).catch((err) => {
            console.log(err)
        })
    }

    const searchPlan = (searchStr: string) => {
        tabKeys.map((el, i) => {
            const data = mobileRechargePlans?.data[el]
            data?.find((e: any, i: number) => {
                if (e.rs == searchStr) {
                    setPlan({ item: e, index: i })
                    return
                }
            })
        })
    }

    const onConfirm = () => {
        Alert.alert(
            "Recharge confirmation",
            `Are you sure you want a recharge of ${plan?.item?.rs} Rs for ${mobile} ?`,
            [
                { text: "Cancel", onPress: () => null, style: 'cancel' },
                { text: "Sure", onPress: doPay }
            ],
            { cancelable: false }
        );
    }

    const doPay = async () => {
        try {
            if (isLoading) return
            setIsLoading(true)
            const payload = {
                org: user_org ?? user_id,
                super_distributor: user_super_distributor ?? user_org ?? user_id,
                distributor: user_distributor ?? user_org ?? user_id,
                reatailor: user_id,
                reatailor_name: user_name,

                mobile: mobile,
                provider: selectedProvider?.prov_id,
                plan: plan?.item
            }

            const transaction: AxiosResponse<any, any> = await RechargeApis.doRecharge({ body: payload })
            const { status, message } = transaction?.data
            setCreditBalanceAndTransaction({ params: { wallet_id: crwa_id, user_id: crwa_user_id } })
            NavServiceUtils.navigate(NavKeys.TAB_DASHBOARD.TAB_SCREEN_HOME)

            // ### Status
            if (status == 'success') {
                setSnack({ message, type: 'SUCCESS' })
            } else if (status == 'failed') {
                setSnack({ message, type: 'ERROR' })
            } else if (status == 'processing') {
                setSnack({ message, type: 'DOUBTFUL' })
            } else setSnack({ message: message ?? "Something went wrong", type: 'ERROR' })
        } catch (err: any) {
            console.log(err)
            setSnack({ message: err?.message ?? 'Something went wrong', type: 'ERROR' })
            setIsLoading(false)
        }
    }

    const renderScene = ({ route }: any) => {
        let data = mobileRechargePlans?.data[route.key]
        return (
            <View style={design.GENERIC_CONTAINER_S}>
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => {
                        return (
                            <RechargePlanCard
                                item={item}
                                index={index}
                                numberOfLines={3}
                                iconType={"Entypo"}
                                iconName={"chevron-right"}
                                onPress={() => setPlan({ item, index })}
                            />
                        )
                    }}
                />
            </View>
        )
    };

    return (
        <View style={design.GENERIC_SCREEN_S}>
            <MainHeader
                render={[
                    { type: "Icon", iconType: "Entypo", iconName: "chevron-left", onPress: () => NavServiceUtils.goBack() },
                    { type: "Title", title: "SELECT PLAN" },
                    { type: "Icon", iconType: "FontAwesome", iconName: "refresh", onPress: () => setVisible(true) },
                ]}
            />
            {mobileRechargePlans.isLoading ? <Loader /> :
                <>
                    {tabKeys.length > 0 ?
                        <TabWithSlider
                            tabs={tabKeys.map((el, i) => ({ key: el, title: el, index: i })).filter((el) => mobileRechargePlans?.data[el?.key]?.length)}
                            renderScene={renderScene}
                        />
                        :
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.title}>No plan exist for your mobile number</Text>
                        </View>
                    }
                    <View style={styles.popCard}>
                        {!plan ? null :
                            <>
                                <RechargePlanCard
                                    {...plan}
                                    iconType={"FontAwesome"}
                                    iconName={"close"}
                                    onPress={() => setPlan(null)}
                                />
                                <View style={{ flexDirection: 'row', marginVertical: hs(8), marginHorizontal: ws(16) }}>
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={styles.title}>{mobile}</Text>
                                        <Text style={styles.subTitle}>{provider?.category}</Text>
                                        <Text style={styles.subTitle}>{provider?.operator}</Text>
                                    </View>
                                    <Button
                                        label={`Proceed to pay`}
                                        isEditable={true}
                                        isLoading={isLoading}
                                        onPress={onConfirm}
                                        style={{ height: hs(50), width: ws(120), borderRadius: ms(8) }}
                                    />
                                </View>
                            </>
                        }
                        <TextInput
                            label={"Enter Amount"}
                            star={false}
                            placeholder={'eg 100'}
                            keyboardType={'numeric'}
                            onChangeText={(text: string) => searchPlan(text)}
                        />
                    </View>
                </>}

            <ModelHalf title='Select Provider' visible={visible} onRequestClose={() => setVisible(!visible)}>
                <FlatList
                    data={providerOptions?.data}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity onPress={() => { setSelectedProvider(item); setVisible(false) }} style={[styles.contactCard, { height: hs(50), borderColor: colors.P_BG, justifyContent: 'center' }]} activeOpacity={design.OPACITY_AVG} key={index}>
                                <Text style={styles.title}>{item?.prov_display_name}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            </ModelHalf>

        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: ms(13),
        fontFamily: fontsConfig.Bold,
        color: colors.P_TEXT_COLOR,
    },
    subTitle: {
        fontSize: ms(11),
        fontFamily: fontsConfig.Medium,
        color: colors.S_TEXT_COLOR,
    },
    triTitle: {
        fontSize: ms(10),
        fontFamily: fontsConfig.Regular,
        color: colors.T_TEXT_COLOR,
    },
    tag: {
        fontSize: ms(13),
        fontFamily: fontsConfig.Bold,
        color: colors.S_TEXT,
        alignSelf: 'center',
        paddingHorizontal: ws(8),
        marginVertical: hs(16),
    },
    popCard: {
        minHeight: hs(108),
        width: '95%',
        backgroundColor: colors.P_BG,
        marginTop: hs(8),
        paddingTop: hs(8),
        borderTopLeftRadius: ms(16),
        borderTopRightRadius: ws(16),
        borderWidth: ms(1.5),
        borderColor: colors.P_TEXT,
        marginHorizontal: '2.5%',
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
})


