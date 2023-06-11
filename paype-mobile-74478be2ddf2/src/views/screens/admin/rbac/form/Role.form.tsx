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
import PermissionGroupScreen from '../PermissionGroup.screen';


export default ({ route, navigation }: INavigationProps2) => {
    const { _id, parent_id } = route?.params
    const { systemStore, setSnack } = systemTransportor()
    const { user } = systemStore()
    const [isLoading, setIsLoading] = useState(false)
    const [isEditable, setIsEditable] = useState(_id ? false : true)
    const [formKeys, setFormKeys] = useState([
        "is_active", "role_parent_id", "role_name", "role_description",
        "role_permission_groups", "created_by"
    ])
    const [form, setForm] = useState({
        is_active: true, is_active_error: '',
        is_active_validation: [
            { method: "isBoolean", params: { label: 'Active' } }
        ],
        role_parent_id: parent_id, role_parent_id_error: '',
        role_parent_id_validation: [
            { method: "isReq", params: { label: 'Role parent id' } }
        ],
        role_name: '', role_name_error: '',
        role_name_validation: [
            { method: "isReq", params: { label: 'Role name' } }
        ],
        role_description: '', role_description_error: '',
        role_description_validation: [

        ],
        role_permission_groups: [], role_permission_groups_error: '',
        role_permission_groups_validation: [
            // { method: "isReqArray", params: { label: 'Permission groups' } }
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
    useEffect(() => _id && getRole(), [])

    const getRole = () => {
        if (!isLoading) {
            setIsLoading(true)
            RbacApis.getRole({ params: { _id } }).then((res) => {
                const formWithValue = constructForServer(formKeys, res.data)
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
            RbacApis.createRole({ body }).then((res: any) => {
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
            let payload = {
                params: { _id, user_id: user?.user?._id },
                body
            }
            RbacApis.updateRole(payload).then((res: any) => {
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
                    { type: "Title", title: "Role Form" },
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
                        </View>
                        <TextInput
                            label={"Enter role name"}
                            star={true}
                            placeholder={'eg xxxxx:xxxxx-xxxxx'}
                            value={form.role_name}
                            onChangeText={(text: string) => setDataToForm('role_name', text)}
                            error={form.role_name_error}
                            isEditable={isEditable}
                        />
                        <TextInput
                            label={"Enter role description"}
                            star={false}
                            placeholder={'eg xxxxx xxxxx xxxxx'}
                            value={form.role_description}
                            onChangeText={(text: string) => setDataToForm('role_description', text)}
                            error={form.role_description_error}
                            isEditable={isEditable}
                        />
                        <SelectionTree
                            label={"Select permisssion groups"}
                            star={true}
                            placeholder={'Pick permisssion groups from options'}
                            values={form.role_permission_groups}
                            error={form.role_permission_groups_error}
                            isEditable={isEditable}
                            modelContent={({ onClose }) => {
                                return (
                                    <PermissionGroupScreen
                                        selection={true}
                                        selected={form.role_permission_groups}
                                        onSelect={({ item, index }: any) =>
                                            setDataToForm('role_permission_groups', canPushNorPop(form.role_permission_groups, item._id))
                                        }
                                        onClose={() => onClose(false)}
                                    />
                                )
                            }}
                        />
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