import { Keyboard } from "react-native"
import { isArray, isReqArray, isMinArray, isMaxArray, isEquArray, } from "./array.method"
import {
    isInt, isAmount, isBoolean, isString, isReq, isMin, isMax,
    isEqu, isValueEqu, isMobileNo, isPassword, isAadhar, isPan,
    isGst, isEmail
} from "./string.method"


const VALIDATION: any = {
    // Int
    isInt,
    isAmount,

    // Boolean
    isBoolean,

    // String
    isString,
    isReq,
    isMin,
    isMax,
    isEqu,
    isValueEqu,
    isMobileNo,
    isPassword,
    isAadhar,
    isPan,
    isGst,
    isEmail,

    // Array
    isArray,
    isReqArray,
    isMinArray,
    isMaxArray,
    isEquArray,
}

export const validateKey = (form: any, key: any, value: any, keyboardHide?: boolean) => {
    if (keyboardHide) {
        Keyboard.dismiss()
    }

    const validationMethods: any[] = form[key + '_validation']
    let error: string = ''
    validationMethods.map((item: any, index: number) => {
        if (!error) {
            error = VALIDATION[item?.method]({ value, ...item.params })
        }
    })
    return {
        [key]: value,
        [key + "_error"]: error
    }
}

export const validateKeys = (form: any, keys: any[], keyboardHide?: boolean) => {
    if (keyboardHide) {
        Keyboard.dismiss()
    }

    let error = ''
    keys.map((key, index) => {
        const validatedKey = validateKey(form, key, form[key])
        form = {
            ...form,
            ...validatedKey
        }
        if (!error) error = validatedKey[`${key}_error`]
    })
    return { validatedForm: form, error }
}

export const constructForServer = (keys: any[], data: any) => {
    let body: any = {}
    keys.map((key: string, i: number) => {
        body[key] = data[key]
    })
    return body
}

// export const constructForForm = (keys: any[], form: any) => {
//     let body: any = {}
//     keys.map((key: string, i: number) => {
//         body[key] = form[key]
//     })
//     return body
// }