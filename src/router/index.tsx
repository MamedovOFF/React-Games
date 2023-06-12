import {createBrowserRouter} from 'react-router-dom'
import Main from '../components/layout/main'
import Games from '../pages/games'
import TicTacToe from '../pages/games/ticTacToe'
import GamesTable from '../components/gamesTable'
import ErrorPage from '../pages/errorPage'
import Tetris from '../pages/games/tetris'
import Todos from '../pages/todos'
import TodoList from '../pages/todos/components/TodoList'
import CreateTodo from '../pages/todos/components/CreateTodo'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/games',
        element: <Games />,
        children: [
          {
            path: '',
            element: <GamesTable />,
          },
          {
            path: 'tic-tac-toe',
            element: <TicTacToe />,
          },
          {
            path: 'tetris',
            element: <Tetris />,
          },
        ],
      },
      {
        path: '/todos',
        element: <Todos />,
        children: [
          {
            path: '',
            element: <TodoList />,
          },
          {
            path: 'create-todo',
            element: <CreateTodo />,
          },
        ],
      },
    ],
  },
])

export default router
