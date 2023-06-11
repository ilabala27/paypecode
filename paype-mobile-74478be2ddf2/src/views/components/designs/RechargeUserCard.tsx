import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { hs, ws } from '@utilis/designs/measurements.design';
import design from '@config/design.config';
import colors from '@config/colors.config';


interface IRechargeUserCard {
    item: any;
    index: number;
    onPress?: ((args: any) => void) | undefined;
}

export const RechargeUserCard = ({ item, index, onPress }: IRechargeUserCard) => {
    return (
        <TouchableOpacity
            onPress={() => onPress && onPress({ item, index })}
            style={styles.container}
            activeOpacity={design.OPACITY_AVG}
            key={index}
        >
            <Text style={[design.GENERIC_TEXT_HEADER_P]}>{item?.mobile} </Text>
            <Text style={[design.GENERIC_TEXT_CONTENT_P]}>{item?.provider?.name} - {item?.provider?.category}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        ...design.GENERIC_PADDING_VERTICAL_LOW,
        ...design.GENERIC_PADDING_HORIZONTAL_AVG,
        backgroundColor: colors.P_BG,
        marginVertical: hs(5),
        borderRadius: 5
    }
})