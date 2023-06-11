import React, { useState } from 'react';
import { } from 'react-native';
import { MainHeader } from '@views/components/functional/MainHeader';
import { INavigationProps } from '@utilis/interfaces/navigation.interface';
import { Loader } from '@views/components/functional/Loader';
import { FlatList } from '@views/components/functional/Flatlist';
import { hs } from '@utilis/designs/measurements.design';
import NavServiceUtils from '@controllers/utils/NavService.utils';
import { TitleWithList } from '@views/components/designs/TitleWithList';
import { ScrollView } from '@views/components/functional/Scrollview';
import { GradientView } from '@views/components/functional/GradientView';
import { NavKeys } from '@controllers/utils/NavKeys.utils';

export default ({ route, navigation }: INavigationProps) => {
    const [isLoading, setIsLoading] = useState(false)

    const list = [
        {
            name: "Through Bank", key: "user-onboarding", visible: true,
            childrens: [
                { name: "Cash Deposit", iconType: 'FontAwesome', icon: 'bank', key: "languages", visible: true, onPress: () => { NavServiceUtils.navigate(NavKeys.WALLET.CASH_DEPOSIT_FORM) } },
            ]
        },
        // {
        //     name: "Payment gateway", key: "user-onboarding", visible: true,
        //     childrens: [
        //         { name: "Razor pay", iconType: 'MaterialIcons', icon: 'payments', key: "languages", visible: true, onPress: () => { NavServiceUtils.navigate(NavKeys.WALLET.RAZOR_PAY_FORM) } },
        //     ]
        // }
    ]

    return (
        <GradientView style={{ flex: 1 }} x={1} y={0}>
            <MainHeader
                render={[
                    {
                        type: "Icon", iconType: "Entypo", iconName: "chevron-left",
                        onPress: () => NavServiceUtils.goBack()
                    },
                    { type: "Title", title: "Refill options" },
                    { type: "Icon" },
                ]}
            />
            {isLoading ? <Loader /> :
                <ScrollView contentContainerStyle={{ paddingBottom: hs(100) }}>
                    <FlatList
                        data={list}
                        bottomSpace={true}
                        renderItem={({ item, index }) => {
                            return (
                                item.visible &&
                                <TitleWithList
                                    item={item}
                                    index={index}
                                    listContainer={{ width: '95%', alignSelf: 'center', borderRadius: 8, marginVertical: hs(8) }}
                                />
                            )
                        }}
                    />
                </ScrollView>
            }
        </GradientView>
    );
};