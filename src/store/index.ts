import {configureStore} from '@reduxjs/toolkit'
import tetrisReducer from './tetrisReducer'

export const store = configureStore({
  reducer: {
    tetris: tetrisReducer,
  },
})
