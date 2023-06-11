import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated,
    ViewStyle,
    TouchableOpacity,
    Alert,
    Image,
    ActivityIndicator,
} from 'react-native'

import { Icon } from '@views/components/functional/Icon';
import { hs, ms, wp, ws } from '@utilis/designs/measurements.design';
import { useSlideAnimation } from '@utilis/hooks/animations/slide.animation';
import colors from '@config/colors.config';
import fonts from '@config/fonts.config';
import design from '@config/design.config';
import { Modal } from './Modal';
import { openCamera, openDocumentPicker, openImageLibrary } from '@utilis/methods/common.method';
import { Loader } from './Loader';
import { Images } from '@assets/images/png';
import appConfig from '@config/app.config';
import { types } from 'react-native-document-picker';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { MultiMediaViewer } from '@views/components/functional/MultiMediaViewer';

interface IPicker {
    label?: string;
    star?: boolean;
    iconType?: string;
    iconName?: string;
    error?: string

    profile?: boolean;
    placeholder?: string
    value: any;
    onChange: (props: any) => void;
    upload?: boolean;
    folder?: string;
    isEditable?: boolean;

    // styles
    container?: ViewStyle;
    inputContainer?: ViewStyle;
    stopAnimation?: boolean;
    pickType?: string;
}

export const Picker = ({ iconType, iconName, label, star, error, container, profile, placeholder, onChange, stopAnimation, value, upload, folder, pickType, isEditable = true }: IPicker) => {
    const [isViewerVisible, setIsViewerVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const position = !stopAnimation ? useSlideAnimation() : {}
    const labelColor = value?.name ? colors.P_TEXT_COLOR : colors.S_TEXT_COLOR

    const onSuccess = (res: any) => {
        setIsLoading(false)
        if (res)
            onChange(res)
    }

    const onError = (res: any) => {
        setIsLoading(false)
    }

    const selectType = () => {
        const common = { onSuccess, onError, upload, folder }
        const props: any = {
            cameraProps: { ...common },
            imageLibraryProps: { ...common },
            documentPickerProps: { ...common },
        }
        switch (pickType) {
            case "image":
                props.cameraProps.type = 'photo';
                props.imageLibraryProps.type = 'photo';
                props.documentPickerProps.type = [types.images];
                break;
            default: null
        }
        return props
    }
    const { cameraProps, imageLibraryProps, documentPickerProps } = selectType() ?? {}


    const openPopUp = () => {
        Alert.alert(
            'Select one to upload',
            '',
            [
                {
                    text: "Pick from camera", onPress: () => {
                        openCamera({ ...cameraProps })
                        setIsLoading(true)
                    }
                },
                {
                    text: "Pick from gallery", onPress: () => {
                        openImageLibrary({ ...imageLibraryProps })
                        setIsLoading(true)
                    }
                },
                {
                    text: "Pick from files", onPress: () => {
                        openDocumentPicker({ ...documentPickerProps })
                        setIsLoading(true)
                    }
                },
                { text: "Cancel", onPress: () => null }
            ],
            {
                cancelable: true,
                onDismiss: () => null
            }
        )
    }

    const mirror = () => {
        if (isEditable) return null
        return (
            <View style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', backgroundColor: colors.TRANS, }} />
        )
    }

    const onDownload = () => {
        // downloadFile({ url: `${appConfig.apiConnections.s3}/${value.key}`, fileName: value.name })
    }

    const imageSource = value.key ? { uri: `${appConfig.apiConnections.s3}/${value.key}` } : value?.local?.uri ? { uri: value.local.uri } : Images.ImageProfileHolder
    return (
        profile ?
            <View>
                <TouchableOpacity onPress={openPopUp} style={styles.profileConatiner} activeOpacity={design.OPACITY_HIGH}>
                    {isLoading ?
                        <ActivityIndicator color={colors.P_TEXT_COLOR} />
                        :
                        <Image source={imageSource} style={design.GENERIC_IMAGE} />
                    }
                </TouchableOpacity>
                {error ?
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: hs(12), }}>
                        {iconType && iconName && (
                            <Icon type={"FontAwesome"} name={"warning"} size={ms(10)} color={colors.RED} style={{ marginRight: ws(6) }} />
                        )}
                        <Text style={[design.GENERIC_ERROR_TEXT, { textAlign: 'right' }]}>{error}</Text>
                    </View>
                    : null}
                {mirror()}
            </View>
            :

            <Animated.View style={[styles.container, position, container,]}>
                {label ?
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {iconType && iconName && (
                            <Icon type={iconType} name={iconName} size={ms(12)} color={labelColor} style={{ marginRight: ws(6) }} />
                        )}
                        <Text style={[styles.labelText, { color: labelColor }]}>{label}</Text>
                        {star && (
                            <Icon type={"AntDesign"} name={"star"} size={ms(6)} color={colors.RED} style={{ marginLeft: ws(2) }} />
                        )}
                        <View style={{ flex: 1 }} />
                        {value?.key ? <Text onPress={() => setIsViewerVisible(true)} style={[styles.labelText, { color: colors.RED }]}>{'View'}</Text> : null}
                    </View>
                    : null}
                <TouchableOpacity onPress={openPopUp} style={styles.inputContainer} activeOpacity={design.OPACITY_HIGH}>
                    {isLoading ? <Loader container={{ backgroundColor: 'tarnsparent' }} /> :
                        <>
                            <Text style={[styles.valueText]}>{value?.name != '' ? value?.name : placeholder}</Text>
                            {value?.name == '' ? <Text style={[styles.valueText]}>{"( Tap here to pick file )"}</Text> : null}
                        </>
                    }
                </TouchableOpacity>

                {error ?
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                        {iconType && iconName && (
                            <Icon type={"FontAwesome"} name={"warning"} size={ms(10)} color={colors.RED} style={{ marginRight: ws(6) }} />
                        )}
                        <Text style={[design.GENERIC_ERROR_TEXT, { textAlign: 'right' }]}>{error}</Text>
                    </View>
                    : null}
                {mirror()}
                <MultiMediaViewer
                    isVisible={isViewerVisible}
                    url={`${appConfig.apiConnections.s3}/${value.key}`}
                    fileName={value.name}
                    onClose={() => setIsViewerVisible(false)}
                />
            </Animated.View>

    )
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: colors.P_BG,
        borderRadius: 6,
        marginVertical: hs(4),
        overflow: 'hidden',
        paddingVertical: hs(8),
        paddingHorizontal: ws(10),
    },
    inputContainer: {
        height: hs(90),
        width: "100%",
        paddingVertical: 0,
        paddingHorizontal: ws(10),
        borderRadius: 6,
        backgroundColor: "#f1f1f1",
        marginVertical: hs(8),
        alignItems: 'center',
        justifyContent: 'center'
    },
    labelText: {
        fontSize: ms(12),
        fontFamily: fonts.SemiBold,
        color: colors.S_TEXT,
    },
    valueText: {
        fontSize: ms(13),
        fontFamily: fonts.Medium,
        color: colors.S_TEXT,
        marginTop: hs(3)
    },
    profileConatiner: {
        height: hs(90),
        width: hs(90),
        borderRadius: 100,
        alignSelf: 'center',
        marginVertical: hs(24),
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.S_BG,
        borderWidth: ms(2),
        borderColor: colors.S_BG,
    }
})