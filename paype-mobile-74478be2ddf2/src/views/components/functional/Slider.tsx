import React, { ReactElement, useRef } from 'react';
import { Animated, StyleProp, StyleSheet, View, ViewStyle, ScrollView } from 'react-native';
import { hs, wp, ws } from '@utilis/designs/measurements.design';
import LinearGradient from 'react-native-linear-gradient';
import colors from '@config/colors.config';

interface ISlider {
    data: any[];
    renderItem: (props: any) => ReactElement;
    fHeight?: number;
    fWidth?: number;
    containerStyle?: StyleProp<ViewStyle>;
}


export const Slider = ({ data, renderItem, fHeight = hs(180), fWidth = wp('100%'), containerStyle }: ISlider) => {
    const scrollViewRef = useRef(null).current
    const scrollViewAnimationRef = useRef(new Animated.Value(0)).current

    return (
        <View style={[styles.container, { height: fHeight }, containerStyle]}>
            <ScrollView
                ref={scrollViewRef}
                horizontal={true}
                pagingEnabled={true}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollViewAnimationRef } } }],
                    { useNativeDriver: false }
                )}
            >
                {data?.map((item, index) => {
                    return renderItem({ item, index })
                })}
            </ScrollView>
            {data.length > 1 ?
                <LinearGradient colors={[colors.TRANS, colors.P_BG]} style={styles.gradientContainer}>
                    <View style={styles.dotContainer}>
                        {data?.map((e, i) => {
                            if (!scrollViewAnimationRef) return null
                            const pastPosition = i - 1, currentPosition = i, nextPosition = i + 1
                            const width = scrollViewAnimationRef.interpolate({
                                inputRange: [pastPosition * fWidth, currentPosition * fWidth, nextPosition * fWidth],
                                outputRange: [ws(6), ws(12), ws(6)],
                                extrapolate: 'clamp'
                            });
                            const backgroundColor = scrollViewAnimationRef.interpolate({
                                inputRange: [pastPosition * fWidth, currentPosition * fWidth, nextPosition * fWidth],
                                outputRange: [colors.P_COLOR, colors.P_COLOR_DARK, colors.P_COLOR],
                                extrapolate: 'clamp'
                            });
                            return <Animated.View style={[styles.dot, { backgroundColor, width, }]} key={i} />
                        })}
                    </View>
                </LinearGradient>
                : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden'
    },
    gradientContainer: {
        position: 'absolute',
        bottom: 0,
        height: hs(80),
        width: wp('100%'),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dotContainer: {
        flexDirection: 'row',
        marginVertical: hs(16),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dot: {
        height: ws(6),
        marginHorizontal: ws(4),
        borderRadius: 100
    }
});