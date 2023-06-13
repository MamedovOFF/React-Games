import TodoItem from './TodoItem'
import {useSelector} from 'react-redux'
import {RootState} from '../../../store'
import cn from '../style.module.scss'

const TodoList = () => {
  const todos = useSelector((state: RootState) => state.todo.todo)
  return (
    <div className={cn.todoList}>
      {todos.map((el) => (
        <TodoItem key={el.id} {...el} />
      ))}
    </div>
  )
}

export default TodoList
