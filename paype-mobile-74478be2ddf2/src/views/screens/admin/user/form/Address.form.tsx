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
import { hs } from '@utilis/designs/measurements.design';
import { constructForServer, validateKey, validateKeys } from '@utilis/methods/validation.method';
import { INavigationProps2 } from '@utilis/interfaces/navigation.interface';
import { canPushNorPop } from '@utilis/methods/array.method';
import design from '@config/design.config';
import { t } from 'i18next';


export default ({ route, navigation }: INavigationProps2) => {
    const { address, createCallBack, isEditable } = route?.params
    const { addr_id, ref_name, ref_id, addressSameAsOption } = address ?? {}
    const { systemStore, setSnack } = systemTransportor()
    const { user } = systemStore()
    const { adminStore } = adminTransportor()
    const { postal, addressTypes } = adminStore()
    const [isSearchActive, setIsSearchActive] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    // Form Flow
    const [formKeys, setFormKeys] = useState([
        "is_active", "addr_type", "addr_line1", "addr_line2",
        "addr_landmark", "addr_lat", "addr_long", "addr_post_id"
    ])
    const [pincode, setPincode] = useState('')
    const [form, setForm] = useState({
        is_active: true, is_active_error: '',
        is_active_validation: [
            { method: "isBoolean", params: { label: 'Active' } }
        ],
        is_same: false, is_same_error: '',
        is_same_validation: [
            { method: "isBoolean", params: { label: 'Active' } }
        ],
        addr_type: [], addr_type_error: '',
        addr_type_validation: [
            { method: "isReqArray", params: { label: 'Address Type' } }
        ],
        addr_line1: '', addr_line1_error: '',
        addr_line1_validation: [
            { method: "isReq", params: { label: 'Address line 1' } }
        ],
        addr_line2: '', addr_line2_error: '',
        addr_line2_validation: [
            { method: "isString", params: { label: 'Address line 2' } }
        ],
        addr_landmark: '', addr_landmark_error: '',
        addr_landmark_validation: [
            { method: "isReq", params: { label: 'Landmark' } }
        ],
        addr_lat: '', addr_lat_error: '',
        addr_lat_validation: [
            { method: "isString", params: { label: 'Latitude' } }
        ],
        addr_long: '', addr_long_error: '',
        addr_long_validation: [
            { method: "isString", params: { label: 'Longitude' } }
        ],
        addr_post_id: '', addr_post_id_error: '',
        addr_post_id_validation: [
            { method: "isReq", params: { label: 'Pincode' } }
        ],
        country: '',
        state: '',
        district: '',
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
    useEffect(() => addr_id && getData(addr_id), [])

    // Get Data
    const getData = (addr_id: string) => {
        if (!isLoading) {
            setIsLoading(true)
            PPUserAPIs.getAddressById({ params: { _id: addr_id } }).then((res: any) => {
                const formWithValue = constructForServer(formKeys, res.data)
                // addr_type
                formWithValue.addr_type = addressTypes.filter((el) => el.name == formWithValue.addr_type)
                // addr_post_id
                const { post_code, post_dist_id, post_stat_id, post_coun_id } = postal.find((el) => el._id == formWithValue.addr_post_id)
                setPincode(post_code ?? '')
                // update from
                setForm({
                    ...form,
                    ...formWithValue,
                    country: post_coun_id?.coun_name ?? '',
                    state: post_stat_id?.stat_name ?? '',
                    district: post_dist_id?.dist_name ?? '',
                })
                setIsLoading(false)
            }).catch(({ message }: any) => {
                setSnack({ message, type: 'ERROR' })
            })
        }
    }

    const sameAs = (data: any, is_same: boolean) => {
        const formWithValue = constructForServer(formKeys, is_same ? data : {})
        // addr_type
        formWithValue.addr_type = addressTypes.filter((el) => el.name == formWithValue.addr_type)
        // addr_post_id
        const { post_code, post_dist_id, post_stat_id, post_coun_id } = postal.find((el) => el._id == formWithValue.addr_post_id) ?? {}
        setPincode(post_code ?? '')
        // update from
        console.log(formWithValue)
        setForm({
            ...form,
            ...formWithValue,
            is_same,
            country: post_coun_id?.coun_name,
            state: post_stat_id?.stat_name,
            district: post_dist_id?.dist_name
        })
        setIsLoading(false)
    }

    const onUpdate = () => {
        if (!isSubmitLoading && validate()) {
            setIsSubmitLoading(true)
            const params = { _id: addr_id }
            const body = constructForServer(formKeys, form)
            body.addr_type = body.addr_type[0]?.name
            PPUserAPIs.updateAddressById({ params, body }).then((res: any) => {
                setIsSubmitLoading(false)
                setSnack({ message: "Address created successfully", type: 'SUCCESS' })
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
            body.addr_type = body.addr_type[0]?.name
            body.addr_ref = ref_name
            body.addr_ref_id = ref_id
            PPUserAPIs.createAddress({ body }).then((res: any) => {
                const { _id } = res.data
                createCallBack && createCallBack()
                setIsSubmitLoading(false)
                setSnack({ message: "Address created successfully", type: 'SUCCESS' })
                NavServiceUtils.goBack()
            }).catch(({ message }: any) => {
                setIsSubmitLoading(false)
                setSnack({ message, type: 'ERROR' })
            })
        }
    }

    const searchPostal = (pin: string) => {
        setDataToForm('addr_post_id', '', { country: '', state: '', district: '' })
        if (!isSearchActive && pin.length == 6) {
            setIsSearchActive(true)
            const { _id, post_dist_id, post_stat_id, post_coun_id } = postal.find((el) => el.post_code == pin) ?? {}
            setIsSearchActive(false)
            if (!_id) return setSnack({ message: "Pincode does not exist", type: 'ERROR' })
            setDataToForm('addr_post_id', _id, {
                country: post_coun_id?.coun_name,
                state: post_stat_id?.stat_name,
                district: post_dist_id?.dist_name
            })
        } else {

        }
    }

    return (
        <View style={design.GENERIC_SCREEN_P}>
            <MainHeader
                render={[
                    { type: "Icon", iconType: "Entypo", iconName: "chevron-left", onPress: () => NavServiceUtils.goBack() },
                    { type: "Title", title: t("FORM.ADDRESS_FORM.ADDRESS_DETAILS") },
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
                            {addressSameAsOption ?
                                <Switch
                                    label={"Is Same as user"}
                                    value={form.is_same}
                                    onValueChange={(value: any) => sameAs(addressSameAsOption, value)}
                                    container={{ width: "50%" }}
                                    isEditable={isEditable}
                                />
                                : null}
                        </View>
                        <Selection
                            _key={"addr_type"}
                            label={t("FORM.ADDRESS_FORM.ADDRESS_TYPE")}
                            star={true}
                            placeholder={t("FORM.ADDRESS_FORM.ADDRESS_TYPE_PLACEHOLDER")}
                            options={addressTypes}
                            values={form.addr_type}
                            onAction={({ item, index }) => setDataToForm('addr_type', canPushNorPop([], item, 'name'))}
                            error={form.addr_type_error}
                            closeAfterSelect={true}
                            multi={false}
                            showArrow={true}
                            isEditable={isEditable}
                        />
                        <TextInput
                            label={t("FORM.ADDRESS_FORM.ADDRESS_LINE1")}
                            star={true}
                            placeholder={'eg xxxx, xxxx, xxxx'}
                            value={form.addr_line1}
                            onChangeText={(text: string) => setDataToForm('addr_line1', text)}
                            error={form.addr_line1_error}
                            isEditable={isEditable}
                        />
                        <TextInput
                            label={t("FORM.ADDRESS_FORM.ADDRESS_LINE2")}
                            star={false}
                            placeholder={'eg xxxx, xxxx, xxxx'}
                            value={form.addr_line2}
                            onChangeText={(text: string) => setDataToForm('addr_line2', text)}
                            error={form.addr_line2_error}
                            isEditable={isEditable}
                        />
                        <TextInput
                            label={t("FORM.ADDRESS_FORM_.LANDMARK")}
                            star={true}
                            placeholder={'eg xxxxxx'}
                            value={form.addr_landmark}
                            onChangeText={(text: string) => setDataToForm('addr_landmark', text)}
                            error={form.addr_landmark_error}
                            isEditable={isEditable}
                        />
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                label={t("FORM.ADDRESS_FORM.PINCODE")}
                                star={true}
                                placeholder={'eg xxx-xxx'}
                                value={pincode}
                                onChangeText={(text: string) => {
                                    setPincode(text)
                                    searchPostal(text)
                                }}
                                error={form.addr_post_id_error}
                                keyboardType={'numeric'}
                                maxLength={6}
                                isEditable={isEditable}
                            />
                        </View>
                        {form.district ?
                            <TextInput
                                label={t("FORM.ADDRESS_FORM.DISTRICT")}
                                star={true}
                                value={form.district}
                                isEditable={false}
                            />
                            : null}
                        {form.state ?
                            <TextInput
                                label={t("FORM.ADDRESS_FORM.STATE")}
                                star={true}
                                value={form.state}
                                isEditable={false}
                            />
                            : null}
                        {form.country ?
                            <TextInput
                                label={t("FORM.ADDRESS_FORM.COUNTRY")}
                                star={true}
                                value={form.country}
                                isEditable={false}
                            />
                            : null}
                    </ScrollView>
                    {isEditable ?
                        <Button
                            label={addr_id ? 'Update' : 'Create'}
                            isLoading={isSubmitLoading}
                            onPress={addr_id ? onUpdate : onCreate}
                            style={{ marginBottom: hs(40), marginTop: hs(20) }}
                        />
                        : null}
                </KeyboardAvoidingView>
            }
        </View>
    );
};