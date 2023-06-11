import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { FlatList } from './Flatlist';
import { rechargeTransportor } from '@models/redux/recharge/recharge.transportor';
import { hs, ms, ws } from '@utilis/designs/measurements.design';
import design from '@config/design.config';
import colors from '@config/colors.config';
import fontsConfig from '@config/fonts.config';
import { systemTransportor } from '@models/redux/system/system.transportor';
import { getFormattedHistoryContact, getFormattedMobileContact } from '@utilis/methods/string.method';

interface IMobileContactBookInterface {
    type: 'phone book' | 'recharge history';
    label?: string;
    selected?: string[]
    onSelect?: ((props: any) => void) | undefined;
    searchString?: string;
    showNoData?: boolean
}

export const MobileContactBook = ({ type, label, selected, onSelect, searchString = '', showNoData }: IMobileContactBookInterface) => {
    const { systemStore } = systemTransportor()
    const { user_id, user_name, user_mobile_no, user_email, user_image, is_active, ...rest } = systemStore()?.user ?? {}
    const { rechargeStore, getContacts, setHistory } = rechargeTransportor()
    const { history, mobileContacts } = rechargeStore()

    // ### Local state management
    const [coreList, setCoreList] = useState([])
    const [list, setList] = useState([])
    useEffect(() => {
        const coreList: any =
            type == 'phone book' ? getFormattedMobileContact(mobileContacts)
                : type == 'recharge history' ? getFormattedHistoryContact(history?.data)
                    : []

        setCoreList(coreList)
    }, [history, mobileContacts])

    // ### on mount
    useEffect(() => getData(), [])
    const getData = () => {
        if (type == 'phone book') {
            getContacts()
        } else if (type == 'recharge history') {
            const body = { "retr_user_id": user_id }
            setHistory({ body })
        }
    }

    // ### Filter conatct
    useEffect(() => filterContacts(searchString), [coreList, searchString])
    const filterContacts = (text: string) => {
        if (!searchString) setList(coreList)
        else {
            const contacts = coreList.filter((el: any) => {
                return el?.name?.includes(text) || el?.number?.includes(text)
            })
            setList(contacts)
            return
        }
    }

    // ### No data render
    const noRecordFound = () => {
        return (
            <View style={styles.emptyCard}>
                <Text style={styles.title}>{"No data found"}</Text>
            </View>
        )
    }

    return (
        list?.length == 0 && !showNoData? null :
        <View>
            <Text style={styles.tag}>{label ?? "Contact Book"}</Text>
            {list?.length == 0 ? noRecordFound() :
                <FlatList
                    listKey={type}
                    data={list}
                    contentContainerStyle={{ paddingVertical: hs(8) }}
                    hideEmptyComponent={true}
                    renderItem={({ item, index }: any) => {
                        const borderColor = selected?.includes(item.number) ? colors.P_TEXT_COLOR : colors.P_BG
                        return (
                            <TouchableOpacity
                                onPress={() => onSelect && onSelect(item.number)}
                                style={[styles.contactCard, { borderColor }]}
                                activeOpacity={design.OPACITY_AVG}
                                key={index + '/' + index}
                            >
                                {item.label ? <Text style={styles.triTitle}>{item.label}</Text> : null}
                                {item.name ? <Text style={styles.title}>{item.name}</Text> : null}
                                <Text style={styles.subTitle}>{item.number}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            }
        </View>
    )
};

const styles = StyleSheet.create({
    contactCard: {
        backgroundColor: colors.P_BG,
        borderRadius: 8,
        paddingHorizontal: ws(16),
        paddingVertical: hs(8),
        marginHorizontal: ws(8),
        marginVertical: hs(4),
        borderLeftWidth: ws(4),
    },
    emptyCard: {
        backgroundColor: colors.P_BG,
        borderRadius: 8,
        paddingHorizontal: ws(16),
        paddingVertical: hs(32),
        marginHorizontal: ws(8),
        marginVertical: hs(4),
        alignItems: 'center',
    },
    title: {
        fontSize: ms(13),
        fontFamily: fontsConfig.Bold,
        color: colors.P_TEXT_COLOR,
    },
    subTitle: {
        fontSize: ms(11),
        fontFamily: fontsConfig.Medium,
        color: colors.S_TEXT_COLOR,
    },
    triTitle: {
        fontSize: ms(10),
        fontFamily: fontsConfig.Regular,
        color: colors.T_TEXT_COLOR,
    },
    tag: {
        fontSize: ms(13),
        fontFamily: fontsConfig.Bold,
        color: colors.S_TEXT,
        alignSelf: 'center',
        paddingHorizontal: ws(8),
        marginVertical: hs(16),
    }
})