import React, { useState } from 'react';
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
import { Icon } from '@views/components/functional/Icon';


export default ({ route, navigation, ...rest }: INavigationProps | any) => {
    const { selection, onSelect, selected = [], onClose } = rest ?? {}
    const { adminStore, setPermissionGroupOptions } = adminTransportor()
    const [showSelection, setShowSelection] = useState(false)
    const { permissionGroupsTree } = adminStore()

    const onPress = ({ item, index }: any) => {
        if (onSelect) {
            onSelect({ item, index })
        } else {
            NavServiceUtils.navigate(NavKeys.ADMIN.PERMISSION_GROUP_FORM, { _id: item._id })
        }
    }

    const renderHierarchicalView = ({ data, level = 0 }: any) => {
        return data.map((item: any, index: number) => {
            const isChildExist = item?.childrens?.length
            const isActive = selected.find((el: any) => el == item._id)
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
                        {!showSelection || (isActive && showSelection) ?
                            <>
                                {selection &&
                                    <CheckIconButton active={selected?.includes(item._id)} disabled={true}/>
                                }
                                {item.pegr_isFolder &&
                                    <Icon type='FontAwesome' name='folder-open' color='grey' size={ms(20)} style={{ marginRight: ws(5) }} />
                                }
                                <Text style={[design.GENERIC_TEXT_HEADER_P, {}]}>
                                    {item.pegr_name}
                                    {!item.pegr_isFolder && `  ( ${item?.pegr_permissions?.length} )`}
                                </Text>
                                {!selection &&
                                    <IconButton
                                        iconType='Ionicons'
                                        iconName='add-circle'
                                        onPress={() =>
                                            NavServiceUtils.navigate(NavKeys.ADMIN.PERMISSION_GROUP_FORM, {
                                                parent_id: item._id
                                            })
                                        }
                                        container={{ backgroundColor: colors.TRANS, }}
                                        iconProps={{ size: ms(16), color: colors.P_COLOR_DARK }}
                                    />
                                }
                            </>
                            : null}
                    </TouchableOpacity>
                    {item?.childrens?.length > 0 &&
                        renderHierarchicalView({ data: item.childrens, level: level + 1 })
                    }
                </View>
            )
        })
    }

    const onRefresh = () => {
        setPermissionGroupOptions({ body: { "permissionGroupId": "root" } })
    }

    return (
        <View style={design.GENERIC_SCREEN_S}>
            <MainHeader
                render={[
                    {
                        type: "Icon", iconType: "Entypo", iconName: "chevron-left",
                        onPress: () => onClose ? onClose() : NavServiceUtils.goBack()
                    },
                    { type: "Title", title: "Permission Groups" },
                    !selection ?
                        { type: "Icon" }
                        :
                        {
                            type: "Icon",
                            iconType: "Ionicons",
                            iconName: showSelection ? "ios-eye" : "ios-eye-off",
                            onPress: () => setShowSelection(!showSelection)
                        },
                ]}
            />
            <ScrollView horizontal nestedScrollEnabled contentContainerStyle={{ flexGrow: 1, alignItems: 'flex-start', }}>
                <ScrollView
                    nestedScrollEnabled
                    onRefresh={onRefresh}
                    refreshing={false}
                >
                    {renderHierarchicalView({ data: permissionGroupsTree })}
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