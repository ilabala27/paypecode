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
import { hs, wp, ws } from '@utilis/designs/measurements.design';
import { constructForServer, validateKey, validateKeys } from '@utilis/methods/validation.method';
import { INavigationProps2 } from '@utilis/interfaces/navigation.interface';
import { canPushNorPop } from '@utilis/methods/array.method';
import design from '@config/design.config';
import { t } from 'i18next';


export default ({ route, navigation }: INavigationProps2) => {
    const { user_id, business_id, createCallBack, isEditable } = route?.params
    const { systemStore, setSnack } = systemTransportor()
    const { user } = systemStore()
    const { adminStore } = adminTransportor()
    const { roles, userTypes } = adminStore()
    const [isLoading, setIsLoading] = useState(false)
    // Form Flow
    const [formKeys, setFormKeys] = useState([
        "is_active", "busi_user_id", "busi_name", "busi_email",
        "busi_telephone_no", "busi_msme", "busi_ssai"
    ])
    const [form, setForm] = useState({
        is_active: true, is_active_error: '',
        is_active_validation: [
            { method: "isBoolean", params: { label: 'Active' } }
        ],
        busi_user_id: user_id, busi_user_id_error: '',
        busi_user_id_validation: [
            { method: "isReq", params: { label: 'User ID' } }
        ],
        busi_name: '', busi_name_error: '',
        busi_name_validation: [
            { method: "isReq", params: { label: 'Busniess Name' } }
        ],
        busi_email: '', busi_email_error: '',
        busi_email_validation: [
            { method: "isString", params: { label: 'Email' } }
        ],
        busi_telephone_no: '', busi_telephone_no_error: '',
        busi_telephone_no_validation: [
            { method: "isString", params: { label: 'Telephone' } }
        ],
        busi_msme: '', busi_msme_error: '',
        busi_msme_validation: [
            { method: "isString", params: { label: 'MSME' } }
        ],
        busi_ssai: '', busi_ssai_error: '',
        busi_ssai_validation: [
            { method: "isString", params: { label: 'FSSAI' } }
        ],
    })
    const [isSubmitLoading, setIsSubmitLoading] = useState(false)
    const setDataToForm = (key: string, value: any) => {
        setForm({ ...form, ...validateKey(form, key, value) })
    }
    const validate = () => {
        const { validatedForm, error } = validateKeys(form, formKeys, true)
        if (error)
            return setForm(validatedForm)
        return true
    }

    // On Mount
    useEffect(() => business_id && getData(business_id), [])

    // Get Data
    const getData = (business_id: string) => {
        if (!isLoading) {
            setIsLoading(true)
            PPUserAPIs.getBusniessById({ params: { _id: business_id } }).then((res: any) => {
                const formWithValue = constructForServer(formKeys, res.data)
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
            const params = { _id: business_id }
            const body = constructForServer(formKeys, form)
            PPUserAPIs.updateBusniessById({ params, body }).then((res: any) => {
                const { _id } = res.data
                setIsSubmitLoading(false)
                setSnack({ message: "Busniess profile updated successfully", type: 'SUCCESS' })
                NavServiceUtils.goBack()
            }).catch(({ message }: any) => {
                setIsSubmitLoading(false)
                setSnack({ message, type: 'ERROR' })
            })
        }
    }

    // Submit Data
    const onCreate = () => {
        if (!isSubmitLoading && validate()) {
            setIsSubmitLoading(true)
            const body = constructForServer(formKeys, form)
            PPUserAPIs.createBusniess({ body }).then((res: any) => {
                const { _id } = res.data
                setIsSubmitLoading(false)
                createCallBack && createCallBack()
                setSnack({ message: "Busniess profile created successfully", type: 'SUCCESS' })
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
                    { type: "Title", title:t("FORM.BUSINESS_DETAILS.BUSINESS_DETAILS")},
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
                        <TextInput
                            label={t("FORM.BUSINESS_DETAILS.BUSINESS_NAME")}
                            star={true}
                            placeholder={'eg xxxx xxxx'}
                            value={form.busi_name}
                            onChangeText={(text: string) => setDataToForm('busi_name', text)}
                            error={form.busi_name_error}
                            isEditable={isEditable}
                        />
                        <TextInput
                            label={t("FORM.BUSINESS_DETAILS.BUSINESS_EMAIL")}
                            star={false}
                            placeholder={'eg xxxxx@xxx.com'}
                            value={form.busi_email}
                            onChangeText={(text: string) => setDataToForm('busi_email', text)}
                            error={form.busi_email_error}
                            isEditable={isEditable}
                        />
                        <TextInput
                            label={t("FORM.BUSINESS_DETAILS.TELEPHONE_NO")}
                            star={false}
                            placeholder={'eg xxx-xxxxxx'}
                            value={form.busi_telephone_no}
                            onChangeText={(text: string) => setDataToForm('busi_telephone_no', text)}
                            error={form.busi_telephone_no_error}
                            isEditable={isEditable}
                        />
                        <TextInput
                            label={t("FORM.BUSINESS_DETAILS.MSME")}
                            star={false}
                            placeholder={'eg xxxx-xxxx-xxxx'}
                            value={form.busi_msme}
                            onChangeText={(text: string) => setDataToForm('busi_msme', text)}
                            error={form.busi_msme_error}
                            isEditable={isEditable}
                        />
                        <TextInput
                            label={t("FORM.BUSINESS_DETAILS.FSSAI_OR_GST")}
                            star={false}
                            placeholder={'eg xxxx-xxxx-xxxx'}
                            value={form.busi_ssai}
                            onChangeText={(text: string) => setDataToForm('busi_ssai', text)}
                            error={form.busi_ssai_error}
                            isEditable={isEditable}
                        />
                    </ScrollView>
                    {isEditable ?
                        <Button
                            label={business_id ? 'Update' : 'Create'}
                            isLoading={isSubmitLoading}
                            onPress={business_id ? onUpdate : onCreate}
                            style={{ marginBottom: hs(40), marginTop: hs(20) }}
                        />
                        : null}
                </KeyboardAvoidingView>
            }
        </View>
    );
};