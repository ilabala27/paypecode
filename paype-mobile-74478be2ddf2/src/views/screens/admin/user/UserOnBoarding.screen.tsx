import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TouchableOpacity, View, Modal, } from 'react-native';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import NavServiceUtils from '@controllers/utils/NavService.utils';
import { ScrollView } from '@views/components/functional/Scrollview';
import { INavigationProps2 } from '@utilis/interfaces/navigation.interface';
import design from '@config/design.config';
import { Icon } from '@views/components/functional/Icon';
import { NavKeys } from '@controllers/utils/NavKeys.utils';
import { hp, hs, ms, wp, ws } from '@utilis/designs/measurements.design';
import colors from '@config/colors.config';
import { FlatList } from '@views/components/functional/Flatlist';
import PPUserAPIs from '@models/api/paype/user/user.api';
import { systemTransportor } from '@models/redux/system/system.transportor';
import { Loader } from '@views/components/functional/Loader';
import { Button } from '@views/components/functional/Button';
import { Images } from '@assets/images/png';
import appConfig from '@config/app.config';
import { toLowerAndFirstcapAndReplace } from '@utilis/methods/string.method';
import moment from 'moment';
import { ModelHalf } from '@views/components/functional/ModelHalf';
import { UserCard } from '@views/components/designs/UserCard';
import { grantStatus } from '@utilis/hooks/rbac/authorization.rbac';
import { t } from 'i18next';


export default ({ route, navigation }: INavigationProps2) => {
    const { user_id } = route?.params
    const { systemStore, setSnack } = systemTransportor()
    const { user } = systemStore()
    const [isStatusPopUpVisible, setIsStatusPopUpVisible] = useState(false)
    const loggedInUserId = user?.user?._id
    const [data, setData] = useState<any>({
        value: '',
        isLoading: false
    })
    const [isKeyLoading, setIsKeyLoading] = useState('')
    // const isProfileSubmitted = data?.value?.user_is_profile_updated ? true : false
    const onBoardStatus = data?.value?.user_registration_status
    const verifierUserId = data?.value?.user_kyc_verified_by
    const activatorUserId = data?.value?.user_account_verified_by
    const isEditable = onBoardStatus != "VERIFIER_ALLOCATION" && onBoardStatus != "VERIFICATION" && onBoardStatus != "ACTIVATOR_ALLOCATION" && onBoardStatus != "ACTIVATION" //&& onBoardStatus != "COMPLETED"
    const isOnboardCompleted = onBoardStatus == "COMPLETED"
    const updateStatus = async ({ loadingKey, status, body = {}, CB }: { loadingKey?: string, status?: string, body?: any, CB?: any }) => {
        loadingKey && setIsKeyLoading(loadingKey)
        let payload = {
            params: { _id: user_id },
            body: {
                user_registration_status: status,
                ...body
            }
        }
        const updateStatus = await PPUserAPIs.updateUserById(payload)
        if (loadingKey && updateStatus?.data) {
            CB && CB()
            setData({
                value: { ...data.value, ...payload.body },
                isLoading: false
            })
            setIsKeyLoading('')
            return
        }
        return

    }
    const grant = grantStatus([
        "onboarding-user:verification",
        "onboarding-user:activation"
    ])

    const list = [
        {
            name: t("USER_ONBOARDING.USER_DETAILS"),
            iconType: 'Entypo',
            iconName: 'user',
            visble: true,
            completed: data?.value?._id ? true : false,
            key: NavKeys.ADMIN.USER_ONBOARDING_USER,
            params: {
                user_id: data?.value?._id ?? undefined,
                isEditable
            }
        },
        {
            name:  t("USER_ONBOARDING.USER_ADDRESS"),
            iconType: 'Ionicons',
            iconName: 'ios-home',
            visble: true,
            completed: data?.value?.address_user_mapper?.addr_id ? true : false,
            key: NavKeys.ADMIN.USER_ONBOARDING_ADDRESS,
            params: {
                address: {
                    ref_name: 'user',
                    ref_id: data?.value?._id ?? undefined,
                    addr_id: data?.value?.address_user_mapper?.addr_id ?? undefined,
                },
                createCallBack: () => updateStatus({ status: "BUSINESS_CREATION" }),
                isEditable
            }
        },
        {
            name:  t("USER_ONBOARDING.BUSINESS_DETAILS"),
            iconType: 'FontAwesome',
            iconName: 'id-card',
            visble: true,
            completed: data?.value?.business?._id ? true : false,
            key: NavKeys.ADMIN.USER_ONBOARDING_BUSINESS,
            params: {
                user_id: data?.value?._id ?? undefined,
                business_id: data?.value?.business?._id ?? undefined,
                createCallBack: () => updateStatus({ status: "BUSINESS_ADDRESS_CREATION" }),
                isEditable
            }
        },
        {
            name:  t("USER_ONBOARDING.BUSINESS_ADDRESS"),
            iconType: 'MaterialCommunityIcons',
            iconName: 'store-marker',
            visble: true,
            completed: data?.value?.address_business_mapper?.addr_id ? true : false,
            key: NavKeys.ADMIN.USER_ONBOARDING_ADDRESS,
            params: {
                address: {
                    ref_name: 'business',
                    ref_id: data?.value?.business?._id,
                    addr_id: data?.value?.address_business_mapper?.addr_id ?? undefined,
                    addressSameAsOption: data?.value?.address_user
                },
                createCallBack: () => updateStatus({ status: "BANK_DEATILS_CREATION" }),
                isEditable
            }
        },
        {
            name:  t("USER_ONBOARDING.BANK_DETAILS"),
            iconType: 'FontAwesome',
            iconName: 'bank',
            visble: true,
            completed: data?.value?.bank?._id ? true : false,
            key: NavKeys.ADMIN.USER_ONBOARDING_BANK,
            params: {
                bank: {
                    ref_name: 'user',
                    ref_id: data?.value?._id ?? undefined,
                    bank_id: data?.value?.bank?._id ?? undefined
                },
                createCallBack: () => updateStatus({ status: "DOCUMENT_UPLOAD" }),
                isEditable
            }
        },
        {
            name:  t("USER_ONBOARDING.SUPPORTING_DOCUMENTS"),
            iconType: 'Ionicons',
            iconName: 'ios-documents',
            visble: true,
            completed: data?.value?.documents?.length ? true : false,
            key: NavKeys.ADMIN.USER_ONBOARDING_SUPPORTING_DOCS_LIST,
            params: {
                user_id: data?.value?._id ?? undefined,
                folder: `${data.value._id}_${data.value.user_mobile_no}`,
                isEditable
            }
        },
        {
            name:  t("USER_ONBOARDING.SUBMIT_FOR_VERIFICATION"),
            iconType: 'Ionicons',
            iconName: 'checkmark-done-circle-sharp',
            visble: !isOnboardCompleted,
            completed: !isEditable,
            key: "ON_SUBMIT",
            params: {}
        }
    ]

    // ### On Mount
    const isFocused = useIsFocused()
    useFocusEffect(
        React.useCallback(() => {
            getOnBoardingStatusByUserId()
            return () => null;
        }, [route?.params, isFocused])
    )

    const getOnBoardingStatusByUserId = async () => {
        if (!data.isLoading && user_id) {
            setData({ ...data, isLoading: true })
            await setTimeout(() => null, 1000)
            PPUserAPIs.getOnBoardingStatusByUserId({ params: { _id: user_id } })
                .then((res: any) => {
                    setData({ value: res.data, isLoading: false })
                }).catch(({ message }: any) => {
                    setData({ ...data, isLoading: false })
                    setSnack({ message, type: 'ERROR' })
                })
        }
    }

    const submitForVerification = (key: string) => {
        if (!isKeyLoading && isEditable) {
            updateStatus({
                loadingKey: key,
                status: "VERIFIER_ALLOCATION",
                body: { user_is_profile_updated: true },
                CB: () => setSnack({ message: "Application successfully submitted for verification", type: 'SUCCESS' })
            })
        } else {
            setSnack({ message: "Already your profile submitted", type: 'ERROR' })
        }
    }

    const onPress = ({ name, index, key, params }: any) => {
        const isPreviousStageCompleted = (index === 0 || list[index - 1]?.completed)
        if (isPreviousStageCompleted) {
            if (key == "ON_SUBMIT") submitForVerification(name)
            else NavServiceUtils.navigate(key, params)
        } else if (!isPreviousStageCompleted) {
            setSnack({ message: "Kindly complete the above process one by one", type: 'ERROR' })
        } else {
            setSnack({ message: "Something went wrong", type: 'ERROR' })
        }
    }

    const renderItem = ({ item: { name, key, iconType, iconName, params, visble, completed }, index }: any) => {
        return (
            visble &&
            <TouchableOpacity
                onPress={() => onPress({ name, index, key, params })}
                style={styles.listConatiner}
                activeOpacity={design.OPACITY_AVG}
                key={index}
            >
                {iconType && iconName && <Icon type={iconType} name={iconName} size={20} color={colors.P_TEXT} />}
                <Text style={[design.GENERIC_TEXT_TITLE_P, { marginLeft: ws(15) }]}>{name}</Text>
                <View style={{ flex: 1 }} />
                {name == isKeyLoading ? <ActivityIndicator color={colors.RED} />
                    : completed ?
                        <Icon type={'MaterialCommunityIcons'} name={'check-decagram'} size={20} color={colors.GREEN} />
                        :
                        <Icon type={'Entypo'} name={'chevron-right'} size={20} color={colors.P_TEXT} />
                }
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.S_BG }}>
            <View style={styles.headerContainer}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={styles.title}>{t("USER_ONBOARDING.TITLE")}</Text>
                    <Text style={styles.subTitle}>{t("USER_ONBOARDING.SUB_TITLE")}
                    </Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image
                        source={
                            data?.value?.user_image ?
                                { uri: appConfig.apiConnections.s3 + '/' + data?.value?.user_image }
                                :
                                Images.ImageProfileHolder
                        }
                        style={design.GENERIC_IMAGE}
                    />
                </View>
            </View>
            <ScrollView
                onRefresh={getOnBoardingStatusByUserId}
                refreshing={false}
                style={design.GENERIC_SCREEN_S} contentContainerStyle={{ flexGrow: 1 }}
            >
                {data?.isLoading ? <Loader style={{ height: hp('80%'), backgroundColor: 'transparent' }} /> :
                    <>
                        {onBoardStatus ?
                            <Text onPress={() => setIsStatusPopUpVisible(true)} style={styles.statusLabel}>{`Current status: `}
                                <Text style={{ color: colors.P_TEXT }}>
                                    {toLowerAndFirstcapAndReplace(onBoardStatus, '_', ' ')}
                                </Text>
                            </Text>
                            : null}
                        <FlatList
                            data={list}
                            renderItem={renderItem}
                        />
                    </>
                }
            </ScrollView>

            {!data?.isLoading && grant["onboarding-user:verification"] && (onBoardStatus == "VERIFIER_ALLOCATION" || onBoardStatus == "VERIFICATION" || onBoardStatus == "CLARIFICATION_WITH_VERIFICATION_TEAM") ?
                // Only for verification team /  VERIFICATION
                <View style={{ backgroundColor: colors.P_BG }}>
                    <Text style={[styles.statusLabel, { alignSelf: 'flex-start' }]}>{`FOR VERIFICATION TEAM ONLY`}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginBottom: hs(40), marginTop: hs(20) }}>
                        {onBoardStatus == "VERIFIER_ALLOCATION" ?
                            <Button
                                label={'Start verification'}
                                isLoading={isKeyLoading == 'start-verification'}
                                onPress={() =>
                                    updateStatus({ status: "VERIFICATION", body: { user_kyc_verified_by: loggedInUserId }, loadingKey: 'start-verification' })
                                }
                                style={{ width: "40%", backgroundColor: colors.GREEN }}
                            />
                            : verifierUserId == loggedInUserId && (onBoardStatus == "VERIFICATION" || onBoardStatus == "CLARIFICATION_WITH_VERIFICATION_TEAM") ?
                                <>
                                    <Button
                                        label={'Approve'}
                                        isLoading={isKeyLoading == 'Approve'}
                                        onPress={() =>
                                            updateStatus({ status: "ACTIVATOR_ALLOCATION", body: { user_is_kyc_verified: true, user_kyc_verified_by: loggedInUserId, user_is_kyc_verified_at: moment(), }, loadingKey: 'Approve' })
                                        }
                                        style={{ width: "40%", backgroundColor: colors.GREEN }}
                                    />
                                    <Button
                                        label={'Reject'}
                                        isLoading={isKeyLoading == 'Reject'}
                                        onPress={() => updateStatus({ status: "CLARIFICATION", body: { user_is_kyc_verified: false, user_kyc_verified_by: loggedInUserId, user_is_kyc_verified_at: moment(), }, loadingKey: 'Reject' })}
                                        style={{ width: "40%", backgroundColor: colors.RED }}
                                    />
                                </>
                                : null}
                    </View>
                </View>
                : !data?.isLoading && grant["onboarding-user:activation"] && (onBoardStatus == "ACTIVATOR_ALLOCATION" || onBoardStatus == "ACTIVATION") ?
                    // Only for activation team /  ACTIVATION
                    <View style={{ backgroundColor: colors.P_BG }}>
                        <Text style={[styles.statusLabel, { alignSelf: 'flex-start' }]}>{`FOR ACTIVATION TEAM ONLY`}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginBottom: hs(40), marginTop: hs(20) }}>
                            {onBoardStatus == "ACTIVATOR_ALLOCATION" ?
                                <Button
                                    label={'Start activation'}
                                    isLoading={isKeyLoading == 'start-activation'}
                                    onPress={() =>
                                        updateStatus({ status: "ACTIVATION", body: { user_account_verified_by: loggedInUserId }, loadingKey: 'start-activation' })
                                    }
                                    style={{ width: "40%", backgroundColor: colors.GREEN }}
                                />
                                : activatorUserId == loggedInUserId && (onBoardStatus == "ACTIVATION") ?
                                    <>
                                        <Button
                                            label={'Approve'}
                                            isLoading={isKeyLoading == 'Approve'}
                                            onPress={() =>
                                                updateStatus({ status: "COMPLETED", body: { user_is_account_verified: true, user_account_verified_by: loggedInUserId, user_is_account_verified_at: moment(), activateWallet: true }, loadingKey: 'Approve' })
                                            }
                                            style={{ width: "40%", backgroundColor: colors.GREEN }}
                                        />
                                        <Button
                                            label={'Reject'}
                                            isLoading={isKeyLoading == 'Reject'}
                                            onPress={() => updateStatus({ status: "CLARIFICATION_WITH_VERIFICATION_TEAM", body: { user_is_account_verified: false, user_account_verified_by: loggedInUserId, user_is_account_verified_at: moment(), }, loadingKey: 'Reject' })}
                                            style={{ width: "40%", backgroundColor: colors.RED }}
                                        />
                                    </>
                                    : null}
                        </View>
                    </View>
                    : null
            }

            {!data?.isLoading && !isStatusPopUpVisible ? null :
                <ModelHalf
                    title={"Account Status"}
                    visible={isStatusPopUpVisible}
                    onRequestClose={() => setIsStatusPopUpVisible(false)}
                >
                    {[{ name: "Created By", key: "user_created" },
                    { name: !data?.value?.user_is_kyc_verified_at ? "Verification In progess by" : !data?.value?.user_is_kyc_verified ? "Verification Rejected by" : "Verified by", key: "user_kyc_verified" },
                    { name: !data?.value?.user_is_account_verified_at ? "Activation In progess by" : !data?.value?.user_is_account_verified ? "Activation Rejected by" : "Activated by", key: "user_account_verified" },
                    ].map((el, i) => {
                        let item = data?.value[el?.key] ?? false
                        if (!item) return null
                        return <UserCard item={{ tag: el.name, ...item }} index={i} key={i} />
                    })}
                </ModelHalf>
            }

        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        height: hs(160),
        width: '100%',
        backgroundColor: colors.P_COLOR,
        justifyContent: 'center',
        paddingTop: design.STATUS_BAR,
        paddingHorizontal: wp('5%'),
        borderBottomLeftRadius: ms(30),
        borderBottomRightRadius: ms(30),
    },
    title: {
        ...design.GENERIC_TEXT_HEADER_AVG_P,
        color: colors.P_TEXT_COLOR,
        marginBottom: hs(10),
    },
    subTitle: {
        ...design.GENERIC_TEXT_CONTENT_S,
        color: colors.S_TEXT_COLOR,
        marginBottom: hs(10),
    },
    statusLabel: {
        ...design.GENERIC_TEXT_CONTENT_S,
        color: colors.S_TEXT,
        marginTop: hs(10),
        fontWeight: '600',
        alignSelf: 'flex-end',
        marginHorizontal: '5%',
    },
    imageContainer: {
        height: hs(100),
        width: hs(100),
        backgroundColor: colors.P_BG,
        overflow: 'hidden',
        borderRadius: 100
    },
    listConatiner: {
        flexDirection: 'row',
        height: hs(45),
        width: '90%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginHorizontal: '5%',
        marginTop: hs(20),
        backgroundColor: colors.WHITE1,
        borderRadius: 6,
        paddingHorizontal: ws(10)
    },
});