export const razorPayDefaultQuery = `
        razorPay.rapa_id = :_id 
        OR razorPay.rapa_user_id = :user_id 
        OR razorPay.rapa_status = :status
`