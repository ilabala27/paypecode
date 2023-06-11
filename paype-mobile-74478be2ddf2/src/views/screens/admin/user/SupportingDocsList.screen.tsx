import React, { useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';

import NavServiceUtils from '@controllers/utils/NavService.utils';
import { MainHeader } from '@views/components/functional/MainHeader';
import { INavigationProps2 } from '@utilis/interfaces/navigation.interface';
import design from '@config/design.config';
import { NavKeys } from '@controllers/utils/NavKeys.utils';
import { FlatList } from '@views/components/functional/Flatlist';
import { hs, ms, ws } from '@utilis/designs/measurements.design';
import colors from '@config/colors.config';
import fonts from '@config/fonts.config';
import { systemTransportor } from '@models/redux/system/system.transportor';
import PPUserAPIs from '@models/api/paype/user/user.api';
import { Loader } from '@views/components/functional/Loader';
import moment from 'moment';
import { Button } from '@views/components/functional/Button';
import appConfig from '@config/app.config';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';


export default ({ route, navigation }: INavigationProps2) => {
    const { user_id, folder, isEditable } = route.params
    const { setSnack } = systemTransportor()
    const [data, setData] = useState({
        list: [],
        isLoading: false
    })

    const isFocused = useIsFocused()
    useFocusEffect(
        React.useCallback(() => {
            getSupportingDocs()
            return () => null;
        }, [isFocused])
    )

    const getSupportingDocs = () => {
        if (!data.isLoading) {
            setData({ ...data, isLoading: true })
            let body: any = {
                docu_user_id: user_id,
                is_deleted: false
            }
            PPUserAPIs.getDocumentByFields({ body }).then((res: any) => {
                setData({ list: res.data, isLoading: false })
            }).catch(({ message }: any) => {
                setData({ ...data, isLoading: false })
                setSnack({ message, type: 'ERROR' })
            })
        }
    }

    const renderItem = ({ item, index }: any) => {
        return (
            <TouchableOpacity
                style={design.CARD}
                onPress={() => NavServiceUtils.navigate(NavKeys.ADMIN.USER_ONBOARDING_SUPPORTING_DOCS, { user_id, folder, document_id: item?._id, isEditable })}
            >
                <Text style={design.P_TEXT}>{item.docu_name}</Text>
                <Text style={design.S_TEXT}>{item.docu_media_name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: hs(6) }}>
                    <Text style={design.S_TEXT}></Text>
                    <Text style={design.S_TEXT}>Uploaded on {moment(item.created_at).format('DD-MM-YYYY')}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={design.GENERIC_SCREEN_S}>
            <MainHeader
                render={[
                    { type: "Icon", iconType: "Entypo", iconName: "chevron-left", onPress: () => NavServiceUtils.goBack() },
                    { type: "Title", title: "Supporting document details" },
                    { type: "Icon" },
                ]}
            />
            {data?.isLoading ? <Loader /> :
                <>
                    <FlatList
                        data={data.list}
                        contentContainerStyle={{ paddingBottom: hs(50) }}
                        renderItem={renderItem}
                        onRefresh={() => getSupportingDocs()}
                        refreshing={false}
                    />
                    {isEditable ?
                        <Button
                            label={'Add New'}
                            isLoading={false}
                            onPress={() => NavServiceUtils.navigate(NavKeys.ADMIN.USER_ONBOARDING_SUPPORTING_DOCS, { user_id, folder, isEditable })}
                            style={{ marginBottom: hs(40), marginTop: hs(20), zIndex: 1 }}
                        />
                        : null}
                </>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    textValue: {
        flex: 1,
        fontSize: ms(13),
        fontFamily: fonts.Medium,
        color: colors.P_TEXT,
    },
    textContainer: {
        flexDirection: 'row',
        height: hs(45),
        width: "100%",
        paddingVertical: 0,
        paddingHorizontal: ws(10),
        borderRadius: 6,
        marginVertical: hs(4),
        backgroundColor: colors.WHITE1,
        alignItems: 'center',
        justifyContent: "center",
    },
    iconConatiner: {
        height: hs(40),
        width: ws(40),
        margin: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})