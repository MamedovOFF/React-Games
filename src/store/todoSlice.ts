import {createSlice} from '@reduxjs/toolkit'
import {Todo} from '../interface/todos'

const todoSlice = createSlice({
  name: 'todos',
  initialState: [] as Array<Todo>,
  reducers: {
    createTodo(state, action) {
      state.push({
        title: action.payload.title,
        body: action.payload.body,
        id: action.payload.id,
        date: new Date(),
      })
    },
  },
})

export const {createTodo} = todoSlice.actions
export default todoSlice.reducer
