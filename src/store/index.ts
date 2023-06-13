import {configureStore} from '@reduxjs/toolkit'
import tetrisReducer from './tetrisSlice'
import todoReducer from './todoSlice'
import {todosApi} from './services/todos'

export const store = configureStore({
  reducer: {
    tetris: tetrisReducer,
    todo: todoReducer,
    [todosApi.reducerPath]: todosApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todosApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
