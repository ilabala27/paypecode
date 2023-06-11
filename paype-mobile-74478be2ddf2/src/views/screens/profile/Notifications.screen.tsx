import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import NavServiceUtils from '@controllers/utils/NavService.utils';
import { MainHeader } from '@views/components/functional/MainHeader';
import { ScrollView } from '@views/components/functional/Scrollview';
import { INavigationProps } from '@utilis/interfaces/navigation.interface';
import design from '@config/design.config';


export default ({ route, navigation }: INavigationProps) => {
    return (
        <View style={design.GENERIC_SCREEN_P}>
            <MainHeader
                render={[
                    { type: "Icon", iconType: "Entypo", iconName: "chevron-left", onPress: () => NavServiceUtils.goBack() },
                    { type: "Title", title: "NOTIFICATIONS" },
                    { type: "Icon" },
                ]}
            />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView style={[design.GENERIC_CONTAINER_P, { backgroundColor: 'white' }]} >
                    <Text style={[design.GENERIC_TEXT_HEADER_AVG_P, { textAlign: 'center', paddingVertical: '80%' }]}>No Notifications Found</Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

