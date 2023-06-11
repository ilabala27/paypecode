import { Linking } from "react-native"
import NativeDocumentPicker, { types } from 'react-native-document-picker'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import PPUserAPIs from '@models/api/paype/user/user.api';


export const navigateToDailerPad = (mobileNo: number | string) => {
    Linking.openURL(`tel:${mobileNo}`)
}

export const getBlob = async (fileUri: string) => {
    const resp = await fetch(fileUri);
    const imageBody = await resp.blob();
    return imageBody;
};

export const uploadAndGetObjectReference = async (res: any) => {
    try {
        const { name, type, size, uri, fileCopyUri, blob, folder } = res ?? {}
        const signedData = await PPUserAPIs.getSignedUrl({ params: { name, type, folder } })
        const { fileKey, fileName, fileUrl }: any = signedData.data
        const uploaded = await fetch(fileUrl, { method: "PUT", body: blob });
        if (!uploaded) return false
        return {
            name: fileName, key: fileKey, type: type, size: size,
            local: { uri, fileCopyUri }
        }
    } catch (err) {
        console.log(err)
    }
}

interface INativeDocumentPicker {
    type?: any
    onSuccess: (props: any) => void | undefined | any;
    onError?: (props: any) => void | undefined;
    upload?: boolean;
    folder?: string;
}

/*
    Ref: () => openDocumentPicker({ onSuccess: (res)=>console.log(res), upload: true })
*/
export const openDocumentPicker = async ({ type, onSuccess, onError, upload = false, folder }: INativeDocumentPicker) => {
    const options = {
        type: type ?? [types.allFiles],
        allowMultiSelection: false,
    }
    return await NativeDocumentPicker.pick(options)
        .then(async (res) => {
            const { uri, fileCopyUri, ...rest } = res[0] ?? {}
            const blob = await getBlob(uri);
            const fileInfo = { uri, fileCopyUri, ...rest, blob, folder }
            if (upload) {
                const uploadInfo = await uploadAndGetObjectReference(fileInfo)
                onSuccess(uploadInfo)
                return
            }
            onSuccess(fileInfo)
        })
        .catch(onError)
}

interface IOpenImageLibrary {
    type?: 'photo' | 'video' | 'mixed';
    onSuccess: (props: any) => void | undefined | any;
    onError?: (props: any) => void | undefined;
    upload?: boolean;
    folder?: string;
}

/*
    Ref: () => openImageLibrary({ onSuccess: (res)=>console.log(res), upload: true })
*/
export const openImageLibrary = async ({ type, onSuccess, onError, upload = false, folder }: IOpenImageLibrary) => {
    const options = {
        mediaType: type ?? 'photo',
        cameraType: 'back',
        selectionLimit: 1
    }
    return await launchImageLibrary(options)
        .then(async (res: any) => {
            const { fileName, fileSize, type, uri, height, width, } = res.assets[0] ?? {}
            const blob = await getBlob(uri);
            const fileInfo = {
                name: fileName, type, size: fileSize, uri, fileCopyUri: '', blob, folder
            }
            if (upload) {
                const uploadInfo = await uploadAndGetObjectReference(fileInfo)
                onSuccess(uploadInfo)
                return
            }
            onSuccess(fileInfo)
        })
        .catch(onError)
}

interface IOpenCamera {
    type?: 'photo' | 'video' | 'mixed';
    onSuccess: (props: any) => void | undefined | any;
    onError?: (props: any) => void | undefined;
    upload?: boolean;
    folder?: string;
}

/*
    Ref: () => openCamera({ onSuccess: (res)=>console.log(res), upload: true })
*/
export const openCamera = async ({ type, onSuccess, onError, upload = false, folder }: IOpenCamera) => {
    const options = {
        mediaType: type ?? 'photo',
        selectionLimit: 1
    }
    return await launchCamera(options)
        .then(async (res: any) => {
            if (res.errorCode) return
            const { fileName, fileSize, type, uri, height, width, } = res.assets[0] ?? {}
            if (fileName) {
                const blob = await getBlob(uri);
                const fileInfo = {
                    name: fileName, type, size: fileSize, uri, fileCopyUri: '', blob, folder
                }
                if (upload) {
                    const uploadInfo = await uploadAndGetObjectReference(fileInfo)
                    onSuccess(uploadInfo)
                    return
                }
                onSuccess(fileInfo)
            }
        })
        .catch(onError)
}

export const openUrl = ({ url }: { url: string }) => {
    if(url && Linking.canOpenURL(url)){
        Linking.openURL(url)
    }
}


// // You can also use as a promise without 'callback':
// const result = await launchCamera(options?);


// launchImageLibrary(options?, callback)

// // You can also use as a promise without 'callback':
// const result = await launchImageLibrary(options?);