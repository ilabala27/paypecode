import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, View, Text, StyleSheet, Image } from 'react-native';
import NavServiceUtils from '@controllers/utils/NavService.utils';
import { NavKeys } from '@controllers/utils/NavKeys.utils';
import { MainHeader } from '@views/components/functional/MainHeader';
import { ScrollView } from '@views/components/functional/Scrollview';
import { hs, ws } from '@utilis/designs/measurements.design';
import { INavigationProps } from '@utilis/interfaces/navigation.interface';
import design from '@config/design.config';
import { systemTransportor } from '@models/redux/system/system.transportor';
import colors from '@config/colors.config';
import appConfig from '@config/app.config';
import { useTranslation } from 'react-i18next';


export default ({ route, navigation }: INavigationProps) => {
    const { t } = useTranslation();
    const { systemStore, setUSerInfoById } = systemTransportor()
    const { user: userAndAws, userAddress, userBusiness, userBusinessAddress, userBankDetails, userSupportingDocs } = systemStore()
    const { user }: any = userAndAws ?? {}
    const [data, setData] = useState<any>({
        value: '',
        isLoading: false
    })

    useEffect(() => {
        setUSerInfoById({ params: { _id: user?._id ?? 0 } })
    }, [])


    return (
        <View style={design.GENERIC_SCREEN_P}>
            <MainHeader
                render={[
                    { type: "Icon", iconType: "Entypo", iconName: "chevron-left", onPress: () => NavServiceUtils.goBack() },
                    { type: "Title", title: t("USER_DETAILS.USER_DETAILS") },
                    { type: "Icon", iconType: 'FontAwesome', iconName: 'bell-o', onPress: () => NavServiceUtils.navigate(NavKeys.PROFILE.NOTIFICATIONS) },
                ]}
            />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView style={[design.GENERIC_CONTAINER_P, { backgroundColor: 'white' }]} >
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: appConfig.apiConnections.s3 + '/' + user?.user_image }}
                            style={design.GENERIC_IMAGE}
                        />
                    </View>

                    <View style={styles.Container}>
                        <View>
                            <Text style={styles.Containertitle}>
                                {t("USER_DETAILS.USER_INFO.USERINFO")}
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                {t("USER_DETAILS.USER_INFO.USERID")}
                            </Text>
                            <Text style={styles.text}>
                                {user?.user_id ?? t("USER_DETAILS.NA")}
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                {t("USER_DETAILS.USER_INFO.EMAIL")}
                            </Text>
                            <Text style={styles.text}>
                                {user?.user_email ?? t("USER_DETAILS.NA")}
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                {t("USER_DETAILS.USER_INFO.REGISTRATION_STATUS")}
                            </Text>
                            <Text style={styles.text}>
                                {user.user_registration_status ?? t("USER_DETAILS.NA")}
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                {t("USER_DETAILS.USER_INFO.USERROLE")}
                            </Text>
                            <Text style={styles.text}>
                                {user?.user_type ?? t("USER_DETAILS.NA")}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.Container}>
                        <View>
                            <Text style={styles.Containertitle}>
                                {t("USER_DETAILS.ADDRESS_INFO.ADDRESS_INFO")}
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                {t("USER_DETAILS.ADDRESS_INFO.ADDRESS_LINE1")}
                            </Text>
                            <Text style={styles.text}>
                                {userAddress?.addr_line1 ?? t("USER_DETAILS.NA")}
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                {t("USER_DETAILS.ADDRESS_INFO.ADDRESS_LINE2")}
                            </Text>
                            <Text style={styles.text}>
                                {userAddress?.addr_line2 ?? t("USER_DETAILS.NA")}
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                {t("USER_DETAILS.ADDRESS_INFO.LANDMARKK")}
                            </Text>
                            <Text style={styles.text}>
                                {userAddress?.addr_landmark ?? t("USER_DETAILS.NA")}
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                {t("USER_DETAILS.ADDRESS_INFO.PINCODE")}
                            </Text>
                            <Text style={styles.text}>
                                {userAddress?.addr_post_id ?? t("USER_DETAILS.NA")}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.Container}>
                        <View>
                            <Text style={styles.Containertitle}>
                                {t("USER_DETAILS.BUSINESS_INFO.BUSINESS_INFO")}
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                {t("USER_DETAILS.BUSINESS_INFO.BUSINESS_NAME")}
                            </Text>
                            <Text style={styles.text}>
                                {userBusiness?.busi_name ?? t("USER_DETAILS.NA")}
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                {t("USER_DETAILS.BUSINESS_INFO.BUSINESS_MAIL")}
                            </Text>
                            <Text style={styles.text}>
                                {userBusiness?.busi_email ?? t("USER_DETAILS.NA")}
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                {t("USER_DETAILS.BUSINESS_INFO.BUSINESS_ADDRESS")}
                            </Text>
                            <Text style={styles.text}>
                                {userBusinessAddress?.addr_line1 ?? t("USER_DETAILS.NA")}
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                {t("USER_DETAILS.BUSINESS_INFO.BUSINESS_CONTACT")}
                            </Text>
                            <Text style={styles.text}>
                                {userBankDetails?.busi_telephone_no ?? t("USER_DETAILS.NA")}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.Container}>
                        <View>
                            <Text style={styles.Containertitle}>
                                {t("USER_DETAILS.BANK_INFO.BANK_INFO")}
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                {t("USER_DETAILS.BANK_INFO.NAME")}
                            </Text>
                            <Text style={styles.text}>
                                {userBankDetails?.bank_acco_name ?? t("USER_DETAILS.NA")}
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                {t("USER_DETAILS.BANK_INFO.ACCOUNT_NUMBER")}
                            </Text>
                            <Text style={styles.text}>
                                {userBankDetails?.bank_acco_account_no ?? t("USER_DETAILS.NA")}
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                {t("USER_DETAILS.BANK_INFO.NAME_OF_BRANCH")}
                            </Text>
                            <Text style={styles.text}>
                                {userBankDetails?.bank_acco_branch ?? t("USER_DETAILS.NA")}
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                {t("USER_DETAILS.BANK_INFO.BANK_ACCOUNT_TYPE")}
                            </Text>
                            <Text style={styles.text}>
                                {userBankDetails?.bank_acco_type ?? t("USER_DETAILS.NA")}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.Container}>
                        <View>
                            <Text style={styles.Containertitle}>
                                {t("USER_DETAILS.DOCUMENTS_INFO.DOCUMENTS_INFO")}
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                {t("USER_DETAILS.DOCUMENTS_INFO.TYPE_OF_DOCUMENT")}
                            </Text>
                            <Text style={styles.text}>
                                {userSupportingDocs?.docu_type ?? t("USER_DETAILS.NA")}
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                {t("USER_DETAILS.DOCUMENTS_INFO.DOCUMENT_NUMBER")}
                            </Text>
                            <Text style={styles.text}>
                                {userSupportingDocs?.docu_no ?? t("USER_DETAILS.NA")}
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                {t("USER_DETAILS.DOCUMENTS_INFO.SIZE_OF_DOCUMENT")}
                            </Text>
                            <Text style={styles.text}>
                                {userSupportingDocs?.docu_media_size ?? t("USER_DETAILS.NA")}
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                {t("USER_DETAILS.DOCUMENTS_INFO.DOCUMENT_FORMAT")}
                            </Text>
                            <Text style={styles.text}>
                                {userSupportingDocs?.docu_media_type ?? t("USER_DETAILS.NA")}
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    despbox: {
        height: 30,
        width: '100%',
        paddingHorizontal: ws(8),

        flexDirection: 'row'
    },
    Container: {
        backgroundColor: colors.WHITE2,
        borderRadius: hs(16),
        marginVertical: hs(8),
        marginHorizontal: ws(8),
        paddingVertical: hs(16),
        paddingHorizontal: ws(8),
        overflow: 'hidden'
    },
    Containertitle: {
        paddingTop: hs(10),
        paddingLeft: hs(10),
        marginBottom: hs(10),
        fontSize: hs(15),
        color: colors.P_COLOR_DARK,
    },
    desptext: {
        minHeight: hs(30),
        width: '40%',
        marginHorizontal: 10,
        color: colors.T_TEXT_COLOR,
        fontSize: 12,
        //backgroundColor:'yellow',
    },
    text: {
        height: hs(150),
        flex: 1,
        marginHorizontal: 15,
        color: 'black',
        fontSize: 12,
        //backgroundColor:'yellow',
    },
    imageContainer: {
        height: hs(125),
        width: hs(125),
        backgroundColor: colors.S_BG,
        overflow: 'hidden',
        borderRadius: 100,
        alignSelf: 'center',
        marginVertical: hs(16)
    },






});
