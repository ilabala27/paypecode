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

    const renderParentItem = ({ item, index }: any) => {
        return (
            <View style={styles.parentContainer}>
                <Text style={design.P_TEXT}>{item.cate_label} ( {item?.services?.length ?? 0} )</Text>
                <FlatList
                    data={item?.services}
                    contentContainerStyle={{ paddingBottom: hs(50) }}
                    renderItem={renderItem}
                    onRefresh={() => getData()}
                    refreshing={false}
                />
            </View>
        )
    }

    const renderItem = ({ item, index }: any) => {
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={() => NavServiceUtils.navigate(NavKeys.ADMIN.MANAGE_SERVICES_FORM, { serv_id: item.serv_id })}
            >
                <View style={{ height: hs(60), width: hs(60), backgroundColor: colors.S_BG, marginRight: ws(16), borderRadius: 8, overflow: 'hidden' }}>
                    {item?.serv_image ?
                        <Image
                            source={{ uri: appConfig.apiConnections.s3 + '/' + item.serv_image }}
                            style={design.GENERIC_IMAGE}
                        />
                        : item?.iconType && item?.iconName && item?.serv_icon_color ?
                            <Icon type={item?.serv_icon_type} name={item?.serv_icon_name} size={30} color={item?.serv_icon_color} />
                            :
                            <Image
                                source={Images.ImageHolder}
                                style={design.GENERIC_IMAGE}
                            />
                    }
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={design.P_TEXT}>{item.serv_label}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.subTitle}>Created {moment(item.created_at).format('DD-MM-YYYY')}</Text>
                        <Text style={styles.subTitle}>Active {item.is_active ? 'Yes' : 'No'}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={design.GENERIC_SCREEN_S}>
            <MainHeader
                render={[
                    { type: "Icon", iconType: "Entypo", iconName: "chevron-left", onPress: () => NavServiceUtils.goBack() },
                    { type: "Title", title: "Manage Services" },
                    {
                        type: "Icon", iconType: "Ionicons", iconName: "ios-add-circle-outline",
                        onPress: () => NavServiceUtils.navigate(NavKeys.ADMIN.MANAGE_SERVICES_FORM)
                    },
                ]}
            />
            {servicesWithCategory?.isLoading ? <Loader /> :
                <FlatList
                    data={servicesWithCategory.data.filter((el) => el?.services?.length > 0)}
                    contentContainerStyle={{ paddingBottom: hs(50) }}
                    renderItem={renderParentItem}
                    onRefresh={() => getData()}
                    refreshing={false}
                />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    parentContainer: {
        borderRadius: 8,
        backgroundColor: colors.P_BG,
        paddingVertical: hs(8),
        paddingHorizontal: ws(12),
        marginTop: hs(8),
        marginHorizontal: ws(8),
        justifyContent: 'center'
    },
    container: {
        flexDirection: 'row',
        borderRadius: 8,
        backgroundColor: colors.P_BG,
        paddingVertical: hs(8),
        paddingHorizontal: ws(12),
        marginTop: hs(8),
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