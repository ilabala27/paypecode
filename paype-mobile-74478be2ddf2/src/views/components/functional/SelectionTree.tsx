import React, { ReactChildren, ReactNode, useState } from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity, Modal } from 'react-native'

import { Icon } from './Icon';
import { FlatList } from './Flatlist';
import { toUpper } from '@utilis/methods/string.method';
import { useSlideAnimation } from '@utilis/hooks/animations/slide.animation';
import { hs, ms, wp, ws } from '@utilis/designs/measurements.design';
import colors from '@config/colors.config';
import fonts from '@config/fonts.config';
import design from '@config/design.config';


interface ISelectionTree {
    label?: string;
    star?: boolean;
    iconType?: string;
    iconName?: string;
    placeholder?: string;
    error?: string
    values: any[];
    isEditable?: boolean;
    modelContent?: (props: any) => ReactNode;
}

export const SelectionTree = ({
    iconType, iconName, label, star, error, placeholder, values,
    isEditable = true, modelContent
}: ISelectionTree) => {
    const position = useSlideAnimation()
    const [isPopUpVisible, setIsPopUpVisible] = useState(false)
    const isValueExist = values.length > 0
    const labelColor = isValueExist ? colors.P_TEXT_COLOR : colors.S_TEXT_COLOR

    const dropArrow = () => {
        return (
            <Icon
                type={"Entypo"}
                name={"chevron-up"}
                size={ms(22)}
                style={{ position: 'absolute', right: ws(10), color: colors.S_TEXT_COLOR }}
            />
        )
    }

    const placeHolder = () => {
        const count = values.length
        return (
            <TouchableOpacity onPress={() => setIsPopUpVisible(true)} style={styles.textContainer} activeOpacity={design.OPACITY_AVG}>
                <Text style={[styles.textValue, { color: count? colors.S_TEXT_COLOR : colors.T_TEXT }]}>{count? `${count} values selected` : placeholder}</Text>
                {dropArrow()}
            </TouchableOpacity>
        )
    }

    return (
        <>
            <Animated.View style={[styles.container, position]}>
                {label ?
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {iconType && iconName && (
                            <Icon type={iconType} name={iconName} size={ms(12)} color={labelColor} style={{ marginRight: ws(6) }} />
                        )}
                        <Text style={[styles.labelText, { color: labelColor }]}>{label}</Text>
                        {star && (
                            <Icon type={"AntDesign"} name={"star"} size={ms(6)} color={colors.RED} style={{ marginLeft: ws(2) }} />
                        )}
                    </View>
                    : null}
                <View>
                    {placeHolder()}
                    {!isEditable ?
                        <View style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', backgroundColor: colors.TRANS, }} />
                        : null}
                </View>
                {error ?
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                        {iconType && iconName && (
                            <Icon type={"FontAwesome"} name={"warning"} size={ms(10)} color={colors.RED} style={{ marginRight: ws(6) }} />
                        )}
                        <Text style={[design.GENERIC_ERROR_TEXT, { textAlign: 'right' }]}>{error}</Text>
                    </View>
                    : null}
            </Animated.View>

            {/* Modal View */}
            <Modal
                visible={isPopUpVisible}
                onRequestClose={() => setIsPopUpVisible(false)}
                transparent={false}
                statusBarTranslucent={true}
                animationType={'slide'}
            >
                {modelContent && modelContent({ onClose: setIsPopUpVisible })}
            </Modal>
        </>
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
        paddingHorizontal: ws(10)
    },
    textValue: {
        fontSize: ms(13),
        fontFamily: fonts.Medium,
        color: colors.P_TEXT,
    },
    textContainer: {
        height: hs(45),
        width: "100%",
        paddingVertical: 0,
        paddingHorizontal: ws(10),
        borderRadius: 6,
        marginTop: hs(8),
        marginBottom: hs(4),
        backgroundColor: colors.WHITE2,
        justifyContent: "center"
    },
    labelText: {
        fontSize: ms(12),
        fontFamily: fonts.SemiBold,
        color: colors.S_TEXT_COLOR,
    }
})