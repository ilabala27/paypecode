import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { systemTransportor } from '@models/redux/system/system.transportor';
import PPUserAPIs from '@models/api/paype/user/user.api';
import { TextInput } from '@views/components/functional/TextInput';
import { Button } from '@views/components/functional/Button';
import { hp, hs, ws } from '@utilis/designs/measurements.design';
import { INavigationProps2 } from '@utilis/interfaces/navigation.interface';
import design from '@config/design.config';
import { validateKey, validateKeys, } from '@utilis/methods/validation.method';
import { Images } from '@assets/images/png';
import { isValueEqu } from '@utilis/methods/string.method';
import NavServiceUtils from '@controllers/utils/NavService.utils';
import { NavKeys } from '@controllers/utils/NavKeys.utils';


export default ({ route, navigation }: INavigationProps2) => {
    const { Session, username } = route.params
    const { setSnack, setLogin } = systemTransportor()
    const [form, setForm] = useState({
        password: '', password_error: '',
        password_validation: [
            { method: "isPassword", params: { label: 'Password' } }
        ],
        confirmPassword: '', confirmPassword_error: '',
        confirmPassword_validation: [
            { method: "isPassword", params: { label: 'Confirm Password' } }
        ],
    })
    const [isSubmitLoading, setIsSubmitLoading] = useState(false)
    const setDataToForm = (key: string, value: string) => {
        setForm({ ...form, ...validateKey(form, key, value) })
    }

    // Validation
    const validate = () => {
        const { validatedForm, error } = validateKeys(form, ["password", "confirmPassword"], true)
        if (error) {
            setSnack({ message: error, type: 'ERROR' })
            return false
        }
        return true
    }

    // Submit
    const doChangePassword = () => {
        const isEqu = isValueEqu({ label: 'Password', value: form.password, label2: 'Confirm Password', value2: form.confirmPassword })
        if (isEqu)
            return setSnack({ message: isEqu, type: 'ERROR' })
        if (!isSubmitLoading && validate()) {
            setIsSubmitLoading(true)
            let body = {
                "username": username,
                "proposed": form.password,
                "session": Session
            }
            PPUserAPIs.forceChangePassword({ body }).then((res: any) => {
                setIsSubmitLoading(false)
                const { success, ...rest } = res.data
                if (!success)
                    return setSnack({ message: "Access denied", type: 'ERROR' })
                setSnack({ message: "Password reset successfully, Kindly do login now", type: 'SUCCESS' })
                NavServiceUtils.navigateAndReset(NavKeys.AUTH_LOGIN)
            }).catch(({ message }: any) => {
                setIsSubmitLoading(false)
                setSnack({ message, type: 'ERROR' })
            })
        }
    }

    return (
        <View style={[design.GENERIC_SCREEN_P, { alignItems: "center" }]}>
            <View style={styles.imageConatainer}>
                <Image
                    source={Images.logo}
                    style={design.GENERIC_IMAGE}
                />
            </View>
            <View style={styles.conatiner}>
                <Text style={design.GENERIC_TEXT_HEADER_AVG_P}>{"Force Change Password"}</Text>
                <Text style={design.GENERIC_TEXT_HEADER_AVG_P}></Text>
                <TextInput
                    label={'Password'}
                    placeholder={'Password'}
                    value={form.password}
                    onChangeText={(text: string) => setDataToForm('password', text)}
                    error={form.password_error}
                    secureTextEntry={true}
                    container={{ marginVertical: 0 }}
                    textInput={{ marginTop: 0, marginBottom: 0 }}
                />
                <TextInput
                    label={'Confirm Password'}
                    placeholder={'Confirm Password'}
                    value={form.confirmPassword}
                    onChangeText={(text: string) => setDataToForm('confirmPassword', text)}
                    error={form.confirmPassword_error}
                    secureTextEntry={true}
                    showEye={false}
                    container={{ marginVertical: 0 }}
                    textInput={{ marginTop: 0, marginBottom: 0 }}
                />
                <Button
                    label={"Change Password"}
                    onPress={doChangePassword}
                    isLoading={isSubmitLoading}
                    style={styles.button}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    conatiner: {
        width: '85%',
        ...design.GENERAIC_CENTER
    },
    imageConatainer: {
        height: ws(100),
        width: ws(100),
        backgroundColor: "red",
        overflow: 'hidden',
        marginTop: hp('15%')
    },
    button: {
        width: '92%',
        marginTop: hs(18),
        marginBottom: hs(30),
        borderRadius: 5,
    }
});