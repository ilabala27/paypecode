
export default {
    country: 'country',
    state: 'state',
    district: 'district',
    postal_code: 'postal_code',
    address: {
        address: 'address',
        address_user_mapper: 'address_user_mapper',
        address_business_mapper: 'address_business_mapper',
    },
    user: 'user',
    business: 'business',
    bank_account: {
        bank_account: 'bank_account',
        bank_account_user_mapper: 'bank_account_user_mapper',
        bank_account_business_mapper: 'bank_account_business_mapper',
    },
    document: "document"
}

// address schema
export const addr_type = ["HOME", "OFFICE", "OTHER"]

// user schema
export enum ENUM_REGISTRATION_STATUS {
    INITIATED = 'INITIATED',
    USER_ADDRESS_CREATION = 'USER_ADDRESS_CREATION',
    BUSINESS_CREATION = 'BUSINESS_CREATION',
    BUSINESS_ADDRESS_CREATION = 'BUSINESS_ADDRESS_CREATION',
    BANK_DEATILS_CREATION = 'BANK_DEATILS_CREATION',
    DOCUMENT_UPLOAD = 'DOCUMENT_UPLOAD',
    VERIFIER_ALLOCATION = "VERIFIER_ALLOCATION",
    VERIFICATION = "VERIFICATION",
    CLARIFICATION = "CLARIFICATION",
    ACTIVATOR_ALLOCATION = "ACTIVATOR_ALLOCATION",
    ACTIVATION = "ACTIVATION",
    CLARIFICATION_WITH_VERIFICATION_TEAM = "CLARIFICATION_WITH_VERIFICATION_TEAM",
    COMPLETED = "COMPLETED",
}

export enum ENUM_USER_TYPE {
    SUPER_ADMIN = 'SUPER_ADMIN',
    ADMIN = 'ADMIN',
    EMPLOYEE = 'EMPLOYEE',
    SUPER_DISTRIBUTOR = 'SUPER_DISTRIBUTOR',
    DISTRIBUTOR = 'DISTRIBUTOR',
    RETAILER = 'RETAILER',
}

export enum ENUM_DOCUMENT_TYPE {
    AADHAR = 'AADHAR',
    PAN = 'PAN',
    LICENSE = 'LICENSE',
    VOTER = 'VOTER',
    OTHER = 'OTHER',
}
