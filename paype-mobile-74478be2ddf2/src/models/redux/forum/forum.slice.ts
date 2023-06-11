import { createSlice } from '@reduxjs/toolkit'

const listInit = { isLoading: true, data: [] }

export interface forumInitialState {
  isLoading: boolean;
  storyBoard: { isLoading: boolean, data: any[] },
}

export const initialState = {
  isLoading: true,
  storyBoard: listInit
}

const slice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    setForumStore: (state, incoming) => {
      return state = {
        ...state,
        ...incoming.payload
      }
    }
  },
})

export const forumReducer = slice.reducer
export const forumActions = slice.actions
