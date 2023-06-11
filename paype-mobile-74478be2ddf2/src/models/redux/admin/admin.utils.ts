

export function permissionsList(tree: any): any[] {
    const permissions: any = []
    const doLoop = (data: any) => {
        data.map((el: any, i: any) => {
            permissions.push({
                _id: el._id,
                is_active: el.is_active,
                name: el.perm_name,
                key: el.perm_name,
                description: el.perm_description,
                created_at: el.created_at,
            })
            el.childrens.length > 0 &&
                doLoop(el.childrens)
        })
    }
    doLoop(tree)
    return permissions
}

export function permissionGroupsList(tree: any): any[] {
    const permissionGroups: any = []
    const doLoop = (data: any) => {
        data.map((el: any, i: any) => {
            permissionGroups.push({
                _id: el._id,
                is_active: el.is_active,
                name: el.pegr_name,
                key: el.pegr_name,
                description: el.pegr_description,
                created_at: el.created_at,
            })
            el.childrens.length > 0 &&
                doLoop(el.childrens)
        })
    }
    doLoop(tree)
    return permissionGroups
}

export function rolesList(tree: any): any[] {
    const roles: any = []
    const doLoop = (data: any) => {
        data.map((el: any, i: any) => {
            roles.push({
                _id: el._id,
                is_active: el.is_active,
                name: el.role_name,
                key: el.role_name,
                description: el.role_description,
                created_at: el.created_at,
            })
            el.childrens.length > 0 &&
                doLoop(el.childrens)
        })
    }
    doLoop(tree)
    return roles
}

export function servicesList(tree: any): any[] {
    const services: any = []
    const doLoop = (data: any) => {
        data.map((el: any, i: any) => {
            services.push({
                _id: el._id,
                is_active: el.is_active,
                name: el.perm_name,
                key: el.perm_name,
                description: el.perm_description,
                created_at: el.created_at,
            })
            el.childrens.length > 0 &&
                doLoop(el.childrens)
        })
    }
    doLoop(tree)
    return services
}