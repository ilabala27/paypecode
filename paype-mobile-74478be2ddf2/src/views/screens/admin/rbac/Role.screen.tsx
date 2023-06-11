import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, } from 'react-native';

import NavServiceUtils from '@controllers/utils/NavService.utils';
import { MainHeader } from '@views/components/functional/MainHeader';
import { INavigationProps } from '@utilis/interfaces/navigation.interface';
import design from '@config/design.config';
import { adminTransportor } from '@models/redux/admin/admin.transportor';
import { hs, ms, ws } from '@utilis/designs/measurements.design';
import colors from '@config/colors.config';
import { ScrollView } from '@views/components/functional/Scrollview';
import { CheckIconButton, IconButton } from '@views/components/functional/IconButton';
import { NavKeys } from '@controllers/utils/NavKeys.utils';


export default ({ props, route, navigation }: INavigationProps | any) => {
    const { selection, onSelect, selected = [], onClose } = props ?? {}
    const { adminStore, setRoleOptions } = adminTransportor()
    const { rolesTree } = adminStore()

    const onPress = ({ item, index }: any) => {
        if (onSelect) {
            onSelect({ item, index })
        } else {
            NavServiceUtils.navigate(NavKeys.ADMIN.ROLE_FORM, { _id: item._id })
        }
    }

    const renderHierarchicalView = ({ data, level = 0 }: any) => {
        return data.map((item: any, index: number) => {
            const isChildExist = item?.childrens?.length
            return (
                <View
                    style={[
                        styles.hierarchicalContainer, {
                            paddingBottom: isChildExist ? hs(12) : 0,
                            backgroundColor: level % 2 == 0 ? colors.WHITE1 : colors.WHITE2,
                        }
                    ]}
                    key={index}
                >
                    <TouchableOpacity
                        onPress={() => onPress({ item, index })}
                        style={styles.cardContainer}
                        activeOpacity={design.OPACITY_AVG}
                    >
                        {selection &&
                            <CheckIconButton active={selected?.includes(item._id)} />
                        }
                        <Text style={[design.GENERIC_TEXT_HEADER_P, {}]}>{item.role_name}</Text>
                        {!selection &&
                            <IconButton
                                iconType='Ionicons'
                                iconName='add-circle'
                                onPress={() =>
                                    NavServiceUtils.navigate(NavKeys.ADMIN.ROLE_FORM, {
                                        parent_id: item._id
                                    })
                                }
                                container={{ backgroundColor: colors.TRANS, }}
                                iconProps={{ size: ms(16), color: colors.P_COLOR_DARK }}
                            />
                        }
                    </TouchableOpacity>
                    {item?.childrens?.length > 0 &&
                        renderHierarchicalView({ data: item.childrens, level: level + 1 })
                    }
                </View>
            )
        })
    }

    const onRefresh = () => {
        setRoleOptions({ body: { "roleId": "root" } })
    }

    return (
        <View style={design.GENERIC_SCREEN_S}>
            <MainHeader
                render={[
                    {
                        type: "Icon", iconType: "Entypo", iconName: "chevron-left",
                        onPress: () => onClose ? onClose() : NavServiceUtils.goBack()
                    },
                    { type: "Title", title: "Roles" },
                    { type: "Icon" },
                ]}
            />
            <ScrollView horizontal nestedScrollEnabled contentContainerStyle={{ flexGrow: 1, alignItems: 'flex-start', }}>
                <ScrollView
                    nestedScrollEnabled
                    onRefresh={onRefresh}
                    refreshing={false}
                >
                    {renderHierarchicalView({ data: rolesTree })}
                </ScrollView>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    hierarchicalContainer: {
        paddingLeft: ws(24),
        paddingRight: ws(24),
        borderRadius: 6,
        marginVertical: hs(1)
    },
    cardContainer: {
        flexDirection: 'row',
        height: hs(45),
        alignItems: 'center'
    }
})