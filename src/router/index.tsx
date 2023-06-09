import {createBrowserRouter} from 'react-router-dom'
import Main from '../components/layout/main'
import Games from '../pages/games'
import TicTacToe from '../pages/games/ticTacToe'
import GamesTable from '../components/gamesTable'
import ErrorPage from '../pages/errorPage'
import Tetris from '../pages/games/tetris'

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
    ],
  },
])

export default router
