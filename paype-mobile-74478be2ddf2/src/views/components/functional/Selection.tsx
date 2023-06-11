import React, { useState } from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native'

import { Icon } from './Icon';
import { FlatList } from './Flatlist';
import { Modal } from './Modal';
import { toUpper } from '@utilis/methods/string.method';
import { useSlideAnimation } from '@utilis/hooks/animations/slide.animation';
import { hs, ms, wp, ws } from '@utilis/designs/measurements.design';
import colors from '@config/colors.config';
import fonts from '@config/fonts.config';
import design from '@config/design.config';


interface ISelection {
    _key: string;
    label?: string;
    star?: boolean;
    iconType?: string;
    iconName?: string;
    placeholder?: string;
    error?: string
    options: any[];
    withOptionsTag?: boolean;
    values: any[];
    onAction?: ((props: any) => void) | undefined;
    closeAfterSelect?: boolean;
    multi?: boolean;
    showArrow?: boolean;
    isEditable?: boolean;
    renderItem?: (props: any) => React.ReactElement
}

export const Selection = ({
    _key, iconType, iconName, label, star, error, placeholder, options, withOptionsTag, values,
    onAction, closeAfterSelect, multi, showArrow, isEditable = true, renderItem: RenderItem
}: ISelection) => {
    const position = useSlideAnimation()
    const [isPopUpVisible, setIsPopUpVisible] = useState(false)
    const isValueExist = values.length > 0
    const labelColor = isValueExist ? colors.P_TEXT_COLOR : colors.S_TEXT_COLOR

    const dropArrow = () => {
        return (
            <Icon
                type={"Entypo"}
                name={"chevron-down"}
                size={ms(22)}
                style={{ position: 'absolute', right: ws(10), color: colors.S_TEXT_COLOR }}
            />
        )
    }

    const placeHolder = () => {
        return (
            <TouchableOpacity onPress={() => setIsPopUpVisible(true)} style={styles.textContainer} activeOpacity={design.OPACITY_AVG}>
                <Text style={[styles.textValue, { color: colors.T_TEXT }]}>{placeholder}</Text>
                {dropArrow()}
            </TouchableOpacity>
        )
    }

    const valueHolder = () => {
        return (
            <FlatList
                listKey={'Selected_values' + _key}
                data={values}
                renderItem={({ item, index }) => renderItem({ item, index, isGrantActive: true, showDelete: multi, showArrow: !multi && showArrow, key: _key + 'C' })}
            />
        )
    }

    const renderItem = ({ item, index, isActive, isGrantActive, showArrow, showDelete, key }: any) => {
        const backgroundColor = isActive ? colors.P_TEXT_COLOR : colors.WHITE2
        const color = isActive ? colors.WHITE1 : colors.S_TEXT_COLOR
        const onPress = () => {
            if (isGrantActive && !showDelete) {
                setIsPopUpVisible(true)
            } else {
                onAction && onAction({ item, index })
                if (closeAfterSelect)
                    setIsPopUpVisible(false)
            }
        }

        if (RenderItem)
            return <RenderItem {...{ item, index, isActive, backgroundColor, color, onPress, key }} />
        return (
            <TouchableOpacity
                onPress={onPress}
                style={[styles.textContainer, { backgroundColor }]}
                activeOpacity={design.OPACITY_AVG}
                key={key + index}
            >
                <Text style={[styles.textValue, { color }]}>{item.name}</Text>
                {showArrow ? dropArrow()
                    : (isActive || isGrantActive) && showDelete ?
                        <Icon
                            onPress={() => onAction && onAction({ item, index })}
                            type={"MaterialCommunityIcons"}
                            name={"delete"}
                            size={ms(22)}
                            style={{ position: 'absolute', right: ws(10), color: colors.RED }}
                        />
                        : null}
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
                    {multi && isValueExist ?
                        <>
                            {placeHolder()}
                            {valueHolder()}
                        </>
                        : isValueExist ?
                            valueHolder()
                            : placeHolder()
                    }
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
                headerProps={{
                    render: [
                        { type: "Icon", iconType: "Entypo", iconName: "chevron-left", onPress: () => setIsPopUpVisible(false) },
                        { type: "Title", title: toUpper(label) },
                        { type: "Icon" },
                    ]
                }}
                visible={isPopUpVisible}
                onRequestClose={() => setIsPopUpVisible(false)}
            >
                <FlatList
                    key={'#'}
                    listKey={'Parent_Options' + _key}
                    data={options}
                    renderItem={({ item, index }) => {
                        if (withOptionsTag) {
                            return (
                                <>
                                    <Text style={[design.GENERIC_TEXT_HEADER_P, { marginVertical: hs(10) }]}>{item.name}</Text>
                                    <FlatList
                                        key={'£'}
                                        listKey={'Child_Options' + _key}
                                        data={item.values}
                                        renderItem={({ item, index }) => {
                                            let isActive = values.find((el) => el.key == item.key)
                                            return renderItem({ item, index, isActive, showDelete: multi, showArrow: false, key: _key + 'A' })
                                        }}
                                    />
                                </>
                            )
                        } else {
                            let isActive = values.find((el) => el.key == item.key)
                            return renderItem({ item, index, isActive, showDelete: multi, showArrow: false, key: _key + 'B' })
                        }
                    }}
                />
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
        color: colors.P_TEXT_COLOR,
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


/*
Ref: 
    Single: onAction={({ item, index }) => setDataToForm('user_type', canPushNorPop([], item, 'name'))}
    Multi: onAction={({ item, index }) => setDataToForm('user_role', canPushNorPop(form.user_role, item, 'name'))}
*/

