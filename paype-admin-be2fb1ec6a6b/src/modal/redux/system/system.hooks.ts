import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from './system.slice'


export function useSystemStore () {
  const store = useSelector((state: any) => state.system)
  const dispatch = useDispatch()
  return {
    SYSTEM_STORE: store,
    LOGIN: (payload: any) => dispatch(login(payload)),
    LOGOUT: () => dispatch(logout())
  }
}