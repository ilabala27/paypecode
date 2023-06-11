// Array operation
export const canPushNorPop = (array: any[], value: any, key?: string) => {
    let newArray = [...array]
    const index: number = 
        newArray.findIndex((el) => 
            key? el[key] == value[key] 
            : el == value
        )
    if (index > -1) newArray.splice(index, 1)
    else newArray.push(value)
    return newArray
}

export const pushOrPop = (array: any[], value: any) => {
    let newArray = [...array]
    if (newArray.length > 0) newArray.pop()
    else newArray.push(value)
    return newArray
}

// Validation
export const isArray = ({ value, label }: any) => {
    let error = !Array.isArray(value) ? `${label} should be array` : ''
    return error
}

export const isReqArray = ({ value, label }: any) => {
    let error = !value.length ? `${label} is required` : ''
    return error
}

export const isMinArray = ({ value, label, min }: any) => {
    let error = value.length < min ? `${label} should be min ${min}` : ''
    return error
}

export const isMaxArray = ({ value, label, max }: any) => {
    let error = value.length > max ? `${label} should not be max ${max}` : ''
    return error
}

export const isEquArray = ({ value, label, euq }: any) => {
    let error = value.length != euq ? `${label} should be ${euq}` : ''
    return error
}