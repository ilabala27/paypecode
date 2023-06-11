import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, View, } from 'react-native';
import NavServiceUtils from '@controllers/utils/NavService.utils';
import { MainHeader } from '@views/components/functional/MainHeader';
import { TextInput } from '@views/components/functional/TextInput';
import { Button } from '@views/components/functional/Button';
import { ScrollView } from '@views/components/functional/Scrollview';
import { hs } from '@utilis/designs/measurements.design';
import { constructForServer, validateKey, validateKeys } from '@utilis/methods/validation.method';
import { INavigationProps2 } from '@utilis/interfaces/navigation.interface';
import design from '@config/design.config';
import RbacApis from '@models/api/paype/rbac/rbac.api';
import { systemTransportor } from '@models/redux/system/system.transportor';
import { Switch } from '@views/components/functional/Switch';
import { Loader } from '@views/components/functional/Loader';
import { SelectionTree } from '@views/components/functional/SelectionTree';
import { canPushNorPop } from '@utilis/methods/array.method';
import PermissionScreen from '../Permission.screen';


export default ({ route, navigation }: INavigationProps2) => {
    const { _id, parent_id } = route?.params
    const { systemStore, setSnack } = systemTransportor()
    const { user } = systemStore()
    const [isLoading, setIsLoading] = useState(false)
    const [isEditable, setIsEditable] = useState(_id ? false : true)
    const [formKeys, setFormKeys] = useState([
        "is_active", "pegr_isFolder", "pegr_effect", "pegr_parent_id", "pegr_name",
        "pegr_description", "pegr_permissions", "created_by"
    ])
    const [form, setForm] = useState({
        is_active: true, is_active_error: '',
        is_active_validation: [
            { method: "isBoolean", params: { label: 'Active' } }
        ],
        pegr_parent_id: parent_id, pegr_parent_id_error: '',
        pegr_parent_id_validation: [
            { method: "isReq", params: { label: 'Group parent id' } }
        ],
        pegr_name: '', pegr_name_error: '',
        pegr_name_validation: [
            { method: "isReq", params: { label: 'Group name' } }
        ],
        pegr_description: '', pegr_description_error: '',
        pegr_description_validation: [

        ],
        pegr_isFolder: false, pegr_isFolder_error: '',
        pegr_isFolder_validation: [
            { method: "isBoolean", params: { label: 'Is folder' } }
        ],
        pegr_effect: true, pegr_effect_error: '',
        pegr_effect_validation: [
            { method: "isBoolean", params: { label: 'Effect' } }
        ],
        pegr_permissions: [], pegr_permissions_error: '',
        pegr_permissions_validation: [
            { method: "isReqArray", params: { label: 'Permissions' } }
        ],
        created_by: user?.user?._id, created_by_error: '',
        created_by_validation: [
            { method: "isReq", params: { label: 'Created By' } }
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

    // ### On Mount
    useEffect(() => _id && getPermissionGroup(), [])

    const getPermissionGroup = () => {
        if (!isLoading) {
            setIsLoading(true)
            RbacApis.getPermissionGroup({ params: { _id } }).then((res) => {
                const formWithValue = constructForServer(formKeys, res.data)
                formWithValue.pegr_effect = formWithValue.pegr_effect == "Allow" ? true : false
                setForm({ ...form, ...formWithValue })
                setIsLoading(false)
            }).catch(({ message }: any) => {
                setSnack({ message, type: 'ERROR' })
            })
        }
    }

    // ### On Create
    const onCreate = () => {
        if (!isSubmitLoading && validate()) {
            setIsSubmitLoading(true)
            const body = constructForServer(formKeys, form)
            body.pegr_effect = body.pegr_effect ? "Allow" : 'Deny'
            RbacApis.createPermissionGroup({ body }).then((res: any) => {
                setSnack({ message: "Group created successfully", type: 'SUCCESS' })
                setIsSubmitLoading(false)
                NavServiceUtils.goBack()
            }).catch(({ message }: any) => {
                setIsSubmitLoading(false)
                setSnack({ message, type: 'ERROR' })
            })
        }
    }

    // ### On Update
    const onUpdate = () => {
        if (!isSubmitLoading && validate()) {
            setIsSubmitLoading(true)
            const body = constructForServer(formKeys, form)
            body.pegr_effect = body.pegr_effect ? "Allow" : 'Deny'
            let payload = {
                params: { _id, user_id: user?.user?._id },
                body
            }
            RbacApis.updatePermissionGroup(payload).then((res: any) => {
                setSnack({ message: "Group updated successfully", type: 'SUCCESS' })
                setIsSubmitLoading(false)
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
                    { type: "Title", title: "Permission group Form" },
                    isEditable ? { type: "Icon" } :
                        { type: "Icon", iconType: "MaterialCommunityIcons", iconName: "playlist-edit", onPress: () => setIsEditable(true) },
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
                                label={"Is Folder"}
                                value={form.pegr_isFolder}
                                onValueChange={(value: any) =>
                                    setForm({
                                        ...form,
                                        pegr_isFolder: value,
                                        pegr_permissions: [], pegr_permissions_error: '',
                                        pegr_permissions_validation: value ?
                                            [] : [{ method: "isReqArray", params: { label: 'Permissions' } }]
                                    })
                                }
                                container={{ width: "50%" }}
                                isEditable={isEditable}
                            />
                        </View>
                        <TextInput
                            label={"Enter group name"}
                            star={true}
                            placeholder={'eg xxxxx:xxxxx-xxxxx'}
                            value={form.pegr_name}
                            onChangeText={(text: string) => setDataToForm('pegr_name', text)}
                            error={form.pegr_name_error}
                            isEditable={isEditable}
                        />
                        <TextInput
                            label={"Enter group description"}
                            star={false}
                            placeholder={'eg xxxxx xxxxx xxxxx'}
                            value={form.pegr_description}
                            onChangeText={(text: string) => setDataToForm('pegr_description', text)}
                            error={form.pegr_description_error}
                            isEditable={isEditable}
                        />
                        {form.pegr_isFolder ? null :
                            <>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <Switch
                                        label={"Allow / Deny"}
                                        value={form.pegr_effect}
                                        onValueChange={(value: any) => setForm({ ...form, pegr_effect: value })}
                                        container={{ width: "50%" }}
                                        isEditable={isEditable}
                                    />
                                </View>
                                <SelectionTree
                                    label={"Select permisssions"}
                                    star={true}
                                    placeholder={'Pick permisssions from options'}
                                    values={form.pegr_permissions}
                                    error={form.pegr_permissions_error}
                                    isEditable={isEditable}
                                    modelContent={({ onClose }) => {
                                        return (
                                            <PermissionScreen
                                                selection={true}
                                                selected={form.pegr_permissions}
                                                onSelect={({ item, index }: any) =>
                                                    setDataToForm('pegr_permissions', canPushNorPop(form.pegr_permissions, item._id))
                                                }
                                                onClose={() => onClose(false)}
                                            />
                                        )
                                    }}
                                />
                            </>}
                    </ScrollView>
                    {isEditable ?
                        <Button
                            label={_id ? 'Update' : 'Create'}
                            isLoading={isSubmitLoading}
                            onPress={_id ? onUpdate : onCreate}
                            style={{ marginBottom: hs(40), marginTop: hs(20) }}
                        />
                        : null}
                </KeyboardAvoidingView>
            }
        </View>
    );
};