import NavServiceUtils from "@controllers/utils/NavService.utils";
import React, { useEffect } from "react";
import { Alert, BackHandler } from "react-native";

export const AppExit = (isFocused: boolean) => {
    useEffect(() => {
        const backAction = () => {
            if (isFocused) {
                Alert.alert("Hold on!", "Are you sure you want to go exit?", [
                    { text: "Cancel", onPress: () => null, style: "cancel" },
                    { text: "YES", onPress: () => BackHandler.exitApp() }
                ]);
            } else {
                backHandler.remove()
                NavServiceUtils.goBack()
            }
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();
    }, [isFocused]);
}