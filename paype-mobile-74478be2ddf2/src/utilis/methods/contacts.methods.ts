import ConsoleScreen from "@views/screens/mainTab/Console.screen"
import { Alert, Linking, PermissionsAndroid, Platform } from "react-native"
import RNContacts, { checkPermission, Contact } from "react-native-contacts"

// Wrapper for permissions as original function does not throw
const requestPermissions = async (): Promise<void> => {
    // If app would like to display the rational for requesting permissions,
    // then place it as second param in PermissionsAndroid.request().
    if (Platform.OS === 'android') {
        let status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS)
        if (status === 'denied') {
            console.log('Permission not granted to access contacts')
        } else if (status === 'never_ask_again') {
            Alert.alert(
                "Permission Required",
                `Kindly grant permission for accessing contact information inside application`,
                [
                    { text: "Cancel", onPress: () => null, style: 'cancel' },
                    { text: "Go Setting", onPress: () => Linking.openSettings() },
                ],
                {
                    onDismiss: () => null,
                    cancelable: false
                }
            );
        }
    }
}

// Wrapper for requesting contacts as original function returns callback instead of Promise
const getAll = async (): Promise<Contact[]> => {
    return checkPermission().then(async (res) => {
        if (res == "authorized") {
            return await RNContacts.getAll()
        }
        return []
    })
}

export {
    requestPermissions,
    getAll
}