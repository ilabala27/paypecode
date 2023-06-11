import React from 'react';
import { View, StyleSheet, } from 'react-native';
import { MainHeader } from '@views/components/functional/MainHeader';
import NavServiceUtils from '@controllers/utils/NavService.utils';
import { hs, ws } from '@utilis/designs/measurements.design';
import { INavigationProps2 } from '@utilis/interfaces/navigation.interface';
import design from '@config/design.config';
import colors from '@config/colors.config';
import { TabWithSlider } from '@views/components/functional/TabWithSlider';
import { Operator } from './component/Operator';
import { Provider } from './component/Provider';
import { Commission } from './component/Commission';
import { NavKeys } from '@controllers/utils/NavKeys.utils';


export default ({ route, navigation }: INavigationProps2) => {

    const renderScene = ({ route }: any) => {
        switch (route.key) {
            case 'operator':
                return <Operator />
            case 'provider':
                return <Provider />;
            case 'commission':
                return <Commission />;
            default: return null
        }
    };

    return (
        <View style={design.GENERIC_SCREEN_P}>
            <MainHeader
                render={[
                    { type: "Icon", iconType: "Entypo", iconName: "chevron-left", onPress: () => NavServiceUtils.goBack() },
                    { type: "Title", title: "Mobile Recharge Settings" },
                    { type: "Icon", iconType: "Ionicons", iconName: "add-circle", onPress: () => NavServiceUtils.navigate(NavKeys.RECHARGE_OPERATOR_FORM) },
                ]}
            />
            <TabWithSlider
                tabs={[
                    { key: "operator", title: "Operator", index: 0 },
                    { key: "provider", title: "Provider", index: 1 },
                    { key: "commission", title: "Commission", index: 2 },
                ]}
                renderScene={renderScene}
            />
        </View>
    );
};