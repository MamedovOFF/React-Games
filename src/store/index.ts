import {configureStore} from '@reduxjs/toolkit'
import tetris from './reducers/tetris'

export const store = configureStore({
  reducer: {
    tetris: tetris,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
