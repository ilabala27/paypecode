import { useEffect, useRef } from "react";
import { Animated } from "react-native";

import { wp } from "@utilis/designs/measurements.design";


interface IUseBlurAnimation {
    duration?: number;
    delay?: number;
    toValue?: number;
}

const defaultUseBlurAnimation = {
    duration: 1500,
    delay: 0,
    toValue: 1,
}

export const useBlurAnimation = ({ duration, delay, toValue }: IUseBlurAnimation = defaultUseBlurAnimation) => {
    const opacity = useRef(new Animated.Value(0)).current

    const startAnimate = () => {
        Animated.timing(opacity, {
            toValue: toValue ?? 1,
            delay: delay,
            duration: duration,
            useNativeDriver: true
        }).start();
    }

    useEffect(() => {
        startAnimate()
    }, [])

    return opacity
}