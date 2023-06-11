import React, { useState, useEffect, memo } from 'react';
import NetInfo from "@react-native-community/netinfo";
import { Modal, Text, View } from 'react-native';


export const isOnline = () => {
  const [isConnected, setIsConnected] = useState(true);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: any) =>
      setIsConnected(state?.isConnected)
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => { }, [isConnected])

  return isConnected;
}

export const getInfo = () => {
  return NetInfo.fetch().then((state: any) => {
    return ({
      isOnline: state.isConnected,
      isInternetReachable: state.isInternetReachable,
      isConnectionExpensive: state.details.isConnectionExpensive,
      type: state.type,
      ipAddress: state.details.ipAddress,
      bssid: state.details.bssid,
      ssid: state.details.ssid,
      subnet: state.details.subnet
    })
  });
}

const NetInfoAlert = () => {
  const isConnected = isOnline()
  console.log("### is network connected?!", isConnected)

  if (isConnected) return null
  return (
    <Modal visible={true} transparent={true} statusBarTranslucent={true}>
      <View style={{ flex: 1, backgroundColor: "white", alignItems: 'center', justifyContent: 'center' }}>
        <Text> No network connection </Text>
      </View>
    </Modal>
  )
}

export default memo(NetInfoAlert);