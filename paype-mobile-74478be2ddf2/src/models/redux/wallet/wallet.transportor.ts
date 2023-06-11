import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { walletActions, walletInitialState } from '@models/redux/wallet/wallet.slice';
import { SYSTEM_SAGA_ACTIONS } from '@models/redux/wallet/wallet.sagaActions';


export const walletTransportor = () => {
    // ### store
    const store = () => useSelector((state: { wallet: walletInitialState }) => state.wallet, shallowEqual)
    // ### Actions
    const dispatch = useDispatch()
    // @@@ Redux actions
    const setWalletStore = (payload: any) => dispatch(walletActions.setWalletStore(payload))
    // @@@ Saga actions
    const setCreditBalanceAndTransaction = (payload: any) => dispatch({ type: SYSTEM_SAGA_ACTIONS.SET_BALANCE_TRANSACTION, payload })
    const setCashDeposit = (payload: any) => dispatch({ type: SYSTEM_SAGA_ACTIONS.SET_CASH_DEPOSIT, payload })
    const transactCashDeposit = (payload: any) => dispatch({ type: SYSTEM_SAGA_ACTIONS.TRANSACT_CASH_DEPOSIT, payload })
    const transactRazorPay = (payload: any) => dispatch({ type: SYSTEM_SAGA_ACTIONS.TRANSACT_RAZOR_PAY, payload })

    return {
        walletStore: store,
        setWalletStore,
        setCreditBalanceAndTransaction,
        setCashDeposit,
        transactCashDeposit,
        transactRazorPay
    }
};