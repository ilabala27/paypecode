

const OPERATORS = [
    {
        "operator_id": "1",
        "operator_name": "Airtel",
        "operator_key": "airtel",
        "operator_mode": "Mobile Recharge"
    }
]


const PROVIDER = [
    {
        "provider_operator_id": "1",
        "provider_id": "1",
        "provider_display_name": "JSK",
        "provider_name": "JSK",
        "provider_key": "jsk",
        "provider_request": {
            "method": "",
            "headers": "",
            "url": "",
            "params": "",
            "body": "",
        },
    }
]

const COMMISSSION = [
    {
        "commission_user_id": "1",
        "commission_operator_id": "1",
        "commission_provider_id": "1",
        "commission": {
            "total": "3.0000",
            "system": "0",
            "org": "0.2050",
            "super_distributor": "0.0200",
            "distributor": "0.02500",
            "retailer": "2.7500"
        },
        "commission_tax": {
            "tds": "0",
            "cgst": "0",
            "sgst": "0",
            "igst": "0",
        }
    }
]



export const MOBILE_RECHARGE_OPERATOR = [
    {
        "operator_id": "1",
        "operator_name": "Airtel",
        "operator_key": "airtel",
        "operator_mode": "Mobile Recharge",
        "provider": [
            {
                "provider_id": "1",
                "provider_display_name": "JSK",
                "provider_name": "JSK",
                "provider_key": "jsk",
                "provider_request": {
                    "method": "",
                    "headers": "",
                    "url": "",
                    "params": "",
                    "body": "",
                },
                "commission": {
                    "total": "3.0000",
                    "org": "0.2050",
                    "super_distributor": "0.0200",
                    "distributor": "0.02500",
                    "retailer": "2.7500"
                },
                "tax": {
                    "tds": "0",
                    "cgst": "0",
                    "sgst": "0",
                    "igst": "0",
                }
            }
        ]
    },




    {
        "category": "Mobile Prepaid",
        "operator": "Airtel",
        "key": "airtel",
        "partner": [
            {
                "name": "jsk",
                "params": {
                    "_id": "1",
                },
                "commission": {
                    "total": "3.0000",
                    "o": "0.2050",
                    "sd": "0.0200",
                    "d": "0.02500",
                    "r": "2.7500"
                }
            }
        ]
    },
    {
        "category": "Mobile Prepaid",
        "operator": "BSNL",
        "key": "bsnl",
        "partner": [
            {
                "name": "jsk",
                "params": {
                    "_id": "13",
                },
                "commission": {
                    "total": "3.5000",
                    "o": "0.2050",
                    "sd": "0.0200",
                    "d": "0.02500",
                    "r": "3.0000"
                }
            }
        ]
    },
    {
        "category": "Mobile Prepaid",
        "operator": "Idea",
        "key": "idea",
        "partner": [
            {
                "name": "jsk",
                "params": {
                    "_id": "2",
                },
                "commission": {
                    "total": "3.5000",
                    "o": "0.2050",
                    "sd": "0.0200",
                    "d": "0.02500",
                    "r": "3.0000"
                }
            }
        ]
    },
    {
        "category": "Mobile Prepaid",
        "operator": "JIO",
        "key": "jio",
        "partner": [
            {
                "name": "jsk",
                "params": {
                    "_id": "5",
                },
                "commission": {
                    "total": "3.0000",
                    "o": "0.2050",
                    "sd": "0.0200",
                    "d": "0.02500",
                    "r": "2.7500"
                }
            }
        ]
    },
    {
        "category": "Mobile Prepaid",
        "operator": "Vodafone",
        "key": "vodafone",
        "partner": [
            {
                "name": "jsk",
                "params": {
                    "_id": "22",
                },
                "commission": {
                    "total": "3.5000",
                    "o": "0.2050",
                    "sd": "0.0200",
                    "d": "0.02500",
                    "r": "3.0000"
                }
            }
        ]
    }
]