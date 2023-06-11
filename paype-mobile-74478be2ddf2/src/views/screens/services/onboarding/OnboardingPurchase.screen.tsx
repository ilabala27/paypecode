import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, View, } from 'react-native';

import NavServiceUtils from '@controllers/utils/NavService.utils';
import { MainHeader } from '@views/components/functional/MainHeader';
import { TextInput } from '@views/components/functional/TextInput';
import { Button } from '@views/components/functional/Button';
import { Selection } from '@views/components/functional/Selection';
import { ScrollView } from '@views/components/functional/Scrollview';
import { hs } from '@utilis/designs/measurements.design';
import { constructForServer, validateKey, validateKeys } from '@utilis/methods/validation.method';
import { INavigationProps } from '@utilis/interfaces/navigation.interface';
import design from '@config/design.config';
import { systemTransportor } from '@models/redux/system/system.transportor';
import { onboardingPrice } from '@models/static/service.static';
import ServicesApis from '@models/api/paype/services/services.api';
import { walletTransportor } from '@models/redux/wallet/wallet.transportor';


export default ({ route, navigation }: INavigationProps) => {
    const { systemStore, setSnack } = systemTransportor()
    const { user } = systemStore()
    const { walletStore, setCreditBalanceAndTransaction } = walletTransportor()
    const { crwa_user_id, crwa_id, available_credit } = walletStore()?.creditWalletBalance ?? {}
    const { user_id, user_name, user_mobile_no, user_email, user_image, is_active, user_type, ...rest } = user?.user ?? {}
    const [formKeys, setFormKeys] = useState(["mobile", "package"])
    const [form, setForm] = useState({
        mobile: user_mobile_no, mobile_error: '',
        mobile_validation: [
            { method: "isMobileNo", params: { label: 'Mobile' } }
        ],
        package: [], package_error: '',
        package_validation: [
            { method: "isReqArray", params: { label: 'Package' } }
        ],
    })
    const setDataToForm = (key: string, value: any) => {
        setForm({ ...form, ...validateKey(form, key, value) })
    }
    const [isSubmitLoading, setIsSubmitLoading] = useState(false)

    // Validation
    const validate = () => {
        const { validatedForm, error } = validateKeys(form, formKeys, true)
        if (error) {
            setForm(validatedForm)
            return false
        }
        return true
    }

    // Submit
    const confirmAndPay = () => {
        if (!isSubmitLoading && validate()) {
            setIsSubmitLoading(true)
            const raw = constructForServer(formKeys, form)
            const pack = raw.package[0] ?? {}
            const beforeTax = pack.qty * pack.perPrice
            const sGST = (beforeTax * pack.sGST) / 100
            const cGST = (beforeTax * pack.cGST) / 100
            const GST = (beforeTax * pack.GST) / 100
            const afterTax = beforeTax + GST
            const body = {
                "created_by": user_id,
                "oqtr_id": "__new__",
                "oqtr_user_id": user_id,
                "oqtr_qty": pack.qty,
                "oqtr_per_rate": parseFloat(pack.perPrice + '').toFixed(8),
                "oqtr_total_before_tax": parseFloat(beforeTax + '').toFixed(8),
                "oqtr_sgst_tax": parseFloat(pack.sGST + '').toFixed(8),
                "oqtr_sgst_tax_amount": parseFloat(sGST + '').toFixed(8),
                "oqtr_cgst_tax": parseFloat(pack.cGST + '').toFixed(8),
                "oqtr_cgst_tax_amount": parseFloat(cGST + '').toFixed(8),
                "oqtr_gst_tax": parseFloat(pack.GST + '').toFixed(8),
                "oqtr_gst_tax_amount": parseFloat(GST + '').toFixed(8),
                "oqtr_total_after_tax": parseFloat(afterTax + '').toFixed(8),
                "oqtr_net_payable": parseFloat(afterTax + '').toFixed(8),
                "oqtr_transact_user_id": user_id,
                "oqtr_short_description": "Amount Debited",
                "oqtr_description": `Purchased ${pack.qty} onboarding accounts`,
            }

            Alert.alert(
                "Confirm",
                `Are you sure you want to process payment of ${parseFloat(body.oqtr_net_payable).toFixed(2)} Rs ?`,
                [
                    { text: "Sure", onPress: () => doPay(body) },
                    { text: "Cancel", onPress: () => setIsSubmitLoading(false), style: 'cancel' },
                ],
                {
                    onDismiss: () => setIsSubmitLoading(false),
                    cancelable: false
                }
            );

        }
    }

    const doPay = (body: any) => {
        ServicesApis.purchaseOnBoarding({ body }).then((res: any) => {
            setIsSubmitLoading(false)
            setCreditBalanceAndTransaction({ params: { wallet_id: crwa_id, user_id: crwa_user_id } })
            if (res.data) {
                setSnack({ message: "Transaction successful", type: 'SUCCESS' })
            } else {
                setSnack({ message: "Transaction failed", type: 'ERROR' })
            }
            NavServiceUtils.goBack()
        }).catch(({ message }: any) => {
            console.log(message)
            setIsSubmitLoading(false)
            setSnack({ message, type: 'ERROR' })
        })
    }

    return (
        <View style={design.GENERIC_SCREEN_P}>
            <MainHeader
                render={[
                    { type: "Icon", iconType: "Entypo", iconName: "chevron-left", onPress: () => NavServiceUtils.goBack() },
                    { type: "Title", title: "Onboarding Purchase" },
                    { type: "Icon" },
                ]}
            />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView style={[design.GENERIC_CONTAINER_P, { backgroundColor: 'white' }]} >
                    <TextInput
                        iconType={"Entypo"}
                        iconName={"old-mobile"}
                        label={"Enter mobile number"}
                        star={true}
                        placeholder={'eg 9876543210'}
                        value={form.mobile}
                        onChangeText={(text: string) => setDataToForm('mobile', text)}
                        error={form.mobile_error}
                        focusable={true}
                        keyboardType={'numeric'}
                        maxLength={10}
                        editable={false}
                    />
                    <Selection
                        _key={'package'}
                        iconType={"MaterialCommunityIcons"}
                        iconName={"badge-account"}
                        label={"Select Package"}
                        star={true}
                        placeholder={'Pick from options'}
                        options={onboardingPrice.filter((el) => el?.applicableTo.includes(user_type))}
                        values={form.package}
                        onAction={({ item, index }) => setDataToForm('package', [item])}
                        error={form.package_error}
                        closeAfterSelect={true}
                        multi={false}
                        showArrow={true}
                    />
                </ScrollView>
                <Button
                    label='Confirm & Pay'
                    isLoading={isSubmitLoading}
                    onPress={confirmAndPay}
                    style={{ marginBottom: hs(40), marginTop: hs(20) }}
                />
            </KeyboardAvoidingView>
        </View>
    );
};