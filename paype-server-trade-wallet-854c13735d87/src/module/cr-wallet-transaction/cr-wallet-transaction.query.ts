export const crWalletTransactionDefaultQuery = `
        walletTransaction.cwtr_id = :_id 
        OR walletTransaction.cwtr_user_id = :user_id 
        OR walletTransaction.cwtr_wallet_id = :wallet_id
`