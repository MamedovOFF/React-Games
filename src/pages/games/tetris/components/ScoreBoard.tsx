import {useDispatch} from 'react-redux'
import cn from '../style.module.scss'
import {pause, restart, resume} from '../../../../store/actions/tetrisActions'
import {Button} from '@mui/material'

type scoreBoardProps = {
  score: number
  isRunning: boolean
  gameOver: boolean
}

const ScoreBoard = ({score, isRunning, gameOver}: scoreBoardProps) => {
  const dispatch = useDispatch()
  const pausePlay = () => {
    if (gameOver) return
    if (isRunning) dispatch(pause())
    else dispatch(resume())
  }
  return (
    <div className={cn.scoreBoard}>
      <div>Score:{score}</div>
      <div>Level: 1</div>
      <Button variant="contained" onClick={pausePlay}>
        {isRunning ? 'Pause' : 'Play'}
      </Button>
      <Button variant="contained" onClick={() => dispatch(restart())}>
        Restart
      </Button>
    </div>
  )
}
export default ScoreBoard
