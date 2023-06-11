import moment from "moment"
const CryptoJS = require('crypto-js')

// Conversion
export const toUpper = (text: string = '') => {
    return text.toUpperCase()
}

export const toLower = (text: string = '') => {
    return text.toLowerCase()
}

// Validation
export const isInt = ({ value, label }: any) => {
    let error = typeof value != 'number' ? `${label} should be number` : ''
    return error
}

export const isAmount = ({ value, label }: any) => {
    let error = !value.match(/^-?\d*(\.\d+)?$/) ? `${label} should be valid number` : ''
    return error
}

export const isBoolean = ({ value, label }: any) => {
    let error = typeof value != 'boolean' ? `${label} should be boolean` : ''
    return error
}

export const isString = ({ value, label }: any) => {
    let error = typeof value != 'string' ? `${label} should be string` : ''
    return error
}

export const isReq = ({ value, label }: any) => {
    let error = !value ? `${label} is required` : ''
    return error
}

export const isMin = ({ value, label, min }: any) => {
    let error = value.length < min ? `${label} should be min ${min} characters` : ''
    return error
}

export const isMax = ({ value, label, max }: any) => {
    let error = value.length > max ? `${label} should not be max ${max} characters` : ''
    return error
}

export const isEqu = ({ value, label, equ }: any) => {
    let error = value.length != equ ? `${label} should be ${equ} characters` : ''
    return error
}

export const isValueEqu = ({ value, label, value2, label2 }: any) => {
    let error = value != value2 ? `${label} and ${label2} should be same` : ''
    return error
}

export const isMobileNo = ({ value, label }: any) => {
    let error = '', text = value.replace('+91 ', '').replace('+91', '').replace(' ', '').replace('-', '')
    if (!text) error = `${label} number is required`
    else if (text.length != 10) error = `${label} number should be 10 digits`
    else if (!text.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) error = `Valid ${label} number is required`
    return error
}
export const isAadhar = ({ value }: any) => {
    let error = ''
    const isValid = value.match(/^[2-9]{1}[0-9]{3}\s{1}[0-9]{4}\s{1}[0-9]{4}$/);
    if (!isValid) error = `Enter valid aadhar number`
    return error

}
export const isPan = ({ value }: any) => {
    let error = ''
    const isValid = value.match(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/);
    if (!isValid) error = `Enter valid PAN number`
    return error

}
export const isGst = ({ value }: any) => {
    let error = ''
    const isValid = value.match(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z|C[0-9A-Z]{1}$/);
    if (!isValid) error = `Enter valid GST number`
    return error

}
export const isEmail = ({ value }: any) => {
    let error = ''
    const isValid = value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
    if (!isValid) error = `Enter valid Email Id`
    return error

}
export const isPassword = ({ value, label }: any) => {
    let error = ''
    const isValid = value.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    if (value?.length < 8) error = `${label} should contain minimun 8 characters`
    else if (!isValid) error = `${label} should contain one upper case, one lower case, one special character and one number`
    return error
};

export const toLowerCaseAndReplace = (string: string, replaceFrom: string, replaceTo: string) => {
    return string.toLowerCase().replace(replaceFrom, replaceTo)
}

export const toLowerAndFirstcapAndReplace = (string: string, replaceFrom: string, replaceTo: string) => {
    let startLetter = string.charAt(0).toUpperCase()
    return startLetter + string.slice(1).toLowerCase().replace(new RegExp(replaceFrom, 'g'), replaceTo)
}

export const amountInWords = (price: any) => {
    let sglDigit = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"],
        dblDigit = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"],
        tensPlace = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"],
        handle_tens = function (dgt: number, prevDgt: number) {
            return 0 == dgt ? "" : " " + (1 == dgt ? dblDigit[prevDgt] : tensPlace[dgt])
        },
        handle_utlc = function (dgt: number, nxtDgt: number, denom: string) {
            return (0 != dgt && 1 != nxtDgt ? " " + sglDigit[dgt] : "") + (0 != nxtDgt || dgt > 0 ? " " + denom : "")
        };

    let str = "", digitIdx = 0, digit = 0, nxtDigit = 0, words: any = [];

    if (price += "", isNaN(parseInt(price))) str = "";
    else if (parseInt(price) > 0 && price.length <= 10) {
        for (digitIdx = price.length - 1; digitIdx >= 0; digitIdx--) switch (digit = price[digitIdx] - 0, nxtDigit = digitIdx > 0 ? price[digitIdx - 1] - 0 : 0, price.length - digitIdx - 1) {
            case 0: words.push(handle_utlc(digit, nxtDigit, "")); break;
            case 1: words.push(handle_tens(digit, price[digitIdx + 1])); break;
            case 2: words.push(0 != digit ? " " + sglDigit[digit] + " Hundred" + (0 != price[digitIdx + 1] && 0 != price[digitIdx + 2] ? " and" : "") : ""); break;
            case 3: words.push(handle_utlc(digit, nxtDigit, "Thousand")); break;
            case 4: words.push(handle_tens(digit, price[digitIdx + 1])); break;
            case 5: words.push(handle_utlc(digit, nxtDigit, "Lakh")); break;
            case 6: words.push(handle_tens(digit, price[digitIdx + 1])); break;
            case 7: words.push(handle_utlc(digit, nxtDigit, "Crore")); break;
            case 8: words.push(handle_tens(digit, price[digitIdx + 1])); break;
            case 9: words.push(0 != digit ? " " + sglDigit[digit] + " Hundred" + (0 != price[digitIdx + 1] || 0 != price[digitIdx + 2] ? " and" : " Crore") : "");
        }
        str = words.reverse().join("")
    } else str = "";
    return str
}

const CR_KEY = 'AnGeL-16435'

export const encrypt = (data: any) => {
    try {
        // ### Format and Encrypt
        const dataAsString = JSON.stringify(data)
        const cipherText = CryptoJS.AES.encrypt(dataAsString, CR_KEY).toString();
        return cipherText
    } catch (err) {
        console.log(err)
    }
}

export const encryptWithFormat = (rawData: any) => {
    const timeNow = moment()
    const rawTime = timeNow.toISOString()
    const data = {
        time: timeNow.add(360, 'seconds').toISOString(),
        ...rawData
    }
    const cipher = encrypt(data)
    return {
        cipherTime: rawTime,
        cipher
    }
}

export const decrypt = (cipherAsText: string) => {
    try {
        // ### Decrypt and Format
        const bytes = CryptoJS.AES.decrypt(cipherAsText, CR_KEY);
        const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        return data
    } catch (err) {
        console.log(err)
    }
}

export const currencyInr = (x: string) => {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

export const getFormattedMobileContact = (data: any) => {
    const numbers: any[] = [], contact: any[] = []
    data.map((item: any, index: number) => {
        item.phoneNumbers.map((el: any, i: number) => {
            const number = el?.number?.replace('+91 ', '').replace('+91', '').replace(' ', '').replace('-', '')
            if (!numbers.includes(number) && !isMobileNo({ value: number, label: 'Mobile no.' })) {
                numbers.push(number)
                contact.push({ label: el?.label, name: item.displayName, number })
            }
        })
    })
    return contact
}

export const getFormattedHistoryContact = (data: any) => {
    const numbers: any[] = [], contact: any[] = []
    data.map((el: any, index: number) => {
        const number = el?.retr_mobile?.replace('+91 ', '').replace('+91', '').replace(' ', '').replace('-', '')
        if (!numbers.includes(number) && !isMobileNo({ value: number, label: 'Mobile no.' })) {
            numbers.push(number)
            contact.push({ label: el?.label, name: '', number })
        }
    })
    return contact
}

export const constructQuery = (data: any) => {
    const keys = Object.keys(data)
    const query = keys.map((e) => `${e}=${data[e]}`).join('&')
    return query ? `?${query}` : ''
}