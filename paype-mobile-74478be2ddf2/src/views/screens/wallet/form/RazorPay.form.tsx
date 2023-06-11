import React, { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, View, } from 'react-native';
import { systemTransportor } from '@models/redux/system/system.transportor';
import { MainHeader } from '@views/components/functional/MainHeader';
import { TextInput } from '@views/components/functional/TextInput';
import { Button } from '@views/components/functional/Button';
import { ScrollView } from '@views/components/functional/Scrollview';
import { Loader } from '@views/components/functional/Loader';
import NavServiceUtils from '@controllers/utils/NavService.utils';
import { NavKeys } from '@controllers/utils/NavKeys.utils';
import { hs, ms, wp, ws } from '@utilis/designs/measurements.design';
import { constructForServer, validateKey, validateKeys } from '@utilis/methods/validation.method';
import { INavigationProps2 } from '@utilis/interfaces/navigation.interface';
import design from '@config/design.config';
import colors from '@config/colors.config';
import fontsConfig from '@config/fonts.config';
import CreditWalletApis from '@models/api/paype/wallet/creditWallet.api';
import moment from 'moment';
import { walletTransportor } from '@models/redux/wallet/wallet.transportor';
import { amountInWords, encryptWithFormat } from '@utilis/methods/string.method';
import { UserCardFromAPI } from '@views/components/designs/UserCardFromAPI';
import RazorpayCheckout from 'react-native-razorpay';
import appConfig from '@config/app.config';


export default ({ route, navigation }: INavigationProps2) => {
    const { _id } = route?.params ?? {}
    const isEditable = !_id
    const { systemStore, setSnack } = systemTransportor()
    const { user, RBAC } = systemStore()
    const { user_id, user_session_id, user_email, user_mobile_no, user_name } = user?.user ?? {}
    const { walletStore, transactRazorPay } = walletTransportor()
    const { creditWalletBalance } = walletStore()
    const { crwa_id } = creditWalletBalance
    const [isLoading, setIsLoading] = useState(false)
    // Form Flow
    const [formKeys, setFormKeys] = useState([
        "rapa_transacted_user_id", "rapa_session_id", "rapa_user_id", "rapa_user_wallet_id", "rapa_status", "rapa_short_description",
        "rapa_description", "rapa_id", "rapa_ref_no", "rapa_transaction_amount", "rapa_remark",
    ])
    const [form, setForm] = useState({
        rapa_session_id: user_session_id, rapa_session_id_error: '',
        rapa_session_id_validation: [
            { method: "isReq", params: { label: 'Session id' } }
        ],
        rapa_status: "PROCESSING", rapa_status_error: '',
        rapa_status_validation: [
            { method: "isReq", params: { label: 'Transaction status' } }
        ],
        rapa_id: '', rapa_id_error: '',
        rapa_id_validation: [
            { method: "isString", params: { label: 'Razor pay id' } }
        ],
        rapa_transacted_user_id: user_id, rapa_transacted_user_id_error: '',
        rapa_transacted_user_id_validation: [
            { method: "isReq", params: { label: 'Transaction user id' } }
        ],
        rapa_user_id: user_id, rapa_user_id_error: '',
        rapa_user_id_validation: [
            { method: "isReq", params: { label: 'User id' } }
        ],
        rapa_user_wallet_id: crwa_id, rapa_user_wallet_id_error: '',
        rapa_user_wallet_id_validation: [
            { method: "isReq", params: { label: 'Wallet id' } }
        ],
        rapa_short_description: 'Transaction reference no: ', rapa_short_description_error: '',
        rapa_short_description_validation: [
            { method: "isReq", params: { label: 'Summary' } }
        ],
        rapa_description: 'Fund added via Razor pay', rapa_description_error: '',
        rapa_description_validation: [
            { method: "isReq", params: { label: 'Description' } }
        ],
        rapa_ref_no: '', rapa_ref_no_error: '',
        rapa_ref_no_validation: [
            { method: "isString", params: { label: 'Transaction reference no: ' } }
        ],
        rapa_transaction_amount: '', rapa_transaction_amount_error: '',
        rapa_transaction_amount_validation: [
            { method: "isReq", params: { label: 'Amount' } },
            { method: "isAmount", params: { label: 'Amount' } }
        ],
        rapa_remark: '', rapa_remark_error: '',
        rapa_remark_validation: [
            { method: "isString", params: { label: 'Remarks' } }
        ]
    })
    const [isSubmitLoading, setIsSubmitLoading] = useState(false)
    const [isButtonLoadingKey, setIsButtonLoadingKey] = useState('')
    const setDataToForm = (key: string, value: any) => {
        setForm({ ...form, ...validateKey(form, key, value) })
    }
    const validate = () => {
        const { validatedForm, error } = validateKeys(form, formKeys, true)
        if (error)
            return setForm(validatedForm)
        return true
    }

    const transactConfirm = () => Alert.alert(
        `Razor pay`,
        `Are you sure you want to proceed ?`,
        [
            { text: "Cancel", onPress: () => null, style: 'cancel' },
            { text: "Yes", onPress: () => onCreate() },
        ],
        {
            cancelable: true
        }
    );

    const onCreate = () => {
        if (!isSubmitLoading && validate()) {
            setIsSubmitLoading(true)
            const body = constructForServer(formKeys, form)
            body.rapa_transaction_amount = parseFloat(body.rapa_transaction_amount).toFixed(2)
            if (parseInt(body.rapa_transaction_amount) < 100) {
                setIsSubmitLoading(false)
                return setSnack({ message: 'Minimum transaction value is 100', type: 'ERROR' })
            }

            CreditWalletApis.createRazorPay({ body }).then((res: any) => {
                initRazorPay(res.data)
            }).catch(({ message }: any) => {
                setIsSubmitLoading(false)
                setSnack({ message, type: 'ERROR' })
            })
        }
    }

    const initRazorPay = (data: any) => {
        const options = {
            description: `Fund added to credit wallett by ${user_name} ( ${user_mobile_no} )`,
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: 'rzp_test_s2GGMPJZrCZeTY',
            amount: parseFloat(data.rapa_transaction_amount) * parseFloat('100') + '',
            name: appConfig.company,
            prefill: {
                email: user_email,
                contact: user_mobile_no,
                name: user_name
            },
            theme: { color: colors.P_COLOR }
        }
        RazorpayCheckout.open(options).then((res: any) => {
            if (res?.razorpay_payment_id) {
                return updateTransaction("COMPLETED", data?.rapa_id, res?.razorpay_payment_id)
            }
            return updateTransaction("FAILED", data?.rapa_id, JSON.stringify(res))
        }).catch((error: any) => {
            return updateTransaction("FAILED", data?.rapa_id, JSON.stringify(error))
        });
    }

    const updateTransaction = (rapa_status: string, rapa_id: string, data: any) => {
        const body = { rapa_status, rapa_ref_no: data }
        const razorPayData = {
            rapa_user_id: user_id,
            rapa_id,
            rapa_status: rapa_status,
            rapa_ref_no: data
        }
        const hash = encryptWithFormat(razorPayData)
        const payload = {
            params: razorPayData,
            body: hash,
            extraData: {
                user_id
            }
        }
        transactRazorPay(payload)
    }

    return (
        <View style={design.GENERIC_SCREEN_P}>
            <MainHeader
                render={[
                    { type: "Icon", iconType: "Entypo", iconName: "chevron-left", onPress: () => NavServiceUtils.goBack() },
                    { type: "Title", title: "Razor pay" },
                    !isEditable ? { type: "Icon" } :
                        { type: "Icon", iconType: "FontAwesome", iconName: "history", onPress: () => NavServiceUtils.navigate(NavKeys.WALLET.RAZOR_PAY_FORM) },
                ]}
            />
            {isLoading ? <Loader /> :
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: 'white' }}>
                    <ScrollView style={[design.GENERIC_CONTAINER_P, { backgroundColor: 'white' }]} >
                        <UserCardFromAPI userId={form.rapa_user_id} />
                        <TextInput
                            label={"Enter transaction amount"}
                            star={true}
                            placeholder={'eg 1000.00'}
                            value={form.rapa_transaction_amount}
                            onChangeText={(text: string) => setDataToForm('rapa_transaction_amount', text)}
                            error={form.rapa_transaction_amount_error}
                            isEditable={isEditable}
                            info={`${amountInWords(parseInt(form.rapa_transaction_amount))} ${parseInt(form.rapa_transaction_amount) == 1 ? 'Rupee' : 'Rupees'} Only`}
                        />
                        <TextInput
                            label={"Enter remarks"}
                            star={false}
                            placeholder={'eg xxxxxxxxxxxx'}
                            value={form.rapa_remark}
                            onChangeText={(text: string) => setDataToForm('rapa_remark', text)}
                            error={form.rapa_remark_error}
                            isEditable={isEditable}
                        />
                    </ScrollView>
                    {isEditable ?
                        <View style={styles.submitContainer}>
                            <Button
                                label={'Proceed'}
                                isLoading={isSubmitLoading}
                                onPress={transactConfirm}
                            />
                        </View>
                        : null}
                </KeyboardAvoidingView>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: colors.P_BG,
        borderRadius: 6,
        marginVertical: hs(4),
        overflow: 'hidden',
        paddingVertical: hs(8),
        paddingHorizontal: ws(10)
    },
    labelText: {
        fontSize: ms(12),
        fontFamily: fontsConfig.SemiBold,
        color: colors.S_TEXT_COLOR,
    },
    submitContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: hs(32),
        marginTop: hs(16)
    }
})