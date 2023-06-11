import { UserAxios } from "@models/api/paype/user/user.axios";


interface request {
    url?: string | any;
    header?: object | any;
    body?: object | any;
    params?: object | any;
}

const UserApis = {

    // ### Common
    getPdfTemplateFromUserService: ({ params }: request) => UserAxios.get(`${params.url}`),

    // ### Auth
    login: ({ body }: request) => UserAxios.post('/aws-auth/signin', body),
    logout: ({ body }: request) => UserAxios.post('/aws-auth/signout', body),
    forceChangePassword: ({ body }: request) => UserAxios.post('/aws-auth/force-change-password', body),
    changePassword: ({ body }: request) => UserAxios.post('/aws-auth/change-password', body),

    // ### S3
    getSignedUrl: ({ params }: request) => UserAxios.get(`/s3/get-signed-url?fileName=${params.name}&contentType=${params.type}&folder=${params.folder ?? ''}`),

    //onboarding
    getOnBoardingStatusByUserId: ({ params }: request) => UserAxios.get(`/user/onboarded/status?id=${params._id}`),

    // ### User
    createUser: ({ body }: request) => UserAxios.post('/aws-auth/user-signup/onboard', body),
    updateUserById: ({ params, body }: request) => UserAxios.put(`/user/${params._id}`, body),
    getUserById: ({ params }: request) => UserAxios.get(`/user/${params._id}`),
    getUserByFields: ({ body }: request) => UserAxios.post(`/user/by-fields`, body),

    // ### Busniess
    createBusniess: ({ body }: request) => UserAxios.post('/business', body),
    updateBusniessById: ({ params, body }: request) => UserAxios.put(`/business/${params._id}`, body),
    getBusniessById: ({ params }: request) => UserAxios.get(`/business/${params._id}`),
    getBusniessByFields: ({ body }: request) => UserAxios.post(`/business/by-fields`, body),

    // ### Address
    createAddress: ({ body }: request) => UserAxios.post('address/book', body),
    updateAddressById: ({ params, body }: request) => UserAxios.put(`address/book/${params._id}`, body),
    getAddressById: ({ params }: request) => UserAxios.get(`address/book/${params._id}`),
    getAddressByFields: ({ body }: request) => UserAxios.post(`address/book/by-fields`, body),

    // ### Address options
    getAllAddressOptions: () => UserAxios.get(`/address/book/options`),

    // ### Bank
    createBank: ({ body }: request) => UserAxios.post('bank-account/book', body),
    updateBankById: ({ params, body }: request) => UserAxios.put(`bank-account/book/${params._id}`, body),
    getBankById: ({ params }: request) => UserAxios.get(`bank-account/book/${params._id}`),
    getBankByFields: ({ body }: request) => UserAxios.post(`bank-account/book/by-fields`, body),

    // ### Document
    createDocument: ({ body }: request) => UserAxios.post('/document', body),
    updateDocumentById: ({ params, body }: request) => UserAxios.put(`/document/${params._id}`, body),
    getDocumentById: ({ params }: request) => UserAxios.get(`/document/${params._id}`),
    getDocumentByFields: ({ body }: request) => UserAxios.post(`/document/by-fields`, body),

}

export default UserApis