import { ServicesAxios } from "@models/api/paype/services/services.axios";


interface request {
    url?: string | any;
    header?: object | any;
    body?: object | any;
    params?: object | any;
}

const ServicesApis = {
    // ### Services
    getAllCategories: () => ServicesAxios.get(`/category`),
    getServicesWithCategory: () => ServicesAxios.get(`/services/services-with-category`),
    // categories
    getCategoryById: ({ params }: request) => ServicesAxios.get(`/category/${params?.cate_id}`),
    createServiceCategory: ({ body }: request) => ServicesAxios.post(`/category`, body),
    updateServiceCategory: ({ params, body }: request) => ServicesAxios.patch(`/category/${params?.user_id}/${params?.cate_id}`, body),
    // services
    getServiceById: ({ params }: request) => ServicesAxios.get(`/services/${params?.serv_id}`),
    createService: ({ body }: request) => ServicesAxios.post(`/services`, body),
    updateService: ({ params, body }: request) => ServicesAxios.patch(`/services/${params?.user_id}/${params?.serv_id}`, body),
    // Transaction
    purchaseOnBoarding: ({ body }: request) => ServicesAxios.post(`/onboarding-quota-transaction`, body),
    getOnboardingLimit: ({ body }: request) => ServicesAxios.post(`/onboarding-quota/fields`, body),
}

export default ServicesApis