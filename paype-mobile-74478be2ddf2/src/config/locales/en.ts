import appConfig from "@config/app.config";

export default {
    greeting: 'Welcome!',
    ERROR: {
        "400": "Default error message for 400",
        "401": "Default error message for 401",
        "404": "Default error message for 404",
        "422": "Default error message for 422",
        "DEFAULT": "DEFAULT error message",
    },
    onBoard: {
        step1: {
            image: `${appConfig.apiConnections.s3}/%40system-resources/slide5.png`,
            title_prefix: "Paype - One stop app for all business partners",
            title_suffix: "Paype makes Democratizing Finance with Technology",
            content: "Paype is an indian B2B marketplace for super distributor, distributor and retailers. Paype makes transactions simple and seamless",
        },
        step2: {
            image: "https://99designs-blog.imgix.net/blog/wp-content/uploads/2019/05/attachment_90552480-e1559243826198.jpg?auto=format&q=60&fit=max&w=930",
            title_prefix: "Data privacy & security",
            title_suffix: "Safety, security, peace of mind-that's what we do best. Trustworthy Protection for all of your payments",
            content: "Safety starts with understanding how developers collect and share your data. Data privacy and security practices may vary based upon your use, region and age. The developer provided this information and may update it over time"
        },
        step3: {
            image: "https://vervevideos.com/wp-content/uploads/2021/08/Memory-Retention-278x300.png",
            title_prefix: "Services",
            title_suffix: "B2B instant money services including DMT, AEPS, Recharges etc.",
            content: "B2B instant money services including DMT, AEPS, Recharges and Much More",
            getStarted: "Get Started"
        }
    },
    auth: {
        welcome: {
            image: "https://99designs-blog.imgix.net/blog/wp-content/uploads/2019/05/attachment_90552480-e1559243826198.jpg?auto=format&q=60&fit=max&w=930",
            title: "Welcome to PAYPE",
            loginButton: "Login",
            content: "Don't have an account?",
            reachUs: "Reach us!"
        }
    },
    recharge: {
        Validity: "Validity: ",
        payPrefix: "Confirm to pay ( Rs",
        paySuffix: " )",
    },
    PROFILE: {
        TITLE: 'My profile',
        MENU: {
            ACCOUNT: "Account",
            ACCOUNT_MYPROFILE: "My profile",
            ACCOUNT_PARTNER_LICENCE: "Partner Licence",
            SECURITY: "Security",
            SECURITY_CHANGE_PASSWORD: "Change Password",
            SETTINGS_PREFERENCES: "Settings & Preferences",
            SETTINGS_PREFERENCES_LANGUAGES: "Languages",
            SETTINGS_PREFERENCES_NOTIFICATIONS: "Notifications",
            LEGAL: "Legal",
            LEGAL_PRIVACY_POLICY: "Privacy Policy",
            LEGAL_TERMS_CONDITIONS: "Terms & Conditions",
            LEGAL_ABOUT_PAYPE: "About Paype"


        },
    },
    USER_DETAILS: {
        NA: 'N/A',
        USER_DETAILS: "USER_DETAILS",
        USER_INFO: {
            USERINFO: "User Info",
            USERID: "User ID",
            EMAIL: 'Email',
            REGISTRATION_STATUS: "Registartion Status",
            USERROLE: "User Role"
        },
        ADDRESS_INF0: {
            ADDRESS_INFO: "Address Info",
            ADDRESS_LINE1: "Address Line 1",
            ADDRESS_LINE2: "Address Line 2",
            LANDMARKK: "Landmark",
            PINCODE: "Pincode",
        },
        BUSINESS_INFO: {
            BUSINESS_INFO: "Business Info",
            BUSINESS_NAME: "Business Name",
            BUSINESS_MAIL: "Business Mail",
            BUSINESS_ADDRESS: "Business Address",
            BUSINESS_CONTACT: "Business Contact"
        },
        BANK_INFO: {
            BANK_INFO: 'BANK_INFO',
            NAME: "Name",
            ACCOUNT_NUMBER: "Account Number",
            NAME_OF_BRANCH: "Name of Branch",
            BANK_ACCOUNT_TYPE: "Bank Account Type",
        },
        DOCUMENTS_INFO: {
            DOCUMENTS_INFO: 'DOCUMENTS_INFO',
            TYPE_OF_DOCUMENT: "Type of document",
            DOCUMENT_NUMBER: 'Documentr Number',
            SIZE_OF_DOCUMENT: "Size Of the document",
            DOCUMENT_FORMAT: "Document Format"
        }
    },
    CHANGE_PASSWORD: {
        CHANGE_PASSWORD: "CHANGE PASSWORD",
        OLD_PASSWORD: " Enter Old  Password",
        NEW_PASSWORD: "Enter New Password",
        CONFIRM_PASSWORD: "Enter Confirm Password",
        PLACEHOLDER: "XXXX",
        BUTTON: "Change Password"

    },
    FORM: {
        USER_FORM: {
            USER_DETAILS: "USER DETAILS",
            NAME: "Enter Name",
            MOBILE_NUMBER: "Enter Mobile Number",
            EMAIL: 'Enter Email',
            USER_TYPE: "Select User Type",
            USER_ROLE: "Select User Role",
            SERVICES: "Select Services",
            ALTERNATE_CONTACT: "Enter Alternate Contact No",

        },
        ADDRESS_FORM: {
            ADDRESS_DETAILS: "Address Details",
            ADDRESS_TYPE: "Address Type",
            ADDRESS_TYPE_PLACEHOLDER: "Pick type from options",
            ADDRESS_LINE1: "Enter Addresss Line 1",
            ADDRESS_LINE2: "Enter Addresss Line 2",
            LANDMARK: "Enter LandMark",
            PINCODE: "Enter Pincode",
            DISTRICT: "District",
            STATE: "State",
            COUNTRY: "Country"
        },
        BUSINESS_DETAILS: {
            BUSINESS_DETAILS: "Business Details",
            BUSINESS_NAME: "Enter busniess name",
            BUSINESS_EMAIL: "Enter email id",
            TELEPHONE_NO: "Enter telephone with extension",
            MSME: "Enter msme ( if required )",
            FSSAI_OR_GST: "Enter Fssai or GST No( if required)"

        },
        BANK_DETAILS: {
            BANK_DETAILS: "Bank Details",
            ACCOUNT_TYPE: "Select account type",
            ACCOUNT_TYPE_PLACEHOLDER: "Pick type from options",
            ACCOUNT_NAME: "Enter account name",
            ACCOUNT_NUMBER: "Enter account number",
            IFSC_NUMBER: "Enter IFSC",
            BANK_NAME: "Enter bank name",
            BRANCH_NAME: "Enter branch name",
        },
        SUPPORTING_DOCUMENTS: {
            SUPPORTING_DOCUMENTS: "SUPPORTING DOCUMENTS ",
            DOCUMENT_TYPE: "Select document type",
            DOCUMENT_TYPE_PLACEHOLDER: "Pick type from options",
            DOCUMENT_NAME: "Enter document name",
            DOCUMENT_NUMBER: "Enter document number",
            DOCUMENT_DESCRIPTION: "Enter document description ( if any )",
            DOCUMENT_REMARK: "Enter document remark ( if any )",
            PICKER: "Upload Documents"
        }
    },
    USER_ONBOARDING: {
        USER_DETAILS: 'User Details',
        USER_ADDRESS: 'User Address Details',
        BUSINESS_DETAILS: 'Business Details',
        BUSINESS_ADDRESS: 'Business Address Details',
        BANK_DETAILS: 'Bank Details',
        SUPPORTING_DOCUMENTS: 'Supporting Documents',
        SUBMIT_FOR_VERIFICATION: 'Submit for verification',
        TITLE: 'WELCOME TO PAYPE',
        SUB_TITLE: "We offer modern solutions for growing your business and powerful Panel that brings great insights.",
    },
    CONSOLE: {
        RBAC_MANAGEMENT: {
            PERMISSION: "Permission",
            PERMISSION_GROUP: "Permission Group",
            ROLE: "Role"
        },
        USER_ONBOARDING: {
            NEW_USER: "New User Onboarding",
            ONBOARDING_PROCESS: "Onboarding in progess",
            PENDING_VERIFICATION: "Pending verification",
            VERIFICATION_IN_PROGRESS: "Verification in progess",
            PENDING_ACTIVATION: "Pending Activation",
            ACTIVATION_IN_PROGRESSS: "Activation in progess",
        },
        USER_MANAGEMENT: {
            ACTIVE_USERS: "Active Users",
            CASH_DEPOSIT: "Approve Cash Deposit"
        },
        SERVICE_MANAGEMENT: {
            CATEGORIES: "Categories",
            SERVICES: "Services"
        }

    },
    ACTIVE_USERS: {
        CREATED: "Created",
        STATUS: "Last Active",
        PROFILE: "Profile"
    },
    WALLET: {
        REQUEST: "Request",
        ADD: " Add",
        SEND: "Send",
        TITLE: "Welcome"

    }

};