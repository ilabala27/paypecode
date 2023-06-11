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
import ServicesApis from '@models/api/paype/services/services.api';
import { Picker } from '@views/components/functional/Picker';
import { toLowerCaseAndReplace } from '@utilis/methods/string.method';


export default ({ route, navigation }: INavigationProps2) => {
    const { cate_id } = route?.params
    const isEditable = true
    const { systemStore, setSnack } = systemTransportor()
    const { user } = systemStore()
    const user_id = user?.user?.user_id ?? ''
    const [isLoading, setIsLoading] = useState(false)
    // Form Flow
    const [formKeys, setFormKeys] = useState([
        "is_active", "created_by", "cate_is_visible", "cate_is_coming_soon", "cate_is_new", "cate_is_Popular",
        "cate_priority", "cate_id", "cate_label", "cate_key", "cate_description", "cate_short_description",
        "cate_icon_type", "cate_icon_name", "cate_icon_color", "cate_image"
    ])
    const [form, setForm] = useState({
        cate_id: cate_id ?? '__New__', cate_id_error: '',
        cate_id_validation: [
            { method: "isReq", params: { label: 'Category id' } }
        ],
        created_by: user_id, created_by_error: '',
        created_by_validation: [
            { method: "isReq", params: { label: 'Created by' } }
        ],
        is_active: true, is_active_error: '',
        is_active_validation: [
            { method: "isBoolean", params: { label: 'Is Active' } }
        ],
        cate_is_visible: true, cate_is_visible_error: '',
        cate_is_visible_validation: [
            { method: "isBoolean", params: { label: 'Is Visible' } }
        ],
        cate_is_coming_soon: false, cate_is_coming_soon_error: '',
        cate_is_coming_soon_validation: [
            { method: "isBoolean", params: { label: 'Is Coming soon' } }
        ],
        cate_is_new: false, cate_is_new_error: '',
        cate_is_new_validation: [
            { method: "isBoolean", params: { label: 'Is New' } }
        ],
        cate_is_Popular: false, cate_is_Popular_error: '',
        cate_is_Popular_validation: [
            { method: "isBoolean", params: { label: 'Is Popular' } }
        ],
        cate_priority: 0, cate_priority_error: '',
        cate_priority_validation: [
            { method: "isInt", params: { label: 'Priority' } }
        ],
        cate_label: '', cate_label_error: '',
        cate_label_validation: [
            { method: "isReq", params: { label: 'Category label' } }
        ],
        cate_key: '', cate_key_error: '',
        cate_key_validation: [
            { method: "isString", params: { label: 'Category key' } }
        ],
        cate_description: '', cate_description_error: '',
        cate_description_validation: [
            { method: "isString", params: { label: 'Description' } }
        ],
        cate_short_description: '', cate_short_description_error: '',
        cate_short_description_validation: [
            { method: "isString", params: { label: 'Short description' } }
        ],
        cate_is_image: true, cate_is_image_error: '',
        cate_is_image_validation: [
            { method: "isBoolean", params: { label: 'Image / Icon' } }
        ],
        cate_icon_type: '', cate_icon_type_error: '',
        cate_icon_type_validation: [
            { method: "isString", params: { label: 'Icon type' } }
        ],
        cate_icon_name: '', cate_icon_name_error: '',
        cate_icon_name_validation: [
            { method: "isString", params: { label: 'Icon name' } }
        ],
        cate_icon_color: '', cate_icon_color_error: '',
        cate_icon_color_validation: [
            { method: "isString", params: { label: 'Icon color' } }
        ],
        cate_image: '', cate_image_error: '', cate_image_local: '',
        cate_image_validation: [
            { method: "isString", params: { label: 'Image' } }
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
    useEffect(() => cate_id && getData(cate_id), [])

    // Get Data
    const getData = (business_id: string) => {
        if (!isLoading) {
            setIsLoading(true)
            ServicesApis.getCategoryById({ params: { cate_id } }).then((res: any) => {
                const formWithValue = constructForServer(formKeys, res.data)
                formWithValue.cate_is_image = formWithValue.cate_image ? true : false
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
            const params = { cate_id, user_id }
            const body = constructForServer(formKeys, form)
            body.cate_key = toLowerCaseAndReplace(body.cate_label, ' ', '-')
            ServicesApis.updateServiceCategory({ params, body }).then((res: any) => {
                setIsSubmitLoading(false)
                setSnack({ message: "Category updated successfully", type: 'SUCCESS' })
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
            body.cate_key = toLowerCaseAndReplace(body.cate_label, ' ', '-')
            ServicesApis.createServiceCategory({ body }).then((res: any) => {
                setIsSubmitLoading(false)
                setSnack({ message: "Category created successfully", type: 'SUCCESS' })
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
                    { type: "Title", title: "Category Form" },
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
                            <Switch
                                label={"Is Visible"}
                                value={form.cate_is_visible}
                                onValueChange={(value: any) => setForm({ ...form, cate_is_visible: value })}
                                container={{ width: "50%" }}
                                isEditable={isEditable}
                            />
                        </View>
                        <TextInput
                            label={"Enter category label"}
                            star={true}
                            placeholder={'eg xxxx xxxx'}
                            value={form.cate_label}
                            onChangeText={(text: string) => setDataToForm('cate_label', text)}
                            error={form.cate_label_error}
                            isEditable={isEditable}
                        />
                        <TextInput
                            label={"Enter description"}
                            star={false}
                            placeholder={'eg xxxx xxxx'}
                            value={form.cate_description}
                            onChangeText={(text: string) => setDataToForm('cate_description', text)}
                            error={form.cate_description_error}
                            isEditable={isEditable}
                        />
                        <TextInput
                            label={"Enter short description"}
                            star={false}
                            placeholder={'eg xxxx xxxx'}
                            value={form.cate_short_description}
                            onChangeText={(text: string) => setDataToForm('cate_short_description', text)}
                            error={form.cate_short_description_error}
                            isEditable={isEditable}
                        />
                        <View style={{ flexDirection: 'row' }}>
                            <Switch
                                label={"Is Coming soon"}
                                value={form.cate_is_coming_soon}
                                onValueChange={(value: any) => setForm({ ...form, cate_is_coming_soon: value })}
                                container={{ width: "50%" }}
                                isEditable={isEditable}
                            />
                            <Switch
                                label={"Is New"}
                                value={form.cate_is_new}
                                onValueChange={(value: any) => setForm({ ...form, cate_is_new: value })}
                                container={{ width: "50%" }}
                                isEditable={isEditable}
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Switch
                                label={"Is Popular"}
                                value={form.cate_is_Popular}
                                onValueChange={(value: any) => setForm({ ...form, cate_is_Popular: value })}
                                container={{ width: "50%" }}
                                isEditable={isEditable}
                            />
                            <Switch
                                label={"Is Image / Icon"}
                                value={form.cate_is_image}
                                onValueChange={(value: any) =>
                                    setForm({
                                        ...form, cate_is_image: value,
                                        cate_image: '', cate_image_local: '',
                                        cate_icon_type: '', cate_icon_name: '', cate_icon_color: ''
                                    })}
                                container={{ width: "50%" }}
                                isEditable={isEditable}
                            />
                        </View>
                        {form.cate_is_image ?
                            <Picker
                                label={"Upload document"}
                                star={true}
                                placeholder={`Select profile`}
                                value={{
                                    local: form.cate_image_local,
                                    key: form.cate_image,
                                }}
                                folder={'categories'}
                                upload={true}
                                profile={true}
                                pickType={'image'}
                                onChange={({ name, key, type, size, local, blob }) =>
                                    setForm({ ...form, cate_image: key, cate_image_error: '', cate_image_local: local, })
                                }
                                error={form.cate_image_error}
                                isEditable={isEditable}
                            />
                            :
                            <>
                                <TextInput
                                    label={"Enter icon type"}
                                    star={true}
                                    placeholder={'eg xxxx xxxx'}
                                    value={form.cate_icon_type}
                                    onChangeText={(text: string) => setDataToForm('cate_icon_type', text)}
                                    error={form.cate_icon_type_error}
                                    isEditable={isEditable}
                                />
                                <TextInput
                                    label={"Enter icon name"}
                                    star={true}
                                    placeholder={'eg xxxx xxxx'}
                                    value={form.cate_icon_name}
                                    onChangeText={(text: string) => setDataToForm('cate_icon_name', text)}
                                    error={form.cate_icon_name_error}
                                    isEditable={isEditable}
                                />
                                <TextInput
                                    label={"Enter icon color"}
                                    star={true}
                                    placeholder={'eg xxxx xxxx'}
                                    value={form.cate_icon_color}
                                    onChangeText={(text: string) => setDataToForm('cate_icon_color', text)}
                                    error={form.cate_icon_color_error}
                                    isEditable={isEditable}
                                />
                            </>
                        }
                    </ScrollView>
                    {isEditable ?
                        <Button
                            label={cate_id ? 'Update' : 'Create'}
                            isLoading={isSubmitLoading}
                            onPress={cate_id ? onUpdate : onCreate}
                            style={{ marginBottom: hs(40), marginTop: hs(20) }}
                        />
                        : null}
                </KeyboardAvoidingView>
            }
        </View>
    );
};