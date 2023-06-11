import React from 'react'
import { BottomTabBar, BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavKeys } from '@controllers/utils/NavKeys.utils';
import DashboardScreen from '@views/screens/mainTab/Dashboard.screen';
import ConsoleScreen from '@views/screens/mainTab/Console.screen';
import { View } from 'react-native';
import { hs, ms, ws } from '@utilis/designs/measurements.design';
import { Icon } from '@views/components/functional/Icon';
import colors from '@config/colors.config';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@views/components/functional/BlurView';
import ForumScreen from '@views/screens/mainTab/Forum.screen';
import CategoryScreen from '@views/screens/mainTab/Category.screen';
import WalletScreen from '@views/screens/mainTab/Wallet.screen';
import { AppExit } from '@utilis/hooks/system/AppExit';
import { useIsFocused } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const RenderIcon = ({ type, name, color, focused }: any) => {
    if (!focused) return <Icon type={type} name={name} color={color} size={ms(24)} />
    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[colors.P_COLOR, colors.S_COLOR]} style={{ height: hs(40), width: hs(40), alignItems: 'center', justifyContent: 'center', borderRadius: 100 }}>
            <Icon type={type} name={name} color={color} size={ms(24)} />
        </LinearGradient>
    )
}

const RenderTabIcon = ({ focused, route }: any) => {
    const color = focused ? colors.P_TEXT_COLOR : colors.S_TEXT_COLOR
    const suffix = focused ? '' : '-outline'
    switch (route.name) {
        case NavKeys.TAB_DASHBOARD.TAB_SCREEN_CONSOLE:
            return <RenderIcon type={"Ionicons"} name={`ios-sync-circle${suffix}`} color={color} focused={focused} />
        case NavKeys.TAB_DASHBOARD.TAB_SCREEN_FORUM:
            return <RenderIcon type={"Ionicons"} name={`newspaper${suffix}`} color={color} focused={focused} />
        case NavKeys.TAB_DASHBOARD.TAB_SCREEN_HOME:
            return <RenderIcon type={"MaterialIcons"} name={`insights`} color={color} focused={focused} />
        case NavKeys.TAB_DASHBOARD.TAB_SCREEN_CATEGORY:
            return <RenderIcon type={"Ionicons"} name={`layers${suffix}`} color={color} focused={focused} />
        case NavKeys.TAB_DASHBOARD.TAB_SCREEN_WALLET:
            return <RenderIcon type={"Ionicons"} name={`wallet${suffix}`} color={color} focused={focused} />
        default:
            return null
    }
}
export function MainTab({ navigation }: any) {

    const isFocused = useIsFocused()

    // Hooks
    AppExit(isFocused)

    return (
        <Tab.Navigator
            initialRouteName={NavKeys.TAB_DASHBOARD.TAB_SCREEN_CATEGORY}
            tabBar={(props: BottomTabBarProps) => (
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        overflow: 'hidden'
                    }}
                >
                    <BlurView
                        navigation={navigation}
                        blurType='xlight'
                        blurAmount={10}
                    >
                        <BottomTabBar {...props} />
                    </BlurView>
                </View>
            )}
            screenOptions={({ route, navigation }: any) => {
                return {
                    tabBarHideOnKeyboard: true,
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        backgroundColor: 'transparent',
                        shadowColor: 'transparent'
                    },
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                            <View style={{}}>
                                <RenderTabIcon route={route} focused={focused} />
                            </View>
                        )
                    },
                }
            }}
        >
            <Tab.Screen
                name={NavKeys.TAB_DASHBOARD.TAB_SCREEN_CONSOLE}
                component={ConsoleScreen}
            />
            <Tab.Screen
                name={NavKeys.TAB_DASHBOARD.TAB_SCREEN_FORUM}
                component={ForumScreen}
            />
            <Tab.Screen
                name={NavKeys.TAB_DASHBOARD.TAB_SCREEN_HOME}
                component={DashboardScreen}
            />
            <Tab.Screen
                name={NavKeys.TAB_DASHBOARD.TAB_SCREEN_CATEGORY}
                component={CategoryScreen}
            />
            <Tab.Screen
                name={NavKeys.TAB_DASHBOARD.TAB_SCREEN_WALLET}
                component={WalletScreen}
            />
        </Tab.Navigator>
    );
}