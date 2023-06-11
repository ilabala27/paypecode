import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, View, StyleSheet } from 'react-native';
import NavServiceUtils from '@controllers/utils/NavService.utils';
import { MainHeader } from '@views/components/functional/MainHeader';
import { TextInput } from '@views/components/functional/TextInput';
import { Button } from '@views/components/functional/Button';
import { ScrollView } from '@views/components/functional/Scrollview';
import { INavigationProps } from '@utilis/interfaces/navigation.interface';
import design from '@config/design.config';


export default ({ route, navigation }: INavigationProps) => {
    const [isSubmitLoading, setIsSubmitLoading] = useState(false)
    return (
        <View style={design.GENERIC_SCREEN_P}>
            <MainHeader
                render={[
                    { type: "Icon", iconType: "Entypo", iconName: "chevron-left", onPress: () => NavServiceUtils.goBack() },
                    { type: "Title", title: "OTP VALIDATION" },
                    { type: "Icon" },
                ]}
            />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView style={[design.GENERIC_CONTAINER_P, { backgroundColor: 'white' }]} >
                    <TextInput
                        label={"Enter OTP Number"}
                        star={true}
                        placeholder={'eg xxxxxxxx'}
                        keyboardType='numeric'
                        maxLength={6}
                    />

                    <Button
                        label={'Submit'}
                        isLoading={isSubmitLoading}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};


