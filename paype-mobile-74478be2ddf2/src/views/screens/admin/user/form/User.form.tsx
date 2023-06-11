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


export default ({ route, navigation }: INavigationProps2) => {
    const { user_id, isEditable } = route?.params
    const { systemStore, setSnack } = systemTransportor()
    const { user, servies } = systemStore()
    const availServies = user?.user?.user_type == "SUPER_ADMIN" ? servies : servies.filter((el) => user?.user?.user_available_services.includes(el._id))
    const { adminStore } = adminTransportor()
    const { roles, userTypes } = adminStore()
    const loggedInUserType = userTypes.find(el => el.name == user?.user?.user_type)?.level ?? 0
    const [isLoading, setIsLoading] = useState(false)
    // Form Flow
    const [formKeys, setFormKeys] = useState([
        "is_active", "user_registration_status", "user_is_profile_updated", "user_is_kyc_verified",
        "user_is_account_verified", "user_is_blocked", "user_aws_id", "user_type",
        "user_role", "user_available_services", "user_image", "user_mobile_ex", "user_mobile_no", "user_name", "user_email",
        "user_contact_no", "user_created_by", "user_org", "user_super_distributor", "user_distributor", "user_created_by_nano", "user_created_by_chain"
    ])
    const [form, setForm] = useState({
        is_active: true, is_active_error: '',
        is_active_validation: [
            { method: "isBoolean", params: { label: 'Active' } }
        ],
        user_registration_status: 'USER_ADDRESS_CREATION', user_registration_status_error: '',
        user_registration_status_validation: [
            { method: "isReq", params: { label: 'Registration status' } }
        ],
        user_is_profile_updated: false, user_is_profile_updated_error: '',
        user_is_profile_updated_validation: [
            { method: "isBoolean", params: { label: 'Profile updated' } }
        ],
        user_is_kyc_verified: false, user_is_kyc_verified_error: '',
        user_is_kyc_verified_validation: [
            { method: "isBoolean", params: { label: 'KYC' } }
        ],
        user_is_account_verified: false, user_is_account_verified_error: '',
        user_is_account_verified_validation: [
            { method: "isBoolean", params: { label: 'Account verified' } }
        ],
        user_is_blocked: false, user_is_blocked_error: '',
        user_is_blocked_validation: [
            { method: "isBoolean", params: { label: 'Account blocker' } }
        ],
        user_aws_id: '__user_aws_id__', user_aws_id_error: '',
        user_aws_id_validation: [
            { method: "isString", params: { label: 'AWS ID' } }
        ],
        user_type: [], user_type_error: '',
        user_type_validation: [
            { method: "isReqArray", params: { label: 'User Type' } }
        ],
        user_role: [], user_role_error: '',
        user_role_validation: [
            { method: "isReqArray", params: { label: 'Roles' } }
        ],
        user_available_services: [], user_available_services_error: '',
        user_available_services_validation: [
            { method: "isReqArray", params: { label: 'Services' } }
        ],
        user_image: '', user_image_error: '',
        user_image_validation: [
            { method: "isReq", params: { label: 'Profile picture' } }
        ],
        user_mobile_ex: '+91', user_mobile_ex_error: '',
        user_mobile_ex_validation: [
            { method: "isReq", params: { label: 'Mobile Extension' } }
        ],
        user_mobile_no: '', user_mobile_no_error: '',
        user_mobile_no_validation: [
            { method: "isMobileNo", params: { label: 'Mobile No' } }
        ],
        user_name: '', user_name_error: '',
        user_name_validation: [
            { method: "isReq", params: { label: 'Name' } }
        ],
        user_email: '', user_email_error: '',
        user_email_validation: [
            { method: "isReq", params: { label: 'Email' } }
        ],
        user_contact_no: '', user_contact_no_error: '',
        user_contact_no_validation: [
            { method: "isString", params: { label: 'Contact no.' } }
        ],
        user_is_password_exist: false, user_is_password_exist_error: '',
        user_is_password_exist_validation: [
            { method: "isBoolean", params: { label: 'Password exist' } }
        ],
        user_password: '', user_password_error: '',
        user_password_validation: [
            { method: "isString", params: { label: 'Password' } }
        ],
        user_created_by: user?.user?._id, user_created_by_error: '',
        user_created_by_validation: [
            { method: "isReq", params: { label: 'Created By' } }
        ],
        user_org: '', user_org_error: '',
        user_org_validation: [
            { method: "isString", params: { label: 'Super distributor' } }
        ],
        user_super_distributor: '', user_super_distributor_error: '',
        user_super_distributor_validation: [
            { method: "isString", params: { label: 'Super distributor' } }
        ],
        user_distributor: '', user_distributor_error: '',
        user_distributor_validation: [
            { method: "isString", params: { label: 'Distributor' } }
        ],
        user_created_by_nano: user?.user?.user_id, user_created_by_nano_error: '',
        user_created_by_nano_validation: [
            { method: "isReq", params: { label: 'Created By nano' } }
        ],
        user_created_by_chain: `${user?.user?.user_created_by_chain},${user?.user?.user_id},`, user_created_by_chain_error: '',
        user_created_by_chain_validation: [
            { method: "isReq", params: { label: 'Created By reference chain' } }
        ],
        profile: ""
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
    useEffect(() => user_id && getData(user_id), [])

    // Get Data
    const getData = (user_id: string) => {
        if (!isLoading) {
            setIsLoading(true)
            PPUserAPIs.getUserById({ params: { _id: user_id } }).then((res: any) => {
                const formWithValue = constructForServer(formKeys, res.data)
                // for user_type
                formWithValue.user_type = userTypes.filter((el) => el.key == formWithValue.user_type)
                // for user_roles
                const user_roles = formWithValue.user_role.split(',')
                formWithValue.user_role = roles.filter((el) => user_roles.includes(el._id))
                // for user_available_services
                const user_available_services: any = []
                availServies?.map((el: any) => formWithValue.user_available_services.includes(el._id) && user_available_services.push(el))
                formWithValue.user_available_services = user_available_services

                // set data
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
            const params = { _id: user_id }
            const body = constructForServer(formKeys, form)
            body.username = `${body.user_mobile_ex}${body.user_mobile_no}`
            body.user_type = body.user_type[0]?.key
            body.user_role = body.user_role.map((el: any) => el._id).join(',')
            body.user_available_services = body.user_available_services.map((el: any) => el._id).join(',')
            PPUserAPIs.updateUserById({ params, body }).then((res: any) => {
                const { _id } = res.data
                setIsSubmitLoading(false)
                setSnack({ message: "User updated successfully", type: 'SUCCESS' })
                NavServiceUtils.navigate(NavKeys.ADMIN.USER_ONBOARDING_WELCOME, { user_id: _id })
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
            body.username = `${body.user_mobile_ex}${body.user_mobile_no}`
            body.user_type = body.user_type[0]?.key
            body.user_role = body.user_role.map((el: any) => el._id).join(',')
            body.user_available_services = body.user_available_services.map((el: any) => el._id).join(',')
            body.tempPassword = `${Math.random().toString(36).slice(2)}${Math.random().toString(36).toUpperCase().slice(2)}*`
            body.user_org = body.user_type == "SUPER_DISTRIBUTOR" ? user?.user?.user_id : body.user_type == "DISTRIBUTOR" ? user?.user?.user_org : body.user_type == "RETAILER" ? user?.user?.user_org : ''
            body.user_super_distributor = body.user_type == "DISTRIBUTOR" ? user?.user?.user_id : body.user_type == "RETAILER" ? user?.user?.user_super_distributor : ''
            body.user_distributor = body.user_type == "RETAILER" ? user?.user?.user_id : ''
            PPUserAPIs.createUser({ body }).then((res: any) => {
                const { success, user } = res.data
                setIsSubmitLoading(false)
                if (!success) {
                    const { account_Status } = res.data
                    return setSnack({ message: account_Status ?? "Something went wrong reach admin, Thanks!", type: 'ERROR' })
                }
                setSnack({ message: success, type: 'SUCCESS' })
                NavServiceUtils.navigate(NavKeys.ADMIN.USER_ONBOARDING_WELCOME, { user_id: user._id })
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
                    { type: "Title", title:t("FORM.USER_FORM.USER_DETAILS") },
                    { type: "Icon" },
                ]}
            />
            {isLoading ? <Loader /> :
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: 'white' }}>
                    <ScrollView style={[design.GENERIC_CONTAINER_P, { backgroundColor: 'white' }]} >
                        <Picker
                            label={"Upload document"}
                            star={true}
                            placeholder={`Select profile`}
                            value={{
                                local: form.profile,
                                key: form.user_image,
                            }}
                            folder={'profile_picture'}
                            upload={true}
                            profile={true}
                            pickType={'image'}
                            onChange={({ name, key, type, size, local, blob }) =>
                                setForm({ ...form, user_image: key, user_image_error: '', profile: local, })
                            }
                            error={form.user_image_error}
                            isEditable={isEditable}
                        />
                        <View style={{ flexDirection: 'row' }}>
                            <Switch
                                label={"Is Active"}
                                value={form.is_active}
                                onValueChange={(value: any) => setForm({ ...form, is_active: value })}
                                container={{ width: "50%" }}
                                isEditable={isEditable}
                            />
                            <Switch
                                label={"Is Blocked"}
                                value={form.user_is_blocked}
                                onValueChange={(value: any) => setForm({ ...form, user_is_blocked: value })}
                                container={{ width: "50%" }}
                                isEditable={isEditable}
                            />
                        </View>
                        <TextInput
                            label={t('FORM.USER_FORM.NAME')}
                            star={true}
                            placeholder={'eg xxxxx'}
                            value={form.user_name}
                            onChangeText={(text: string) => setDataToForm('user_name', text)}
                            error={form.user_name_error}
                            isEditable={isEditable}
                        />
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                label={"Ex"}
                                star={true}
                                placeholder={'eg +91'}
                                value={form.user_mobile_ex}
                                onChangeText={(text: string) => setDataToForm('user_mobile_ex', text)}
                                error={form.user_mobile_ex_error}
                                keyboardType={'numeric'}
                                maxLength={3}
                                container={{ width: wp('20%') }}
                                isEditable={false}
                            />
                            <TextInput
                                label={t("FORM.USER_FORM.MOBILE_NUMBER")}
                                star={true}
                                placeholder={'eg xxxxxxxxx'}
                                value={form.user_mobile_no}
                                onChangeText={(text: string) => setDataToForm('user_mobile_no', text)}
                                error={form.user_mobile_no_error}
                                keyboardType={'numeric'}
                                maxLength={10}
                                container={{ width: wp('70%') }}
                                isEditable={!user_id}
                            />
                        </View>
                        <TextInput
                            label={t("FORM.USER_FORM.EMAIL")}
                            star={true}
                            placeholder={'eg xxxxxx@xxxx.com'}
                            value={form.user_email}
                            autoCapitalize={"none"}
                            onChangeText={(text: string) => setDataToForm('user_email', text)}
                            error={form.user_email_error}
                            isEditable={isEditable}
                        />

                        <Selection
                            _key={"user_type"}
                            label={t("FORM.USER_FORM.USER_TYPE")}
                            star={true}
                            placeholder={'Pick type from options'}
                            options={userTypes.filter((el) => el.level > loggedInUserType)}
                            values={form.user_type}
                            onAction={({ item, index }) => setDataToForm('user_type', canPushNorPop([], item, 'name'))}
                            error={form.user_type_error}
                            closeAfterSelect={true}
                            multi={false}
                            showArrow={true}
                            isEditable={isEditable}
                        />
                        <Selection
                            _key={"user_role"}
                            label={t("FORM.USER_FORM.USER_ROLE")}
                            star={true}
                            placeholder={'Pick user role from options'}
                            options={roles}
                            values={form.user_role}
                            onAction={({ item, index }) => setDataToForm('user_role', canPushNorPop([], item, 'name'))}
                            error={form.user_role_error}
                            closeAfterSelect={true}
                            multi={false}
                            showArrow={true}
                            isEditable={isEditable}
                        />
                        <Selection
                            _key={'services'}
                            label={t("FORM.USER_FORM.SERVICES")}
                            star={true}
                            placeholder={'Pick services from options'}
                            options={availServies}
                            values={form.user_available_services}
                            onAction={({ item, index }) => setDataToForm('user_available_services', canPushNorPop(form.user_available_services, item, 'name'))}
                            error={form.user_available_services_error}
                            closeAfterSelect={false}
                            multi={true}
                            showArrow={true}
                            isEditable={isEditable}
                        />
                        <TextInput
                            label={t("FORM.USER_FORM.ALTERNATE_CONTACT")}
                            star={false}
                            placeholder={'eg xxxxxxxxx'}
                            value={form.user_contact_no}
                            onChangeText={(text: string) => setDataToForm('user_contact_no', text)}
                            error={form.user_contact_no_error}
                            keyboardType={'numeric'}
                            maxLength={10}
                            isEditable={isEditable}
                        />
                        <View style={{ flexDirection: 'row' }}>
                            <Switch
                                label={"Is Profile Updated"}
                                value={form.user_is_profile_updated}
                                onValueChange={(value: any) => setForm({ ...form, user_is_profile_updated: value })}
                                container={{ width: "50%" }}
                                isEditable={false}
                            />
                            <Switch
                                label={"Is KYC Verified"}
                                value={form.user_is_kyc_verified}
                                onValueChange={(value: any) => setForm({ ...form, user_is_kyc_verified: value })}
                                container={{ width: "50%" }}
                                isEditable={false}
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Switch
                                label={"Is Account Verified"}
                                value={form.user_is_account_verified}
                                onValueChange={(value: any) => setForm({ ...form, user_is_account_verified: value })}
                                container={{ width: "50%" }}
                                isEditable={false}
                            />

                        </View>
                    </ScrollView>
                    {isEditable ?
                        <Button
                            label={user_id ? 'Update' : 'Create'}
                            isLoading={isSubmitLoading}
                            onPress={user_id ? onUpdate : onCreate}
                            style={{ marginBottom: hs(40), marginTop: hs(20) }}
                        />
                        : null}
                </KeyboardAvoidingView>
            }
        </View>
    );
};