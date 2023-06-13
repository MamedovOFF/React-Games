import cn from '../style.module.scss'
import {useSelector} from 'react-redux'
import {RootState} from '../../../../store'

const MessagePopup = () => {
  const {gameOver, isRunning} = useSelector(
    (state: RootState) => state.tetris.tetris,
  )
  return (
    <div
      className={`${cn.messagePopup} ${
        !(!isRunning || gameOver) && cn.hidden
      }`}>
      <h1>{gameOver ? 'Game Over' : 'Pause'}</h1>
      <p>{gameOver ? 'You Lose' : 'Please click to Play'}</p>
    </div>
  )
}

export default MessagePopup
