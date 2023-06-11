import { useEffect, useState } from "react";
import { systemTransportor } from "@models/redux/system/system.transportor";


export const grantStatus = (list: string[]) => {
    const { systemStore } = systemTransportor()
    const { RBAC } = systemStore()
    const { isRoot, roles, permissionGroups, permissions } = RBAC?? {}
    const [ isAccessGranted, setIsAccessGranted ] = useState<any>({})

    useEffect(()=>{
        const result = checkIsAccessGranted()
        setIsAccessGranted(result)
    }, [])

    const checkIsAccessGranted = () => {
        const result: any = {}
        list.map((el)=>{
            result[el] = isRoot? true : permissions?.value[el]? true : false
        })
        return result
    }

    return isAccessGranted
}