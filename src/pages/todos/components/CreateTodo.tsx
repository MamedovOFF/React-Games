import {Button, TextField} from '@mui/material'
import cn from '../style.module.scss'
import {FormEvent, useId, useState} from 'react'
import {useDispatch} from 'react-redux'
import {createTodo} from '../../../store/todoSlice'
import {useNavigate} from 'react-router-dom'

const CreateTodo = () => {
  const dispatch = useDispatch()
  const id = useId()
  const navigate = useNavigate()
  const [title, setTitle] = useState<string>('')
  const [body, setBody] = useState<string>('')
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(
      createTodo({
        title,
        body,
        id,
      }),
    )
    navigate('/todos')
  }
  return (
    <div className={cn.createTodo}>
      <form className={cn.form} onSubmit={submit}>
        <TextField
          label="Todo Title"
          variant="outlined"
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Todo Body"
          variant="outlined"
          onChange={(e) => setBody(e.target.value)}
        />
        <Button variant="contained" type="submit">
          Create
        </Button>
      </form>
    </div>
  )
}

export default CreateTodo
