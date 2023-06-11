import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';

import NavServiceUtils from '@controllers/utils/NavService.utils';
import { MainHeader } from '@views/components/functional/MainHeader';
import { INavigationProps, } from '@utilis/interfaces/navigation.interface';
import design from '@config/design.config';
import { NavKeys } from '@controllers/utils/NavKeys.utils';
import { FlatList } from '@views/components/functional/Flatlist';
import { hs, ms, ws } from '@utilis/designs/measurements.design';
import colors from '@config/colors.config';
import { Loader } from '@views/components/functional/Loader';
import moment from 'moment';
import { servicesTransportor } from '@models/redux/services/services.transportor';
import fontsConfig from '@config/fonts.config';
import { Icon } from '@views/components/functional/Icon';
import { Images } from '@assets/images/png';
import appConfig from '@config/app.config';


export default ({ route, navigation }: INavigationProps) => {
    const { servicesStore, setServicesWithCategories } = servicesTransportor()
    const { servicesWithCategory } = servicesStore()

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        setServicesWithCategories({})
    }

    const renderItem = ({ item, index }: any) => {
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={() => NavServiceUtils.navigate(NavKeys.ADMIN.MANAGE_CATEGORIES_FORM, { cate_id: item.cate_id })}
            >
                <View style={{ height: hs(60), width: hs(60), backgroundColor: colors.S_BG, marginRight: ws(16), borderRadius: 8, overflow: 'hidden' }}>
                    {item?.cate_image ?
                        <Image
                            source={{ uri: appConfig.apiConnections.s3 + '/' + item.cate_image }}
                            style={design.GENERIC_IMAGE}
                        />
                        : item?.iconType && item?.iconName && item?.cate_icon_color ?
                            <Icon type={item?.cate_icon_type} name={item?.cate_icon_name} size={30} color={item?.cate_icon_color} />
                            :
                            <Image
                                source={Images.ImageHolder}
                                style={design.GENERIC_IMAGE}
                            />
                    }
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={design.P_TEXT}>{item.cate_label}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.subTitle}>Created {moment(item.created_at).format('DD-MM-YYYY')}</Text>
                        <Text style={styles.subTitle}>Active {item.is_active ? 'Yes' : 'No'}</Text>
                    </View>
                    <Text style={styles.title}>Services {item?.services?.length ?? 0}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={design.GENERIC_SCREEN_S}>
            <MainHeader
                render={[
                    { type: "Icon", iconType: "Entypo", iconName: "chevron-left", onPress: () => NavServiceUtils.goBack() },
                    { type: "Title", title: "Manage Categories" },
                    {
                        type: "Icon", iconType: "Ionicons", iconName: "ios-add-circle-outline",
                        onPress: () => NavServiceUtils.navigate(NavKeys.ADMIN.MANAGE_CATEGORIES_FORM)
                    },
                ]}
            />
            {servicesWithCategory?.isLoading ? <Loader /> :
                <FlatList
                    data={servicesWithCategory.data}
                    contentContainerStyle={{ paddingBottom: hs(50) }}
                    renderItem={renderItem}
                    onRefresh={() => getData()}
                    refreshing={false}
                />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: 8,
        backgroundColor: colors.P_BG,
        paddingVertical: hs(8),
        paddingHorizontal: ws(12),
        marginTop: hs(8),
        marginHorizontal: ws(8),
        justifyContent: 'center'
    },
    title: {
        fontSize: ms(12),
        fontFamily: fontsConfig.Bold,
        color: colors.P_TEXT_COLOR,
    },
    subTitle: {
        fontSize: ms(12),
        fontFamily: fontsConfig.Medium,
        color: colors.S_TEXT_COLOR,
    },
})