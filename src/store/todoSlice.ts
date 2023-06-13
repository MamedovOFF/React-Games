import {createSlice} from '@reduxjs/toolkit'
import {Todo} from '../interface/todos'

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todo: [] as Array<Todo>,
  },
  reducers: {
    createTodo(state, action) {
      state.todo.push({
        title: action.payload.title,
        body: action.payload.body,
        id: action.payload.id,
        date: new Intl.DateTimeFormat('ru-Ru').format(new Date()),
        done: action.payload.done,
      })
    },
    deleteTodo(state, action) {
      state.todo = state.todo.filter((todo) => todo.id !== action.payload.id)
    },
    doneTodo(state, action) {
      state.todo.forEach((el) => {
        if (el.id === action.payload.id) el.done = true
      })
    },
  },
})

export const {createTodo, deleteTodo, doneTodo} = todoSlice.actions
export default todoSlice.reducer
