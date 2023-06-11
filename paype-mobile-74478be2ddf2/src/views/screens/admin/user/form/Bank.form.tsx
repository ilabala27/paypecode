import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, View, } from 'react-native';
import { adminTransportor } from '@models/redux/admin/admin.transportor';
import { systemTransportor } from '@models/redux/system/system.transportor';
import PPUserAPIs from '@models/api/paype/user/user.api';
import { MainHeader } from '@views/components/functional/MainHeader';
import { TextInput } from '@views/components/functional/TextInput';
import { Button } from '@views/components/functional/Button';
import { Selection } from '@views/components/functional/Selection';
import { ScrollView } from '@views/components/functional/Scrollview';
import { Switch } from '@views/components/functional/Switch';
import { Loader } from '@views/components/functional/Loader';
import NavServiceUtils from '@controllers/utils/NavService.utils';
import { NavKeys } from '@controllers/utils/NavKeys.utils';
import { hs } from '@utilis/designs/measurements.design';
import { constructForServer, validateKey, validateKeys } from '@utilis/methods/validation.method';
import { INavigationProps2 } from '@utilis/interfaces/navigation.interface';
import { canPushNorPop } from '@utilis/methods/array.method';
import design from '@config/design.config';
import { t } from 'i18next';


export default ({ route, navigation }: INavigationProps2) => {
    const { bank, createCallBack, isEditable } = route?.params
    const { bank_id, ref_name, ref_id } = bank ?? {}
    const { setSnack } = systemTransportor()
    const { adminStore } = adminTransportor()
    const { bankAccountTypes } = adminStore()
    const [isLoading, setIsLoading] = useState(false)
    // Form Flow
    const [formKeys, setFormKeys] = useState([
        "is_active", "bank_acco_type", "bank_acco_name", "bank_acco_branch",
        "bank_acco_ifsc", "bank_acco_account_name", "bank_acco_account_no"
    ])
    const [form, setForm] = useState({
        is_active: true, is_active_error: '',
        is_active_validation: [
            { method: "isBoolean", params: { label: 'Active' } }
        ],
        bank_acco_type: [], bank_acco_type_error: '',
        bank_acco_type_validation: [
            { method: "isReqArray", params: { label: 'Account type' } }
        ],
        bank_acco_account_name: '', bank_acco_account_name_error: '',
        bank_acco_account_name_validation: [
            { method: "isReq", params: { label: 'Account name' } }
        ],
        bank_acco_account_no: '', bank_acco_account_no_error: '',
        bank_acco_account_no_validation: [
            { method: "isReq", params: { label: 'Account number' } }
        ],
        bank_acco_ifsc: '', bank_acco_ifsc_error: '',
        bank_acco_ifsc_validation: [
            { method: "isReq", params: { label: 'Branch IFSC' } }
        ],
        bank_acco_name: '', bank_acco_name_error: '',
        bank_acco_name_validation: [
            { method: "isReq", params: { label: 'Bank name' } }
        ],
        bank_acco_branch: '', bank_acco_branch_error: '',
        bank_acco_branch_validation: [
            { method: "isReq", params: { label: 'Bank branch' } }
        ],

    })
    const [isSubmitLoading, setIsSubmitLoading] = useState(false)
    const setDataToForm = (key: string, value: any, extraData: any = {}) => {
        setForm({ ...form, ...validateKey(form, key, value), ...extraData })
    }
    const validate = () => {
        const { validatedForm, error } = validateKeys(form, formKeys, true)
        if (error)
            return setForm(validatedForm)
        return true
    }

    // On Mount
    useEffect(() => bank_id && getData(bank_id), [])

    // Get Data
    const getData = (bank_id: string) => {
        if (!isLoading) {
            setIsLoading(true)
            PPUserAPIs.getBankById({ params: { _id: bank_id } }).then((res: any) => {
                const formWithValue = constructForServer(formKeys, res.data)
                // bank_acco_type
                formWithValue.bank_acco_type = bankAccountTypes.filter((el) => el.name == formWithValue.bank_acco_type)
                // update
                setForm({ ...form, ...formWithValue })
                setIsLoading(false)
            }).catch(({ message }: any) => {
                setSnack({ message, type: 'ERROR' })
            })
        }
    }

    const onUpdate = () => {
        if (!isSubmitLoading && validate()) {
            setIsSubmitLoading(true)
            const params = { _id: bank_id }
            const body = constructForServer(formKeys, form)
            body.bank_acco_type = body.bank_acco_type[0]?.name
            PPUserAPIs.updateBankById({ params, body }).then((res: any) => {
                const { _id } = res.data
                setIsSubmitLoading(false)
                setSnack({ message: "Bank account updated successfully", type: 'SUCCESS' })
                NavServiceUtils.goBack()
            }).catch(({ message }: any) => {
                setIsSubmitLoading(false)
                setSnack({ message, type: 'ERROR' })
            })
        }
    }

    // Submit Data
    const onCreate = () => {
        if (!isSubmitLoading && ref_name && ref_id && validate()) {
            setIsSubmitLoading(true)
            const body = constructForServer(formKeys, form)
            body.bank_acco_type = body.bank_acco_type[0]?.name
            body.bank_acco_ref = ref_name
            body.bank_acco_ref_id = ref_id
            PPUserAPIs.createBank({ body }).then((res: any) => {
                const { _id } = res.data
                createCallBack && createCallBack()
                setIsSubmitLoading(false)
                setSnack({ message: "Bank account created successfully", type: 'SUCCESS' })
                NavServiceUtils.goBack()
            }).catch(({ message }: any) => {
                setIsSubmitLoading(false)
                setSnack({ message, type: 'ERROR' })
            })
        }
    }

    return (
        <View style={design.GENERIC_SCREEN_P}>
            <MainHeader
                render={[
                    { type: "Icon", iconType: "Entypo", iconName: "chevron-left", onPress: () => NavServiceUtils.goBack() },
                    { type: "Title", title: t("FORM.BANK_DETAILS.BANK_DETAILS") },
                    { type: "Icon" },
                ]}
            />
            {isLoading ? <Loader /> :
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: 'white' }}>
                    <ScrollView style={[design.GENERIC_CONTAINER_P, { backgroundColor: 'white' }]} >
                        <View style={{ flexDirection: 'row' }}>
                            <Switch
                                label={"Is Active"}
                                value={form.is_active}
                                onValueChange={(value: any) => setForm({ ...form, is_active: value })}
                                container={{ width: "50%" }}
                                isEditable={isEditable}
                            />
                        </View>
                        <Selection
                            _key={"bank_acco_type"}
                            label={t("FORM.BANK_DETAILS.ACCOUNT_TYPE")}
                            star={true}
                            placeholder={t("FORM.BANK_DETAILS.ACCOUNT_TYPE_PLACEHOLDER")}
                            options={bankAccountTypes}
                            values={form.bank_acco_type}
                            onAction={({ item, index }) => setDataToForm('bank_acco_type', canPushNorPop([], item, 'name'))}
                            error={form.bank_acco_type_error}
                            closeAfterSelect={true}
                            multi={false}
                            showArrow={true}
                            isEditable={isEditable}
                        />
                        <TextInput
                            label={t("FORM.BANK_DETAILS.ACCOUNT_NAME")}
                            star={true}
                            placeholder={'eg xxxxxxxx'}
                            value={form.bank_acco_account_name}
                            onChangeText={(text: string) => setDataToForm('bank_acco_account_name', text)}
                            error={form.bank_acco_account_name_error}
                        />
                        <TextInput
                            label={t("FORM.BANK_DETAILS.ACCOUNT_NUMBER")}
                            star={true}
                            placeholder={'eg xxxxxxxx'}
                            value={form.bank_acco_account_no}
                            onChangeText={(text: string) => setDataToForm('bank_acco_account_no', text)}
                            error={form.bank_acco_account_no_error}
                            isEditable={isEditable}
                        />
                        <TextInput
                            label={t("FORM.BANK_DETAILS.IFSC_NUMBER")}
                            star={true}
                            placeholder={'eg xxxxxx'}
                            value={form.bank_acco_ifsc}
                            onChangeText={(text: string) => setDataToForm('bank_acco_ifsc', text)}
                            error={form.bank_acco_ifsc_error}
                            isEditable={isEditable}
                        />
                        <TextInput
                            label={t("FORM.BANK_DETAILS.BANK_NAME")}
                            star={true}
                            placeholder={'eg xxxxxx xxxx'}
                            value={form.bank_acco_name}
                            onChangeText={(text: string) => setDataToForm('bank_acco_name', text)}
                            error={form.bank_acco_name_error}
                            isEditable={isEditable}
                        />
                        <TextInput
                            label={t("FORM.BANK_DETAILS.BRANCH_NAME")}
                            star={true}
                            placeholder={'eg xxxxxxx'}
                            value={form.bank_acco_branch}
                            onChangeText={(text: string) => setDataToForm('bank_acco_branch', text)}
                            error={form.bank_acco_branch_error}
                            isEditable={isEditable}
                        />
                    </ScrollView>
                    {isEditable ?
                        <Button
                            label={bank_id ? 'Update' : 'Create'}
                            isLoading={isSubmitLoading}
                            onPress={bank_id ? onUpdate : onCreate}
                            style={{ marginBottom: hs(40), marginTop: hs(20) }}
                        />
                        : null}
                </KeyboardAvoidingView>
            }
        </View>
    );
};