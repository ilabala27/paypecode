import { RBACAxios } from "./rbac.axios";


interface request {
    url?: string | any;
    header?: object | any;
    body?: object | any;
    params?: object | any;
}

const RBACApis = {
    // ### RBAC
    getRBACAuthorization: ({ body }: request) => RBACAxios.post('/rbac/authorization', body),
    getRBACOptions: ({ body }: request) => RBACAxios.post('/rbac/options', body),

    // ### Permission
    createPermission: ({ body }: request) => RBACAxios.post('/permission', body),
    updatePermission: ({ params, body }: request) => RBACAxios.put(`/permission/${params?.user_id}/${params?._id}`, body),
    deletePermission: ({ params }: request) => RBACAxios.delete(`/permission/${params?.user_id}/${params?._id}`),
    getPermission: ({ params }: request) => RBACAxios.get(`/permission/${params?._id}`),

    // ### Permission Group
    createPermissionGroup: ({ body }: request) => RBACAxios.post('/permission-group', body),
    updatePermissionGroup: ({ params, body }: request) => RBACAxios.put(`/permission-group/${params?.user_id}/${params?._id}`, body),
    deletePermissionGroup: ({ params }: request) => RBACAxios.delete(`/permission-group/${params?.user_id}/${params?._id}`),
    getPermissionGroup: ({ params }: request) => RBACAxios.get(`/permission-group/${params?._id}`),

    
    // ### Role
    createRole: ({ body }: request) => RBACAxios.post('/role', body),
    updateRole: ({ params, body }: request) => RBACAxios.put(`/role/${params?.user_id}/${params?._id}`, body),
    deleteRole: ({ params }: request) => RBACAxios.delete(`/role/${params?.user_id}/${params?._id}`),
    getRole: ({ params }: request) => RBACAxios.get(`/role/${params?._id}`),

}

export default RBACApis