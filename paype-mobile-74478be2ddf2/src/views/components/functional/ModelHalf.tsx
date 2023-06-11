import React from 'react';
import { Modal, View, StyleProp, ViewProps, ScrollViewProps, StyleSheet, } from 'react-native';

import { IHeader, MainHeader } from '@views/components/functional//MainHeader';
import { ScrollView } from '@views/components/functional/Scrollview';
import design from '@config/design.config';
import colors from '@config/colors.config';
import { hs } from '@utilis/designs/measurements.design';


interface IModelHalfInterface {
    visible: boolean;
    onRequestClose: (() => void) | undefined
    title?: string;
    headerProps?: IHeader,
    conatiner?: StyleProp<ViewProps>;
    contentContainer?: StyleProp<ViewProps>;
    scrollContainer?: StyleProp<ScrollViewProps>;
    children?: any;
}

export const ModelHalf = ({ visible, onRequestClose, title, headerProps, conatiner, contentContainer, scrollContainer, children }: IModelHalfInterface) => {
    return (
        <Modal
            visible={visible}
            onRequestClose={onRequestClose}
            animationType={'slide'}
            statusBarTranslucent={true}
            transparent={true}
        >
            <View style={[styles.container, conatiner]}>
                <View style={[styles.contentContainer, contentContainer]}>
                    <MainHeader
                        container={{ paddingTop: 0, height: hs(60) }}
                        render={[
                            { type: "Icon", iconType: "Entypo", iconName: "chevron-left", onPress: onRequestClose },
                            { type: "Title", title: title?? 'Paype' },
                            { type: "Icon" },
                        ]}
                        {...headerProps}
                    />
                    <ScrollView style={[design.GENERIC_SCREEN_S, scrollContainer]} >
                        {children}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.SHADOW,
        justifyContent: 'flex-end'
    },
    contentContainer: {
        backgroundColor: colors.S_BG,
        height: hs(500),
        width: '100%',
        borderRadius: 16,
        overflow: 'hidden'
    }
})



/*
Ref: 
<ModelHalf
    title={"Account Status"}
    visible={isStatusPopUpVisible}
    onRequestClose={() => setIsStatusPopUpVisible(false)}
    headerProps={{
        render: 
        [
            { type: "Icon", iconType: "Entypo", iconName: "chevron-left", onPress: ()=>null },
            { type: "Title", title: "Account Status" },
            { type: "Icon" },
        ]
    }}>

</ModelHalf>

*/