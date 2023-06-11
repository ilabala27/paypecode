import AsyncStorage from '@react-native-async-storage/async-storage';


// Set or update data
export const setItem = async (key: string, value: any) => {
    try {
        const string = JSON.stringify(value)
        await AsyncStorage.setItem(key, string)
    } catch (e) {
        console.log("### Having issue with setItem", key)
    }
}

export const multiSetItem = async (keyValue: { key: string, value: string }[]) => {
    try {
        let keyString: [string, string][] = keyValue.map((el) => {
            return [el.key, JSON.stringify(el.value)]
        })
        await AsyncStorage.multiSet(keyString)
    } catch (e) {
        console.log("### Having issue with multiSetItem", keyValue)
    }
}

// Get data
export const getItem = async (key: string) => {
    try {
        const string = await AsyncStorage.getItem(key)
        return string != null ? string : null
    } catch (e) {
        console.log("### Having issue with getItem", key)
    }
}

export const getParsedItem = async (key: string) => {
    try {
        const object = await AsyncStorage.getItem(key)
        return object != null ? JSON.parse(object) : null
    } catch (e) {
        console.log("### Having issue with getParsedItem", key)
    }
}

export const getMultiItem = async (keys: string[]) => {
    try {
        const keysString = await AsyncStorage.multiGet(keys)
        return keysString != null ? keysString : null
    } catch (e) {
        console.log("### Having issue with getMultiItem", keys)
    }
}

export const getAllKeys = async () => {
    try {
        return await AsyncStorage.getAllKeys()
    } catch (e) {
        console.log("### Having issue with getAllKeys")
    }
}

// delete data
export const removeItem = async (key: string) => {
    try {
        return await AsyncStorage.removeItem(key)
    } catch (e) {
        console.log("### Having issue with removeItem", key)
    }
}

export const removeItems = async (keys: string[]) => {
    try {
        return await AsyncStorage.multiRemove(keys)
    } catch (e) {
        console.log("### Having issue with removeItems", keys)
    }
}

export const flushItem = async () => {
    try {
        return await AsyncStorage.clear()
    } catch (e) {
        console.log("### Having issue with flushItem")
    }
}