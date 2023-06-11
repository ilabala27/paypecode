import { hp, hs, ms, wp } from '@utilis/designs/measurements.design';
import React from 'react';
import { FlatList as NativeFlatList, FlatListProps, Image, ListRenderItem, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { Images } from '@assets/images/png/index'
import design from '@config/design.config';
import fontsConfig from '@config/fonts.config';
import colors from '@config/colors.config';

interface ICategoryBasedServiceList {
    data: any[];
    renderItem: ListRenderItem<any> | null | undefined;
    numColumns?: number | undefined;
    bottomSpace?: boolean
    hideEmptyComponent?: boolean;
    emptyComponentType?: string
}

export const FlatList = ({ data, renderItem, numColumns, bottomSpace, hideEmptyComponent, emptyComponentType, ...rest }: ICategoryBasedServiceList & FlatListProps<any>) => {
    // if(data?.length == 0)
    // return (
    //     <View style={{ height: '80%', width: '100%' }}>
    //         <Image source={Images.commonNoData1} style={design.GENERIC_IMAGE} />
    //     </View>
    // )
    const renderEmptyComponent = () => {
        if (hideEmptyComponent) return null
        if (emptyComponentType == "String") {
            return (
                <View style={{ height: hs(150), width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.noDataLabel}>No data found</Text>
                </View>
            )
        } else {
            return (
                <View style={{ height: hp('100%'), width: '100%' }}>
                    <Image source={Images.commonNoData1} style={design.GENERIC_IMAGE} />
                </View>
            )
        }
    }

    return (
        <NativeFlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${index}`}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            numColumns={numColumns}
            ListEmptyComponent={renderEmptyComponent}
            contentContainerStyle={[bottomSpace && { paddingBottom: hs(100) }]}
            {...rest}
        />
    );
};

const styles = StyleSheet.create({
    noDataLabel: {
        fontSize: ms(14),
        fontFamily: fontsConfig.Medium,
        color: colors.S_TEXT_COLOR,
    },
})