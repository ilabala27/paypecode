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
import { Picker } from '@views/components/functional/Picker';
import { t } from 'i18next';


export default ({ route, navigation }: INavigationProps2) => {
    const { user_id, folder, document_id, isEditable } = route?.params
    const { setSnack } = systemTransportor()
    const { adminStore } = adminTransportor()
    const { documentTypes } = adminStore()
    const [isLoading, setIsLoading] = useState(false)
    // Form Flow
    const [formKeys, setFormKeys] = useState([
        "is_active", "docu_user_id", "docu_type", "docu_name", "docu_no",
        "docu_desc", "docu_remark", "docu_media_name", "docu_media_key",
        "docu_media_type", "docu_media_size"
    ])
    const [form, setForm] = useState({
        is_active: true, is_active_error: '',
        is_active_validation: [
            { method: "isBoolean", params: { label: 'Active' } }
        ],
        docu_user_id: user_id, docu_user_id_error: '',
        docu_user_id_validation: [
            { method: "isInt", params: { label: 'User Identifier' } }
        ],
        docu_type: [], docu_type_error: '',
        docu_type_validation: [
            { method: "isReqArray", params: { label: 'Document type' } }
        ],
        docu_name: '', docu_name_error: '',
        docu_name_validation: [
            { method: "isReq", params: { label: 'Document name' } }
        ],
        docu_no: '', docu_no_error: '',
        docu_no_validation: [
            { method: "isReq", params: { label: 'Document Number' } }
        ],
        docu_desc: '', docu_desc_error: '',
        docu_desc_validation: [
            { method: "isString", params: { label: 'Document Description' } }
        ],
        docu_remark: '', docu_remark_error: '',
        docu_remark_validation: [
            { method: "isString", params: { label: 'Document Remark' } }
        ],
        docu_media_name: '', docu_media_name_error: '',
        docu_media_name_validation: [
            { method: "isReq", params: { label: 'Attachment upload' } }
        ],
        docu_media_key: '', docu_media_key_error: '',
        docu_media_key_validation: [
            { method: "isReq", params: { label: 'Media key' } }
        ],
        docu_media_type: '', docu_media_type_error: '',
        docu_media_type_validation: [
            { method: "isReq", params: { label: 'Media type' } }
        ],
        docu_media_size: '', docu_media_size_error: '',
        docu_media_size_validation: [
            { method: "isReq", params: { label: 'Media size' } }
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
    useEffect(() => document_id && getData(document_id), [])

    // Get Data
    const getData = (document_id: string) => {
        if (!isLoading) {
            setIsLoading(true)
            PPUserAPIs.getDocumentById({ params: { _id: document_id } }).then((res: any) => {
                const formWithValue = constructForServer(formKeys, res.data)
                // bank_acco_type
                formWithValue.docu_type = documentTypes.filter((el) => el.name == formWithValue.docu_type)
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
            const params = { _id: document_id }
            const body = constructForServer(formKeys, form)
            body.docu_type = body.docu_type[0]?.name
            body.docu_user_id = parseInt(body.docu_user_id)
            PPUserAPIs.updateDocumentById({ params, body }).then((res: any) => {
                const { _id } = res.data
                setIsSubmitLoading(false)
                setSnack({ message: `${form.docu_name} uploaded successfully`, type: 'SUCCESS' })
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
            body.docu_type = body.docu_type[0]?.name
            body.docu_user_id = parseInt(body.docu_user_id)
            PPUserAPIs.createDocument({ body }).then((res: any) => {
                setIsSubmitLoading(false)
                setSnack({ message: `${form.docu_name} uploaded successfully`, type: 'SUCCESS' })
                NavServiceUtils.goBack()
            }).catch(({ message }: any) => {
                setIsSubmitLoading(false)
                setSnack({ message, type: 'ERROR' })
            })
        }
    }

    const docu_type: any = form?.docu_type[0]
    return (
        <View style={design.GENERIC_SCREEN_P}>
            <MainHeader
                render={[
                    { type: "Icon", iconType: "Entypo", iconName: "chevron-left", onPress: () => NavServiceUtils.goBack() },
                    { type: "Title", title: t("FORM.SUPPORTING_DOCUMENTS.SUPPORTING_DOCUMENTS") },
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
                            _key={"Document Type"}
                            label={t("FORM.SUPPORTING_DOCUMENTS.DOCUMENT_TYPE")}
                            star={true}
                            placeholder={t("FORM.SUPPORTING_DOCUMENTS.DOCUMENT_TYPE_PLACEHOLDER")}
                            options={documentTypes}
                            values={form.docu_type}
                            onAction={({ item, index }) => {
                                setDataToForm('docu_type', canPushNorPop([], item, 'name'), { docu_name: item.name != "OTHER" ? item.name : '' })
                            }}
                            error={form.docu_type_error}
                            closeAfterSelect={true}
                            multi={false}
                            showArrow={true}
                            isEditable={isEditable}
                        />
                        {docu_type?.name == "OTHER" ?
                            <TextInput
                                label={t("FORM.SUPPORTING_DOCUMENTS.DOCUMENT_NAME")}
                                star={true}
                                placeholder={'eg xxxxxxxx'}
                                value={form.docu_name}
                                onChangeText={(text: string) => setDataToForm('docu_name', text)}
                                error={form.docu_name_error}
                                isEditable={isEditable}
                            />
                            : null}
                        <TextInput
                            label={t("FORM.SUPPORTING_DOCUMENTS.DOCUMENT_NUMBER")}
                            star={true}
                            placeholder={'eg xxxxxxxx'}
                            value={form.docu_no}
                            onChangeText={(text: string) => setDataToForm('docu_no', text)}
                            error={form.docu_no_error}
                            isEditable={isEditable}
                        />
                        <TextInput
                            label={t("FORM.SUPPORTING_DOCUMENTS.DOCUMENT_DESCRIPTION")}
                            star={false}
                            placeholder={'eg xxxxxxxxxxxx'}
                            value={form.docu_desc}
                            onChangeText={(text: string) => setDataToForm('docu_desc', text)}
                            error={form.docu_desc_error}
                            isEditable={isEditable}
                        />
                        <TextInput
                            label={t("FORM.SUPPORTING_DOCUMENTS.DOCUMENT_REMARK")}
                            star={false}
                            placeholder={'eg xxxxxxxxxxxx'}
                            value={form.docu_remark}
                            onChangeText={(text: string) => setDataToForm('docu_remark', text)}
                            error={form.docu_remark_error}
                            isEditable={isEditable}
                        />
                        <Picker
                            label={t("FORM.SUPPORTING_DOCUMENTS.PICKER")}
                            star={true}
                            placeholder={`Select ${form?.docu_name != '' ? form?.docu_name : 'file'}`}
                            value={{
                                name: form.docu_media_name,
                                key: form.docu_media_key,
                                type: form.docu_media_type,
                                size: form.docu_media_size
                            }}
                            folder={folder ?? ''}
                            upload={true}
                            onChange={({ name, key, type, size, local, blob }) =>
                                setForm({ ...form, docu_media_name_error: '', docu_media_name: name, docu_media_key: key, docu_media_type: type, docu_media_size: size + '' })
                            }
                            error={form.docu_media_name_error}
                            isEditable={isEditable}
                        />
                    </ScrollView>
                    {isEditable ?
                        <Button
                            label={document_id ? 'Update' : 'Create'}
                            isLoading={isSubmitLoading}
                            onPress={document_id ? onUpdate : onCreate}
                            style={{ marginBottom: hs(40), marginTop: hs(20) }}
                        />
                        : null}
                </KeyboardAvoidingView>
            }
        </View>
    );
};