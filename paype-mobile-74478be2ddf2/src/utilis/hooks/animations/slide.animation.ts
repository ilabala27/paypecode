import { useEffect, useRef } from "react";
import { Animated } from "react-native";

import { wp } from "@utilis/designs/measurements.design";


interface IUseSlideAnimation {
    duration?: number;
    delay?: number;
}

const defaultUseSlideAnimation = {
    duration: 500,
    delay: 0,
}

export const useSlideAnimation = ({ duration, delay }: IUseSlideAnimation = defaultUseSlideAnimation) => {
    const translateX = useRef(new Animated.Value(0)).current;
    const position = {
        transform: [
            {
                translateX: translateX.interpolate({
                    inputRange: [0, 1],
                    outputRange: [wp("100%"), wp("0%")]
                })
            }
        ]
    };

    const startAnimate = () => {
        Animated.timing(translateX, {
            toValue: 1,
            delay: delay,
            duration: duration,
            useNativeDriver: true
        }).start();
    }

    useEffect(() => {
        startAnimate()
    }, [])

    return position
}