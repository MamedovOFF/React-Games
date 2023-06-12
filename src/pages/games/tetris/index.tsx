import cn from './style.module.scss'
import {useSelector, useDispatch} from 'react-redux'
import {moveDown, moveLeft, moveRight, rotate} from '../../../store/tetrisSlice'
import {MutableRefObject, useEffect, useRef} from 'react'
import MessagePopup from './components/MessagePopup'
import ScoreBoard from './components/ScoreBoard'
import {useKeyPress} from '../../../hooks/useKeyPress'
import NextBlock from './components/NextBlock'
import Board from './components/Board'
import {RootState} from '../../../store'

const Index = () => {
  const requestRef: MutableRefObject<
    HTMLDivElement | null | undefined | number
  > = useRef()
  const lastUpdateTimeRef = useRef(0)
  const progressTimeRef = useRef(0)
  const dispatch = useDispatch()
  const game = useSelector((state: RootState) => state.tetris)
  const {
    grid,
    shape,
    rotation,
    x,
    y,
    isRunning,
    speed,
    gameOver,
    score,
    nextShape,
  } = game

  const update = (time: number) => {
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
    return () => {
      if (typeof requestRef.current === 'number')
        cancelAnimationFrame(requestRef.current)
    }
  }, [isRunning])

  useKeyPress(() => {
    if (isRunning || !gameOver) {
      dispatch(moveDown())
    }
  }, ['ArrowDown'])

  useKeyPress(() => {
    if (isRunning || !gameOver) {
      dispatch(moveLeft())
    }
  }, ['ArrowLeft'])

  useKeyPress(() => {
    if (isRunning || !gameOver) {
      dispatch(moveRight())
    }
  }, ['ArrowRight'])

  useKeyPress(() => {
    if (isRunning || !gameOver) {
      dispatch(rotate())
    }
  }, ['KeyZ'])

  return (
    <div className={cn.game}>
      <NextBlock nextShape={nextShape} />
      <Board grid={grid} y={y} shape={shape} rotation={rotation} x={x} />
      <ScoreBoard score={score} isRunning={isRunning} gameOver={gameOver} />
      <MessagePopup hidden={gameOver || !isRunning} />
    </div>
  )
}

export default Index
