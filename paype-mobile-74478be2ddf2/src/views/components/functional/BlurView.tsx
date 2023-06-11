import React, { memo, useEffect, useRef, useState } from 'react';
import { BlurView as NativeBlurView, BlurViewProperties } from '@react-native-community/blur';
import { NavigationProp, useIsFocused } from '@react-navigation/native';
import { AppState } from 'react-native';
/**
 * This is a workaround for the fact that BlurView doesn't work on Android when nested in a Flatlist.
 * 
 * Drop in replacement for BlurView.
 * 
 * @see {@link [GitHub Issue](https://github.com/Kureev/react-native-blur/issues/368)}
 */
export const BlurView: React.FC<BlurViewProperties & { navigation: NavigationProp<any> }> = memo(props => {
    const isFocused = useIsFocused()
    const appState = useRef(AppState.currentState);
    const [active, setActive] = useState(false)

    useEffect(() => {
        const subscription = AppState.addEventListener("change", nextAppState => {
            if (isFocused) {
                console.log('>>>>> OnFocus')
                if (appState.current.match(/inactive|background/) && nextAppState === "active")
                    setTimeout(() => setActive(true), 500)
                else
                    setActive(false)
                appState.current = nextAppState;
            }
        });
        return () => subscription.remove();
    }, [isFocused]);

    useEffect(() => {
        if (isFocused) setTimeout(() => setActive(true), 500)
        else setActive(false)
    }, [isFocused])

    if (!active) return null;
    return <NativeBlurView {...props} />;
});
