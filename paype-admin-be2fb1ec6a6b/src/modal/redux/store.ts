import { configureStore } from '@reduxjs/toolkit'
import systemReducer from './system/system.slice'

export default configureStore({
  reducer: {
    system: systemReducer
  },
})

