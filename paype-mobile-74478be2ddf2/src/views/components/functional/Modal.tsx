import React from 'react';
import { Modal as NativeModal, ModalProps, StyleProp, ViewStyle, } from 'react-native';

import { IHeader, MainHeader } from '@views/components/functional//MainHeader';
import { ScrollView } from '@views/components/functional/Scrollview';
import design from '@config/design.config';


interface IModalInterface {
    headerProps?: IHeader,
    children?: any;
    visible?: boolean;
    onRequestClose?: (() => void) | undefined;
    container?: StyleProp<ViewStyle>;
}

export const Modal = ({ visible, onRequestClose, headerProps, children, container, ...rest }: IModalInterface & ModalProps) => {
    return (
        <NativeModal
            visible={visible}
            onRequestClose={onRequestClose}
            transparent={false}
            statusBarTranslucent={true}
            animationType={'slide'}
            {...rest}
        >
            {headerProps? <MainHeader {...headerProps} /> : null}
            <ScrollView style={[design.GENERIC_CONTAINER_P, { backgroundColor: 'white' }, container]} >
                {children}
            </ScrollView>
        </NativeModal>
    );
};
