import {Todo} from '../../../interface/todos'
import cn from '../style.module.scss'
import {IconButton, Switch} from '@mui/material'
import {Delete} from '@mui/icons-material'
import {useDispatch} from 'react-redux'
import {deleteTodo, doneTodo} from '../../../store/todoSlice'

const TodoItem = ({title, body, date, id, done}: Todo) => {
  const dispatch = useDispatch()
  return (
    <div className={cn.todoItem}>
      <div className={cn.textContent}>
        <div className={cn.title}>
          <h3>{title}</h3>
          <span>{date}</span>
        </div>
        <div className={cn.body}>
          <Switch
            aria-label="Done Todo"
            checked={done}
            onChange={() => dispatch(doneTodo({id}))}
          />
          <p>{body}</p>
        </div>
      </div>
      <div className={cn.action}>
        <IconButton
          color="primary"
          aria-label="add to shopping cart"
          onClick={() => dispatch(deleteTodo({id}))}>
          <Delete color="action" />
        </IconButton>
      </div>
    </div>
  )
}

export default TodoItem
