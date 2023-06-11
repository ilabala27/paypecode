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
import { Picker } from '@views/components/functional/Picker';
import { t } from 'i18next';
import { RECHARGE_TYPE } from '@models/static/recharge.static';
import RechargeApis from '@models/api/paype/recharge/recharge.api';


export default ({ route, navigation }: INavigationProps2) => {
    const { oper_id, isEditable = true } = route?.params
    const { setSnack } = systemTransportor()
    const [isLoading, setIsLoading] = useState(false)
    // Form Flow
    const [formKeys, setFormKeys] = useState([
        "oper_id", "oper_type", "oper_name", "oper_key", "is_active", "remarks", "notes",
    ])

    const [form, setForm] = useState({
        oper_id: '', oper_id_error: '',
        oper_id_validation: [
            { method: "isString", params: { label: 'Operator id' } }
        ],
        oper_type: [], oper_type_error: '',
        oper_type_validation: [
            { method: "isReqArray", params: { label: 'Operator Type' } }
        ],
        oper_name: '', oper_name_error: '',
        oper_name_validation: [
            { method: "isReq", params: { label: 'Operator Name' } }
        ],
        oper_key: '', oper_key_error: '',
        oper_key_validation: [
            { method: "isReq", params: { label: 'Operator Key' } }
        ],
        is_active: true, is_active_error: '',
        is_active_validation: [
            { method: "isBoolean", params: { label: 'Active' } }
        ],
        remarks: '', remarks_error: '',
        remarks_validation: [
            { method: "isString", params: { label: 'Remarks' } }
        ],
        notes: '', notes_error: '',
        notes_validation: [
            { method: "isString", params: { label: 'Notes' } }
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
    useEffect(() => oper_id && getData(oper_id), [])

    // Get Data
    const getData = (oper_id: string) => {
        // if (!isLoading) {
        //     setIsLoading(true)
        //     PPUserAPIs.getUserById({ params: { _id: user_id } }).then((res: any) => {
        //         const formWithValue = constructForServer(formKeys, res.data)
        //         // for user_type
        //         formWithValue.user_type = userTypes.filter((el) => el.key == formWithValue.user_type)
        //         // for user_roles
        //         const user_roles = formWithValue.user_role.split(',')
        //         formWithValue.user_role = roles.filter((el) => user_roles.includes(el._id))
        //         // for user_available_services
        //         const user_available_services: any = []
        //         availServies?.map((el: any) => formWithValue.user_available_services.includes(el._id) && user_available_services.push(el))
        //         formWithValue.user_available_services = user_available_services

        //         // set data
        //         setForm({ ...form, ...formWithValue })
        //         setIsLoading(false)
        //     }).catch(({ message }: any) => {
        //         setSnack({ message, type: 'ERROR' })
        //     })
        // }
    }

    const onUpdate = () => {
        // if (!isSubmitLoading && validate()) {
        //     setIsSubmitLoading(true)
        //     const params = { oper_id: oper_id }
        //     const body = constructForServer(formKeys, form)
        //     body.username = `${body.user_mobile_ex}${body.user_mobile_no}`
        //     body.user_type = body.user_type[0]?.key
        //     body.user_role = body.user_role.map((el: any) => el._id).join(',')
        //     body.user_available_services = body.user_available_services.map((el: any) => el._id).join(',')
        //     PPUserAPIs.updateUserById({ params, body }).then((res: any) => {
        //         const { _id } = res.data
        //         setIsSubmitLoading(false)
        //         setSnack({ message: "User updated successfully", type: 'SUCCESS' })
        //         NavServiceUtils.navigate(NavKeys.ADMIN.USER_ONBOARDING_WELCOME, { user_id: _id })
        //     }).catch(({ message }: any) => {
        //         setIsSubmitLoading(false)
        //         setSnack({ message, type: 'ERROR' })
        //     })
        // }
    }

    // Submit Data
    const onCreate = () => {
        if (!isSubmitLoading && validate()) {
            setIsSubmitLoading(true)
            const body = constructForServer(formKeys, form)
            body.oper_type = body.oper_type[0]?.key
            RechargeApis.createOperator({ body }).then((res: any) => {
                setIsSubmitLoading(false)
                setSnack({ message: 'Operator created successfully', type: 'SUCCESS' })
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
                    { type: "Title", title: t("FORM.USER_FORM.USER_DETAILS") },
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
                            _key={"oper_type"}
                            label={'Operator type'}
                            star={true}
                            placeholder={'Pick type from options'}
                            options={RECHARGE_TYPE}
                            values={form.oper_type}
                            onAction={({ item, index }) => setDataToForm('oper_type', canPushNorPop([], item, 'name'))}
                            error={form.oper_type_error}
                            closeAfterSelect={true}
                            multi={false}
                            showArrow={true}
                            isEditable={isEditable}
                        />
                        <TextInput
                            label={'Operator name'}
                            star={true}
                            placeholder={'eg xxxxx'}
                            value={form.oper_name}
                            onChangeText={(text: string) => setDataToForm('oper_name', text)}
                            error={form.oper_name_error}
                            isEditable={isEditable}
                        />
                        <TextInput
                            label={'Operator key'}
                            star={true}
                            placeholder={'eg xxxxx'}
                            value={form.oper_key}
                            onChangeText={(text: string) => setDataToForm('oper_key', text)}
                            error={form.oper_key_error}
                            isEditable={isEditable}
                        />
                        <TextInput
                            label={'Operator remarks'}
                            star={false}
                            placeholder={'eg xxxxx'}
                            value={form.remarks}
                            onChangeText={(text: string) => setDataToForm('remarks', text)}
                            error={form.remarks_error}
                            isEditable={isEditable}
                        />
                        <TextInput
                            label={'Operator notes'}
                            star={false}
                            placeholder={'eg xxxxx'}
                            value={form.notes}
                            onChangeText={(text: string) => setDataToForm('notes', text)}
                            error={form.notes_error}
                            isEditable={isEditable}
                        />
                    </ScrollView>
                    {isEditable ?
                        <Button
                            label={oper_id ? 'Update' : 'Create'}
                            isLoading={isSubmitLoading}
                            onPress={oper_id ? onUpdate : onCreate}
                            style={{ marginBottom: hs(40), marginTop: hs(20) }}
                        />
                        : null}
                </KeyboardAvoidingView>
            }
        </View>
    );
};