import {createSlice} from '@reduxjs/toolkit'
import {
  addBlockToGrid,
  canMoveTo,
  checkRows,
  gridDefault,
  nextRotation,
  randomShape,
} from './function/tetris'

const initialState = () => {
  return {
    grid: gridDefault(),
    shape: randomShape(),
    rotation: 0,
    x: 5,
    y: -4,
    nextShape: randomShape(),
    isRunning: true,
    score: 0,
    speed: 500,
    gameOver: false,
  }
}

const tetrisSlice = createSlice({
  name: 'tetris',
  initialState,
  reducers: {
    rotate(state) {
      const newRotation = nextRotation(state.shape, state.rotation)
      if (canMoveTo(state.shape, state.grid, state.x, state.y, newRotation)) {
        state.rotation = newRotation
      }
    },
    moveRight(state) {
      if (
        canMoveTo(state.shape, state.grid, state.x + 1, state.y, state.rotation)
      )
        state.x++
    },
    moveLeft(state) {
      if (
        canMoveTo(state.shape, state.grid, state.x - 1, state.y, state.rotation)
      )
        state.x--
    },
    moveDown(state) {
      const maybeY = state.y + 1

      if (canMoveTo(state.shape, state.grid, state.x, maybeY, state.rotation))
        return {...state, y: maybeY}

      const obj = addBlockToGrid(
        state.shape,
        state.grid,
        state.x,
        state.y,
        state.rotation,
      )
      const newGrid = obj.grid
      const gameOver = obj.gameOver

      if (gameOver) {
        return {...state, gameOver: true}
      }

      const newState = initialState()
      state.grid = newGrid
      state.shape = state.nextShape
      state.rotation = newState.rotation
      state.x = newState.x
      state.y = newState.y
      state.nextShape = newState.nextShape
      state.isRunning = newState.isRunning
      state.score += checkRows(newGrid)
      state.speed = newState.speed
    },
    resume(state) {
      if (!state.isRunning) state.isRunning = true
    },
    pause(state) {
      if (state.isRunning) state.isRunning = false
    },
    restart: initialState,
  },
})

export const {rotate, resume, moveRight, moveLeft, moveDown, restart, pause} =
  tetrisSlice.actions
export default tetrisSlice.reducer
