import React from 'react';
import { GestureResponderEvent, StyleProp, TextStyle } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';


interface ICategoryBasedServiceList {
    type: string;
    name: string;
    size?: number;
    color?: string
    style?: StyleProp<TextStyle> | undefined
    onPress?: ((event: GestureResponderEvent) => void) | undefined
}

const selectIconComponent = (type: string) => {
    switch (type) {
        case "FontAwesome":
            return FontAwesome
        case "FontAwesome5":
            return FontAwesome5
        case "Ionicons":
            return Ionicons
        case "Entypo":
            return Entypo
        case "MaterialIcons":
            return MaterialIcons
        case "AntDesign":
            return AntDesign
        case "MaterialCommunityIcons":
            return MaterialCommunityIcons
        case "Fontisto":
            return Fontisto
        case "Octicons":
            return Octicons;
        case 'Feather':
            return Feather;
        default: return false
    }
}

export const Icon = ({ type, name, size, color, style, onPress }: ICategoryBasedServiceList) => {
    const IconComponent = selectIconComponent(type)
    if (!IconComponent) return null
    return (
        <IconComponent style={style} name={name} size={size} color={color} onPress={onPress} />
    );
};