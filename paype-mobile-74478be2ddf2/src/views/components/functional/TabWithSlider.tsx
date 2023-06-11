import React, { useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View, ScrollView, } from 'react-native';
import { TabView, TabBar, SceneRendererProps } from 'react-native-tab-view';


import { hs, wp, ws } from '@utilis/designs/measurements.design';
import design from '@config/design.config';
import colors from '@config/colors.config';


interface ITab { key: string, title: string, index: number }
interface ITabWithSlider {
    tabs: ITab[];
    renderScene: (props: SceneRendererProps & { route: ITab }) => React.ReactNode
    initialTab?: number
}

export const TabWithSlider = ({ tabs, renderScene, initialTab = 0 }: ITabWithSlider) => {
    const scrollViewRef = useRef<any>();
    const [routes] = useState(tabs);
    const [index, setIndex] = useState(initialTab);

    useEffect(() => {
        scrollViewRef?.current?.scrollTo({ x: index * ws(100) })
    }, [index])

    const renderTabBar = (props: any) => {
        return (
            <View style={{ height: hs(35), width: '100%', backgroundColor: colors.S_COLOR }}>
                <ScrollView ref={scrollViewRef} horizontal showsHorizontalScrollIndicator={false}>
                    <TabBar
                        {...props}
                        indicatorStyle={{ backgroundColor: colors.P_TEXT_COLOR, height: hs(2.5), width: ws(100), borderRadius: 100 }}
                        style={{ backgroundColor: colors.S_COLOR }}
                        renderTabBarItem={({ route, focused, color, navigationState, onPress, ...rest }: any) => {
                            return (
                                <TouchableOpacity onPress={onPress} style={{ height: hs(35), width: ws(100), alignItems: "center", justifyContent: "center", }} key={route.key} activeOpacity={design.OPACITY_AVG}>
                                    <Text style={[design.GENERIC_TEXT_TITLE_P, { color: colors.P_TEXT_COLOR }]}>{route.title}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </ScrollView>
            </View>
        )
    };


    return (
        <TabView
            navigationState={{ routes, index }}
            renderTabBar={renderTabBar}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: wp('100%') }}
        />
    );
};