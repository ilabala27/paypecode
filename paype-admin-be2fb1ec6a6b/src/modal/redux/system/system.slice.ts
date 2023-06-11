import { createSlice } from '@reduxjs/toolkit'

export const systemSlice = createSlice({
  name: 'system',
  // Reducer
  initialState: {
    user: null,
  },
  // Actions
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = systemSlice.actions

export default systemSlice.reducer