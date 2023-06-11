export default {
    company: 'Paype technologies pvt ltd',
    reachUsContact: "9876543210",
    aws: {
        region: 'us-east-1',
        userPoolId: 'us-east-1_Nlmmx09oP',
        userPoolWebClientId: '7b2l44b2u3vc6j5uopk72rteeq',
    },
    apiConnections: {
        s3: "https://uat-paype-s3.s3.amazonaws.com",
        paype: {
            user: {
                // baseURL: "http://192.168.29.139:3000/api/v1",
                baseURL: "http://uat.paype.co.in:3000/api/v1",
                header: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                timeout: 30000,
                log: true
            },
            rbac: {
                // baseURL: "http://192.168.29.139:3001/api/v1",
                baseURL: "http://uat.paype.co.in:3001/api/v1",
                header: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                timeout: 30000,
                log: false
            },
            creditWallet: {
                // baseURL: "http://192.168.29.139:3002/api/v1",
                baseURL: "http://uat.paype.co.in:3002/api/v1",
                header: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                timeout: 30000,
                log: false
            },
            tradeWallet: {
                // baseURL: "http://192.168.29.139:3003/api/v1",
                baseURL: "http://uat.paype.co.in:3003/api/v1",
                header: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                timeout: 30000,
                log: false
            },
            services: {
                // baseURL: "http://192.168.29.139:3004/api/v1",
                baseURL: "http://uat.paype.co.in:3004/api/v1",
                header: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                timeout: 30000,
                log: false
            },
            recharge: {
                // baseURL: "http://192.168.29.139:3005/api/v1",
                baseURL: "http://uat.paype.co.in:3005/api/v1",
                header: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                timeout: 30000,
                log: true
            },
            forum: {
                // baseURL: "http://192.168.29.139:3006/api/v1",
                baseURL: "http://uat.paype.co.in:3006/api/v1",
                header: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                timeout: 30000,
                log: true
            },
        },
    }
}