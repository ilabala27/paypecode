import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, StyleProp, ViewProps, ViewStyle } from 'react-native';

import { Icon } from '@views/components/functional/Icon';
import design from '@config/design.config';
import { hs, ws } from '@utilis/designs/measurements.design';
import { Images } from '@assets/images/png';
import { FlatList } from '../functional/Flatlist';
import colors from '@config/colors.config';
import NavigationServiceUtils from '@controllers/utils/NavService.utils';


interface ITitleWithList {
    item: any,
    index: number;
    onPress?: ((args: any) => void) | undefined;
    listContainer?: StyleProp<ViewStyle>;
}

export const TitleWithList = ({ item, index, listContainer }: ITitleWithList) => {
    return (
        <View style={[styles.listContainer, listContainer]} key={index}>
            <Text style={[design.GENERIC_TEXT_HEADER_P, { paddingVertical: hs(8), color: colors.P_TEXT_COLOR }]}>{item.name}</Text>
            <FlatList
                data={item.childrens}
                renderItem={({ item, index }) => {
                    return (
                        item.visible &&
                        <TouchableOpacity
                            onPress={() => item?.onPress ? item?.onPress() : item?.navKey ? NavigationServiceUtils.navigate(item.navKey, item.params) : null}
                            style={styles.list}
                            key={index}
                            activeOpacity={design.OPACITY_AVG}
                        >
                            <Icon type={item.iconType} name={item.icon} size={18} color={colors.S_TEXT_COLOR} style={{ width: ws(32), marginRight: ws(8), textAlign: 'center' }} />
                            <Text style={design.GENERIC_TEXT_TITLE_P}>{item.name}</Text>
                            <View style={{ flex: 1 }} />
                            <Icon type={"Entypo"} name={"chevron-right"} size={18} color={colors.T_TEXT_COLOR} />
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        width: '100%',
        paddingVertical: hs(8),
        paddingHorizontal: ws(16),
        backgroundColor: colors.P_BG,
        marginBottom: hs(8)
    },
    list: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: hs(12),
        paddingRight: ws(16),
        marginBottom: 1
    }
})