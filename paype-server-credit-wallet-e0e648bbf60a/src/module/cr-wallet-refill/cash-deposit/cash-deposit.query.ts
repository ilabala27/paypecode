export const cashDepositDefaultQuery = `
        cashDeposit.cade_id = :_id 
        OR cashDeposit.cade_user_id = :user_id 
        OR cashDeposit.cade_status = :status
`