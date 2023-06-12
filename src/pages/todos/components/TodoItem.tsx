import {Todo} from '../../../interface/todos'
import cn from '../style.module.scss'

const TodoItem = ({title, body, date}: Todo) => {
  return (
    <div className={cn.createTodo}>
      <h3>{title}</h3>
      <p>{body}</p>
      <span>{new Intl.DateTimeFormat('ru-Ru').format(date)}</span>
    </div>
  )
}

export default TodoItem
