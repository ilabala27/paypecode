import { NavigationProp, RouteProp } from "@react-navigation/native";

export type INavigationProps = {
    navigation: NavigationProp<any>;
    route: RouteProp<any>;
};

export type INavigationProps2 = {
    navigation: NavigationProp<any>;
    route: any;
};