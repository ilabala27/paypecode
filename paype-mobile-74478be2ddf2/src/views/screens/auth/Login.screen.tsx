import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { t } from 'i18next';

import { systemTransportor } from '@models/redux/system/system.transportor';
import PPUserAPIs from '@models/api/paype/user/user.api';
import { TextInput } from '@views/components/functional/TextInput';
import { Button } from '@views/components/functional/Button';
import { hp, hs, ws } from '@utilis/designs/measurements.design';
import { navigateToDailerPad } from '@utilis/methods/common.method';
import { INavigationProps } from '@utilis/interfaces/navigation.interface';
import colors from '@config/colors.config';
import appConfig from '@config/app.config';
import design from '@config/design.config';
import { validateKey, validateKeys, } from '@utilis/methods/validation.method';
import { Images } from '@assets/images/png';
import NavServiceUtils from '@controllers/utils/NavService.utils';
import { NavKeys } from '@controllers/utils/NavKeys.utils';
import { signIn } from '@models/aws/api.aws';

const initForm = {
    username: '', username_error: '',
    username_validation: [
        { method: "isMobileNo", params: { label: 'Mobile' } }
    ],
    password: '', password_error: '',
    password_validation: [
        { method: "isPassword", params: { label: 'Password' } }
    ],
}

export default ({ route, navigation }: INavigationProps) => {
    const { systemStore, setSnack, setLogin } = systemTransportor()
    const { fcm } = systemStore()
    const [form, setForm] = useState(initForm)
    const [isSubmitLoading, setIsSubmitLoading] = useState(false)
    const setDataToForm = (key: string, value: string) => {
        setForm({ ...form, ...validateKey(form, key, value) })
    }

    // Validation
    const validate = () => {
        const { validatedForm, error } = validateKeys(form, ["username", "password"], true)
        if (error) {
            setSnack({ message: error, type: 'ERROR' })
            return false
        }
        return true
    }

    // Submit
    const doLogin = async () => {
        try {
            if (!isSubmitLoading && validate()) {
                setIsSubmitLoading(true)
                let body = {
                    "username": `+91${form.username}`,
                    "password": form.password,
                }

                // Auth AWS
                console.log('Auth aws')
                const awsRes = await signIn(body)
                if (awsRes?.challengeName == "NEW_PASSWORD_REQUIRED") {
                    setIsSubmitLoading(false)
                    setForm(initForm)
                    NavServiceUtils.navigate(NavKeys.AUTH_FORCE_CHANGE_PASSWORD, { username: body.username, ...awsRes })
                    return setSnack({ message: "Password reset is required", type: 'SUCCESS' })
                } else if (awsRes?.challengeName) {
                    return setSnack({ message: "Something went wrong", type: 'ERROR' })
                }

                // Auth System
                console.log('Auth system')
                const metaInfo = {
                    "user_fcm": fcm?? ''
                }
                const loginRes = await PPUserAPIs.login({ body: { ...awsRes, metaInfo } })
                const { success, ...loginRest } = loginRes?.data ?? {}
                if (!success) {
                    return setSnack({ message: "Access denied", type: 'ERROR' })
                }

                // Auth Success
                console.log('Auth success')
                setLogin(loginRest)
            }
        } catch ({ message }) {
            console.log(message)
            setIsSubmitLoading(false)
            setSnack({ message, type: 'ERROR' })
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
                <Text style={design.GENERIC_TEXT_HEADER_AVG_P}>{t('auth.welcome.title')}</Text>
                <Text style={design.GENERIC_TEXT_HEADER_AVG_P}></Text>
                <TextInput
                    placeholder={'Username'}
                    value={form.username}
                    onChangeText={(text: string) => setDataToForm('username', text)}
                    error={""}
                    focusable={true}
                    keyboardType={'numeric'}
                    maxLength={10}
                    container={{ marginVertical: 0 }}
                    textInput={{ marginTop: 0, marginBottom: 0 }}
                    stopAnimation={true}
                />
                <TextInput
                    placeholder={'Password'}
                    value={form.password}
                    onChangeText={(text: string) => setDataToForm('password', text)}
                    error={""}
                    secureTextEntry={true}
                    container={{ marginVertical: 0 }}
                    textInput={{ marginTop: 0, marginBottom: 0 }}
                    stopAnimation={true}
                />
                <Button
                    label={t('auth.welcome.loginButton')}
                    onPress={doLogin}
                    isLoading={isSubmitLoading}
                    style={styles.button}
                />
                <Text
                    onPress={() => navigateToDailerPad(appConfig.reachUsContact)}
                    style={design.GENERIC_TEXT_TITLE_S}
                >
                    {t('auth.welcome.content')}
                    <Text style={[design.GENERIC_TEXT_TITLE_S, { color: colors.RED }]}>
                        {"  "}{t('auth.welcome.reachUs')}
                    </Text>
                </Text>
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