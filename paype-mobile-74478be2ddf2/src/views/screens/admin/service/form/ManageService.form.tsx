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
import { servicesTransportor } from '@models/redux/services/services.transportor';


export default ({ route, navigation }: INavigationProps2) => {
    const { serv_id } = route?.params
    const isEditable = true
    const { servicesStore } = servicesTransportor()
    const { servicesWithCategory, navigationKeyOptions } = servicesStore()
    const { systemStore, setSnack } = systemTransportor()
    const { user } = systemStore()
    const user_id = user?.user?.user_id ?? ''
    const [isLoading, setIsLoading] = useState(false)
    // Form Flow
    const categoryOptions: any[] = servicesWithCategory.data.map((e) => { return { name: e.cate_label, key: e.cate_key, cate_id: e.cate_id } })
    const [formKeys, setFormKeys] = useState([
        "is_active", "created_by", "serv_is_visible", "serv_is_coming_soon", "serv_is_new", "serv_is_Popular",
        "serv_priority", "serv_id", "serv_label", "serv_key", "serv_description", "serv_short_description",
        "serv_icon_type", "serv_icon_name", "serv_icon_color", "serv_image", "serv_cate_id", "serv_nav_key", "serv_nav_params", "remarks"
    ])
    const [form, setForm] = useState({
        serv_id: serv_id ?? '__New__', serv_id_error: '',
        serv_id_validation: [
            { method: "isReq", params: { label: 'Service id' } }
        ],
        created_by: user_id, created_by_error: '',
        created_by_validation: [
            { method: "isReq", params: { label: 'Created by' } }
        ],
        is_active: true, is_active_error: '',
        is_active_validation: [
            { method: "isBoolean", params: { label: 'Is Active' } }
        ],
        serv_is_visible: true, serv_is_visible_error: '',
        serv_is_visible_validation: [
            { method: "isBoolean", params: { label: 'Is Visible' } }
        ],
        serv_is_coming_soon: false, serv_is_coming_soon_error: '',
        serv_is_coming_soon_validation: [
            { method: "isBoolean", params: { label: 'Is Coming soon' } }
        ],
        serv_is_new: false, serv_is_new_error: '',
        serv_is_new_validation: [
            { method: "isBoolean", params: { label: 'Is New' } }
        ],
        serv_is_Popular: false, serv_is_Popular_error: '',
        serv_is_Popular_validation: [
            { method: "isBoolean", params: { label: 'Is Popular' } }
        ],
        serv_priority: 0, serv_priority_error: '',
        serv_priority_validation: [
            { method: "isInt", params: { label: 'Priority' } }
        ],
        serv_cate_id: [], serv_cate_id_error: '',
        serv_cate_id_validation: [
            { method: "isReqArray", params: { label: 'Category' } }
        ],
        serv_label: '', serv_label_error: '',
        serv_label_validation: [
            { method: "isReq", params: { label: 'Service label' } }
        ],
        serv_key: '', serv_key_error: '',
        serv_key_validation: [
            { method: "isString", params: { label: 'Service key' } }
        ],
        serv_description: '', serv_description_error: '',
        serv_description_validation: [
            { method: "isString", params: { label: 'Description' } }
        ],
        serv_short_description: '', serv_short_description_error: '',
        serv_short_description_validation: [
            { method: "isString", params: { label: 'Short description' } }
        ],
        serv_nav_key: [], serv_nav_key_error: '',
        serv_nav_key_validation: [
            { method: "isReqArray", params: { label: 'Navigation key' } }
        ],
        serv_nav_params: '', serv_nav_params_error: '',
        serv_nav_params_validation: [
            { method: "isString", params: { label: 'Navigation params' } }
        ],
        remarks: '', remarks_error: '',
        remarks_validation: [
            { method: "isString", params: { label: 'Remarks' } }
        ],
        serv_is_image: true, serv_is_image_error: '',
        serv_is_image_validation: [
            { method: "isBoolean", params: { label: 'Image / Icon' } }
        ],
        serv_icon_type: '', serv_icon_type_error: '',
        serv_icon_type_validation: [
            { method: "isString", params: { label: 'Icon type' } }
        ],
        serv_icon_name: '', serv_icon_name_error: '',
        serv_icon_name_validation: [
            { method: "isString", params: { label: 'Icon name' } }
        ],
        serv_icon_color: '', serv_icon_color_error: '',
        serv_icon_color_validation: [
            { method: "isString", params: { label: 'Icon color' } }
        ],
        serv_image: '', serv_image_error: '', serv_image_local: '',
        serv_image_validation: [
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
    useEffect(() => serv_id && getData(serv_id), [])

    // Get Data
    const getData = (serv_id: string) => {
        if (!isLoading) {
            setIsLoading(true)
            ServicesApis.getServiceById({ params: { serv_id } }).then((res: any) => {
                const formWithValue = constructForServer(formKeys, res.data)
                formWithValue.serv_is_image = formWithValue.serv_image ? true : false
                formWithValue.serv_cate_id = categoryOptions.filter((el) => el.cate_id == formWithValue.serv_cate_id)
                formWithValue.serv_nav_key = navigationKeyOptions.data.filter((el) => el.key == formWithValue.serv_nav_key)
                setForm({ ...form, ...formWithValue })
                setIsLoading(false)
            }).catch(({ message }: any) => {
                console.log(message)
                setSnack({ message, type: 'ERROR' })
            })
        }
    }

    const onUpdate = () => {
        if (!isSubmitLoading && validate()) {
            setIsSubmitLoading(true)
            const params = { serv_id, user_id }
            const body = constructForServer(formKeys, form)
            body.serv_key = toLowerCaseAndReplace(body.serv_label, ' ', '-')
            body.serv_cate_id = body.serv_cate_id[0].cate_id
            body.serv_nav_key = body.serv_nav_key[0].key
            ServicesApis.updateService({ params, body }).then((res: any) => {
                setIsSubmitLoading(false)
                setSnack({ message: "Service updated successfully", type: 'SUCCESS' })
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
            body.serv_key = toLowerCaseAndReplace(body.serv_label, ' ', '-')
            body.serv_cate_id = body.serv_cate_id[0].cate_id
            body.serv_nav_key = body.serv_nav_key[0].key
            ServicesApis.createService({ body }).then((res: any) => {
                setIsSubmitLoading(false)
                setSnack({ message: "Service created successfully", type: 'SUCCESS' })
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
                    { type: "Title", title: "Service Form" },
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
                                value={form.serv_is_visible}
                                onValueChange={(value: any) => setForm({ ...form, serv_is_visible: value })}
                                container={{ width: "50%" }}
                                isEditable={isEditable}
                            />
                        </View>
                        <Selection
                            _key={"category-options"}
                            label={"Select category"}
                            star={true}
                            placeholder={'Pick category from options'}
                            options={categoryOptions}
                            values={form.serv_cate_id}
                            onAction={({ item, index }) => setDataToForm('serv_cate_id', canPushNorPop([], item, 'name'))}
                            error={form.serv_cate_id_error}
                            closeAfterSelect={true}
                            multi={false}
                            showArrow={true}
                            isEditable={isEditable}
                        />
                        <TextInput
                            label={"Enter service label"}
                            star={true}
                            placeholder={'eg xxxx xxxx'}
                            value={form.serv_label}
                            onChangeText={(text: string) => setDataToForm('serv_label', text)}
                            error={form.serv_label_error}
                            isEditable={isEditable}
                        />
                        <TextInput
                            label={"Enter description"}
                            star={false}
                            placeholder={'eg xxxx xxxx'}
                            value={form.serv_description}
                            onChangeText={(text: string) => setDataToForm('serv_description', text)}
                            error={form.serv_description_error}
                            isEditable={isEditable}
                        />
                        <TextInput
                            label={"Enter short description"}
                            star={false}
                            placeholder={'eg xxxx xxxx'}
                            value={form.serv_short_description}
                            onChangeText={(text: string) => setDataToForm('serv_short_description', text)}
                            error={form.serv_short_description_error}
                            isEditable={isEditable}
                        />
                        <Selection
                            _key={"navigation-key-options"}
                            label={"Select navigation key"}
                            star={true}
                            placeholder={'Pick key from options'}
                            options={navigationKeyOptions.data}
                            values={form.serv_nav_key}
                            onAction={({ item, index }) => setDataToForm('serv_nav_key', canPushNorPop([], item, 'name'))}
                            error={form.serv_nav_key_error}
                            closeAfterSelect={true}
                            multi={false}
                            showArrow={true}
                            isEditable={isEditable}
                        />
                        <TextInput
                            label={"Enter navigation params"}
                            star={false}
                            placeholder={'eg xxxxxxx'}
                            value={form.serv_nav_params}
                            onChangeText={(text: string) => setDataToForm('serv_nav_params', text)}
                            error={form.serv_nav_params_error}
                            isEditable={isEditable}
                        />
                        <TextInput
                            label={"Enter message"}
                            star={false}
                            placeholder={'eg xxxxxxx'}
                            value={form.remarks}
                            onChangeText={(text: string) => setDataToForm('remarks', text)}
                            error={form.remarks_error}
                            isEditable={isEditable}
                        />
                        <View style={{ flexDirection: 'row' }}>
                            <Switch
                                label={"Is Coming soon"}
                                value={form.serv_is_coming_soon}
                                onValueChange={(value: any) => setForm({ ...form, serv_is_coming_soon: value })}
                                container={{ width: "50%" }}
                                isEditable={isEditable}
                            />
                            <Switch
                                label={"Is New"}
                                value={form.serv_is_new}
                                onValueChange={(value: any) => setForm({ ...form, serv_is_new: value })}
                                container={{ width: "50%" }}
                                isEditable={isEditable}
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Switch
                                label={"Is Popular"}
                                value={form.serv_is_Popular}
                                onValueChange={(value: any) => setForm({ ...form, serv_is_Popular: value })}
                                container={{ width: "50%" }}
                                isEditable={isEditable}
                            />
                            <Switch
                                label={"Is Image / Icon"}
                                value={form.serv_is_image}
                                onValueChange={(value: any) =>
                                    setForm({
                                        ...form, serv_is_image: value,
                                        serv_image: '', serv_image_local: '',
                                        serv_icon_type: '', serv_icon_name: '', serv_icon_color: ''
                                    })}
                                container={{ width: "50%" }}
                                isEditable={isEditable}
                            />
                        </View>
                        {form.serv_is_image ?
                            <Picker
                                label={"Upload document"}
                                star={true}
                                placeholder={`Select profile`}
                                value={{
                                    local: form.serv_image_local,
                                    key: form.serv_image,
                                }}
                                folder={'services'}
                                upload={true}
                                profile={true}
                                pickType={'image'}
                                onChange={({ name, key, type, size, local, blob }) =>
                                    setForm({ ...form, serv_image: key, serv_image_error: '', serv_image_local: local, })
                                }
                                error={form.serv_image_error}
                                isEditable={isEditable}
                            />
                            :
                            <>
                                <TextInput
                                    label={"Enter icon type"}
                                    star={true}
                                    placeholder={'eg xxxx xxxx'}
                                    value={form.serv_icon_type}
                                    onChangeText={(text: string) => setDataToForm('serv_icon_type', text)}
                                    error={form.serv_icon_type_error}
                                    isEditable={isEditable}
                                />
                                <TextInput
                                    label={"Enter icon name"}
                                    star={true}
                                    placeholder={'eg xxxx xxxx'}
                                    value={form.serv_icon_name}
                                    onChangeText={(text: string) => setDataToForm('serv_icon_name', text)}
                                    error={form.serv_icon_name_error}
                                    isEditable={isEditable}
                                />
                                <TextInput
                                    label={"Enter icon color"}
                                    star={true}
                                    placeholder={'eg xxxx xxxx'}
                                    value={form.serv_icon_color}
                                    onChangeText={(text: string) => setDataToForm('serv_icon_color', text)}
                                    error={form.serv_icon_color_error}
                                    isEditable={isEditable}
                                />
                            </>
                        }
                    </ScrollView>
                    {isEditable ?
                        <Button
                            label={serv_id ? 'Update' : 'Create'}
                            isLoading={isSubmitLoading}
                            onPress={serv_id ? onUpdate : onCreate}
                            style={{ marginBottom: hs(40), marginTop: hs(20) }}
                        />
                        : null}
                </KeyboardAvoidingView>
            }
        </View>
    );
};