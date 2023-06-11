import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, View, StyleSheet } from 'react-native';
import NavServiceUtils from '@controllers/utils/NavService.utils';
import { MainHeader } from '@views/components/functional/MainHeader';
import { TextInput } from '@views/components/functional/TextInput';
import { Button } from '@views/components/functional/Button';
import { ScrollView } from '@views/components/functional/Scrollview';
import { constructForServer, validateKey, validateKeys } from '@utilis/methods/validation.method';
import { INavigationProps } from '@utilis/interfaces/navigation.interface';
import design from '@config/design.config';
import { systemTransportor } from '@models/redux/system/system.transportor';
import PPUserAPIs from '@models/api/paype/user/user.api';
import { Auth } from "aws-amplify";
import { t } from 'i18next';

export default ({ route, navigation }: INavigationProps) => {
    const { setSnack } = systemTransportor()
    const [formKeys, setFormKeys] = useState([
        "token", "previous", "proposed", "proposed_confirm"
    ])
    const [form, setForm] = useState({
        token: '', token_error: '',
        token_validation: [
        ],
        proposed_confirm: '', proposed_confirm_error: '',
        proposed_confirm_validation: [
            { method: "isPassword", params: { label: 'Confirm Password' } }
        ],
        previous: '', previous_error: '',
        previous_validation: [
            { method: "isPassword", params: { label: 'Password' } }
        ],
        proposed: '', proposed_error: '',
        proposed_validation: [
            { method: "isPassword", params: { label: 'New Password' } }
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


    // Submit Data
    const doSubmit = async () => {
        if (form.previous == form.proposed)
            return setSnack({ message: "Previous and Proposed should not be same", type: 'ERROR' })
        if (!isSubmitLoading && validate()) {
            setIsSubmitLoading(true)
            const body = constructForServer(formKeys, form)
            body.token = (await Auth.currentSession()).getAccessToken().getJwtToken();
            PPUserAPIs.changePassword({ body }).then((res: any) => {
                setSnack({ message: "Password updated successfully", type: 'SUCCESS' })
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
                    { type: "Title", title: t("CHANGE_PASSWORD.CHANGE_PASSWORD") },
                    { type: "Icon" },
                ]}
            />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView style={[design.GENERIC_CONTAINER_P, { backgroundColor: 'white' }]} >
                    <TextInput
                        label={t("CHANGE_PASSWORD.OLD_PASSWORD")}
                        star={true}
                        placeholder={t("CHANGE_PASSWORD.PLACEHOLDER")}
                        value={form.previous}
                        onChangeText={(text: string) => setDataToForm('previous', text)}
                        error={form.previous_error}
                        secureTextEntry={true}
                    />
                    <TextInput
                        label={t("CHANGE_PASSWORD.NEW_PASSWORD")}
                        star={true}
                        placeholder={t("CHANGE_PASSWORD.PLACEHOLDER")}
                        value={form.proposed}
                        onChangeText={(text: string) => setDataToForm('proposed', text)}
                        error={form.proposed_error}
                        secureTextEntry={true}
                    />
                    <TextInput
                        label={t("CHANGE_PASSWORD.PLACEHOLDER")}
                        star={true}
                        placeholder={t("CHANGE_PASSWORD.PLACEHOLDER")}
                        value={form.proposed_confirm}
                        onChangeText={(text: string) => setDataToForm('proposed_confirm', text)}
                        error={form.proposed_confirm_error}
                        secureTextEntry={true}
                        showEye={false}
                    />
                    <Button
                        label={t("CHANGE_PASSWORD.BUTTON")}
                        isLoading={isSubmitLoading}
                        onPress={doSubmit}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

