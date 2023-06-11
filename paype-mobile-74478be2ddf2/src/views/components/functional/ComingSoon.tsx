import React from 'react';
import { Image, StyleSheet, View, } from 'react-native';
import { ws } from '@utilis/designs/measurements.design';
import colors from '@config/colors.config';
import LinearGradient from 'react-native-linear-gradient';
import { Images } from '@assets/images/png';


interface IComingSoon {

}

export const ComingSoon = ({ }: IComingSoon) => {
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
            colors={[colors.P_COLOR, colors.P_BG, colors.P_BG, colors.P_BG, colors.P_COLOR,]}
            style={styles.conatiner}
        >
            <View style={styles.imageContainer1}>
                <Image
                    source={Images.ComingSoon}
                    style={styles.image}
                />
            </View>
            <View style={styles.imageContainer2}>
                <Image
                    source={Images.ComingSoonText2}
                    style={styles.image}
                />
            </View>
        </LinearGradient>
    );
}


const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageContainer1: {
        height: ws(250),
        width: ws(250),
        borderRadius: 16,
        overflow: 'hidden'
    },
    imageContainer2: {
        height: ws(60),
        width: ws(180),
        borderRadius: 8,
        overflow: 'hidden'
    },
    image: {
        height: '100%', width: '100%', resizeMode: 'stretch'
    }
})