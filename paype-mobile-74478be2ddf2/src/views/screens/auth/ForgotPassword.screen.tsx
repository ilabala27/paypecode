import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import NavServiceUtils from '@controllers/utils/NavService.utils';
import { MainHeader } from '@views/components/functional/MainHeader';
import { TextInput } from '@views/components/functional/TextInput';
import { Button } from '@views/components/functional/Button';
import { ScrollView } from '@views/components/functional/Scrollview';
import { constructForServer, validateKey, validateKeys } from '@utilis/methods/validation.method';
import { INavigationProps } from '@utilis/interfaces/navigation.interface';
import design from '@config/design.config';
import { systemTransportor } from '@models/redux/system/system.transportor';
import { NavKeys } from '@controllers/utils/NavKeys.utils';


export default ({ route, navigation }: INavigationProps) => {
    const { setSnack } = systemTransportor()
    const [formKeys, setFormKeys] = useState([
        "user_mobile_no"
    ])
    const [form, setForm] = useState({
        user_mobile_no: '', user_mobile_no_error: '',
        user_mobile_no_validation: [
            { method: "isMobileNo", params: { label: 'Mobile No' } }
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
    const doSubmit = () => {
        if (!isSubmitLoading && validate()) {
            setIsSubmitLoading(true)
            const body = constructForServer(formKeys, form)
            console.log(body)
        }
    }

    return (
        <View style={design.GENERIC_SCREEN_P}>
            <MainHeader
                render={[
                    { type: "Icon", iconType: "Entypo", iconName: "chevron-left", onPress: () => NavServiceUtils.goBack() },
                    { type: "Title", title: "FORGOT PASSWORD" },
                    { type: "Icon" },
                ]}
            />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView style={[design.GENERIC_CONTAINER_P, { backgroundColor: 'white' }]} >
                    <TextInput
                        label={"Enter Mobile Number"}
                        star={true}
                        placeholder={'eg xxxxxxxx'}
                        value={form.user_mobile_no}
                        onChangeText={(text: string) => setDataToForm('user_mobile_no', text)}
                        error={form.user_mobile_no_error}
                        keyboardType='numeric'
                    />
                    <Button
                        label={'Submit'}
                        isLoading={isSubmitLoading}
                        onPress={() => NavServiceUtils.navigate(NavKeys.AUTH_OTP_VALIDATION)}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};