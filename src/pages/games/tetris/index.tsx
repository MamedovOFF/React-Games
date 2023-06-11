import cn from './style.module.scss'
import {COLOR_MAP, shapes} from './utils'
import {useSelector, useDispatch} from 'react-redux'
import {
  moveDown,
  moveLeft,
  moveRight,
  restart,
  resume,
  pause,
  rotate,
} from '../../../store/actions/tetrisActions'
import {useEffect, useRef} from 'react'

type squareProps = {
  color: number
}

const Square = ({color}: squareProps) => (
  <div className={cn.square} style={{backgroundColor: COLOR_MAP[color]}} />
)

const NextBlock = () => {
  const nextShape = useSelector((state) => state.tetris.nextShape)
  const box = shapes[nextShape][0]
  const grid = box.map((rowArray, row) => {
    return rowArray.map((square, col) => {
      return <Square key={`${row}${col}`} color={square} />
    })
  })
  return <div className={cn.nextBlock}>{grid}</div>
}

const ScoreBoard = () => {
  const dispatch = useDispatch()
  const game = useSelector((state) => state.tetris)
  const {score, isRunning, gameOver} = game

  return (
    <div className={cn.scoreBoard}>
      <div>Score:{score}</div>
      <div>Level: 1</div>
      <button
        className={cn.scoreBoardButton}
        onClick={() => {
          if (gameOver) {
            return
          }
          if (isRunning) {
            dispatch(pause())
          } else {
            dispatch(resume())
          }
        }}>
        {isRunning ? 'Pause' : 'Play'}
      </button>
      <button
        className={cn.scoreBoardButton}
        onClick={() => dispatch(restart())}>
        Restart
      </button>
    </div>
  )
}

const Controls = () => {
  const dispatch = useDispatch()
  const isRunning = useSelector((state: any) => state.tetris.isRunning)
  const gameOver = useSelector((state: any) => state.tetris.gameOver)
  return (
    <div className={cn.controls}>
      <button
        disabled={!isRunning || gameOver}
        className={cn.controlsButton}
        onClick={() => dispatch(moveLeft())}>
        Left
      </button>
      <button
        disabled={!isRunning || gameOver}
        className={cn.controlsButton}
        onClick={() => dispatch(moveRight())}>
        Right
      </button>
      <button
        disabled={!isRunning || gameOver}
        className={cn.controlsButton}
        onClick={() => dispatch(rotate())}>
        Rotate
      </button>
      <button
        disabled={!isRunning || gameOver}
        className={cn.controlsButton}
        onClick={() => dispatch(moveDown())}>
        Down
      </button>
    </div>
  )
}

const MessagePopup = ({hidden}: {hidden: boolean}) => {
  return (
    <div className={`${cn.messagePopup} ${!hidden && cn.hidden}`}>
      <h1>Message Title</h1>
      <p>Message info...</p>
    </div>
  )
}

const Index = () => {
  const requestRef = useRef()
  const lastUpdateTimeRef = useRef(0)
  const progressTimeRef = useRef(0)
  const dispatch = useDispatch()
  const game = useSelector((state: any) => state.tetris)
  const {grid, shape, rotation, x, y, isRunning, speed, gameOver} = game

  const block = shapes[shape][rotation]
  const blockColor = shape
  // map rows
  const gridSquares = grid.map((rowArray: Array<number>, row: number) => {
    // map columns
    return rowArray.map((square, col) => {
      // Find the block x and y on the shape grid
      // By subtracting the x and y from the col and the row we get the position of the upper left corner of the block array as if it was superimposed over the main grid
      const blockX = col - x
      const blockY = row - y
      let color = square
      // Map current falling block to grid.
      // For any squares that fall on the grid we need to look at the block array and see if there is a 1 in this case we use the block color.
      if (
        blockX >= 0 &&
        blockX < block.length &&
        blockY >= 0 &&
        blockY < block.length
      ) {
        color = block[blockY][blockX] === 0 ? color : blockColor
      }
      // Generate a unique key for every block
      const k = row * grid[0].length + col
      // Generate a grid square
      return <Square key={k} color={color} />
    })
  })

  const update = (time) => {
    requestRef.current = requestAnimationFrame(update)
    if (!isRunning) {
      return
    }
    if (!lastUpdateTimeRef.current) {
      lastUpdateTimeRef.current = time
    }
    const deltaTime = time - lastUpdateTimeRef.current
    progressTimeRef.current += deltaTime
    if (progressTimeRef.current > speed) {
      dispatch(moveDown())
      progressTimeRef.current = 0
    }
    lastUpdateTimeRef.current = time
  }
  useEffect(() => {
    requestRef.current = requestAnimationFrame(update)
    return () => cancelAnimationFrame(requestRef.current)
  }, [isRunning])

  return (
    <div className={cn.game}>
      <NextBlock />
      <div>
        <div className={cn.board}>{gridSquares}</div>
        <Controls />
      </div>
      <ScoreBoard />
      <MessagePopup hidden={gameOver || !isRunning} />
    </div>
  )
}

export default Index
