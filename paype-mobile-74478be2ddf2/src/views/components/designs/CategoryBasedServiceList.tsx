import React, { useEffect, useState } from 'react';
import { Text, View, } from 'react-native';
import design from '@config/design.config';
import { IconWithTag } from './IconWithTag';
import { FlatList } from '../functional/Flatlist';
import { Modal } from '../functional/Modal';
import { toUpper } from '@utilis/methods/string.method';
import colors from '@config/colors.config';
import { hs } from '@utilis/designs/measurements.design';
import { systemTransportor } from '@models/redux/system/system.transportor';

export const viewMore = {
    serv_label: "See All",
    serv_image: "more",
    isActive: true
}

interface ICategoryBasedServiceList {
    data: any[];
    limit?: number;
    numColumns?: number;
    onPress: ((args: any) => void) | undefined
}


export const CategoryBasedServiceList = ({ data, limit = 6, numColumns = 4, onPress }: ICategoryBasedServiceList) => {
    const { systemStore, setSnack } = systemTransportor()
    const [moreList, setMoreList] = useState<any>({})
    const [isMoreVisible, setIsMoreVisible] = useState<boolean>(false)

    useEffect(() => {

    }, [])

    const callToAction = ({ category, categoryIndex, service, serviceIndex, viewMore, directAccess = false }: any) => {
        if (!directAccess && viewMore) {
            if (category) {
                setMoreList({ category, categoryIndex })
                setIsMoreVisible(true)
            } else {
                setMoreList({})
                setIsMoreVisible(false)
            }
        } else if (service) {
            if (service?.is_active) {
                onPress && onPress({ item: service, index: serviceIndex })
            } else {
                if (service?.remarks)
                    setSnack({ message: service?.remarks, type: 'SUCCESS' })
            }
        }
    }

    const RenderServiceIcons = ({ category, categoryIndex, directAccess = false }: any) => {
        const newLimit = directAccess ? 99 : limit
        return (
            <FlatList
                data={category.services}
                numColumns={numColumns}
                style={{ paddingVertical: hs(4) }}
                // columnWrapperStyle={{ justifyContent: 'space-between' }}
                renderItem={({ item: service, index: serviceIndex }) => {
                    if (serviceIndex > newLimit - 1) return null
                    return (
                        <IconWithTag
                            item={serviceIndex == newLimit - 1 ? viewMore : service}
                            index={'serv' + serviceIndex}
                            onPress={() =>
                                callToAction({ category, categoryIndex, service, serviceIndex, viewMore: serviceIndex == newLimit - 1, directAccess })
                            }
                        />
                    )
                }}
            />
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={data}
                renderItem={({ item: category, index: categoryIndex }) => {
                    if (category?.services?.length > 0 && category?.is_active)
                        return (
                            <View style={[design.GENERIC_CARD, { marginVertical: hs(8) }]} key={'cate' + categoryIndex}>
                                <Text style={design.GENERIC_TEXT_TITLE_P} numberOfLines={1}>{category.cate_label}</Text>
                                <RenderServiceIcons category={category} categoryIndex={categoryIndex} />
                            </View>
                        )
                    return null
                }}
            />

            <Modal
                headerProps={{
                    render: [
                        { type: "Icon", iconType: "Entypo", iconName: "chevron-left", onPress: () => setIsMoreVisible(false) },
                        { type: "Title", title: toUpper(moreList?.category?.cate_label) },
                        { type: "Icon" },
                    ]
                }}
                visible={isMoreVisible}
                onRequestClose={() => setIsMoreVisible(false)}
            >
                <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: colors.S_COLOR }}>
                    <RenderServiceIcons category={moreList?.category} categoryIndex={moreList?.categoryIndex} directAccess={true} />
                </View>
            </Modal>
        </View>
    );
};