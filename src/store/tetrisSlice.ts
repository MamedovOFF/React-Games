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
  initialState: {
    tetris: initialState(),
  },
  reducers: {
    rotate(state) {
      const newRotation = nextRotation(
        state.tetris.shape,
        state.tetris.rotation,
      )
      if (
        canMoveTo(
          state.tetris.shape,
          state.tetris.grid,
          state.tetris.x,
          state.tetris.y,
          newRotation,
        )
      ) {
        state.tetris.rotation = newRotation
      }
    },
    moveRight(state) {
      if (state.tetris.y > -2) {
        if (
          canMoveTo(
            state.tetris.shape,
            state.tetris.grid,
            state.tetris.x + 1,
            state.tetris.y,
            state.tetris.rotation,
          )
        )
          state.tetris.x++
      }
    },
    moveLeft(state) {
      if (state.tetris.y > -2) {
        if (
          canMoveTo(
            state.tetris.shape,
            state.tetris.grid,
            state.tetris.x - 1,
            state.tetris.y,
            state.tetris.rotation,
          )
        )
          state.tetris.x--
      }
    },
    moveDown(state) {
      const maybeY = state.tetris.y + 1

      if (
        canMoveTo(
          state.tetris.shape,
          state.tetris.grid,
          state.tetris.x,
          maybeY,
          state.tetris.rotation,
        )
      ) {
        state.tetris.y = maybeY
        return
      }

      const obj = addBlockToGrid(
        state.tetris.shape,
        state.tetris.grid,
        state.tetris.x,
        state.tetris.y,
        state.tetris.rotation,
      )
      const newGrid = obj.grid
      const gameOver = obj.gameOver

      if (gameOver) {
        state.tetris.gameOver = true
        return
      }

      const newState = initialState()
      newState.grid = newGrid
      newState.shape = state.tetris.nextShape
      newState.score = state.tetris.score
      newState.isRunning = state.tetris.isRunning
      newState.score = state.tetris.score + checkRows(newGrid)
      state.tetris = newState
    },
    resume(state) {
      if (!state.tetris.isRunning) state.tetris.isRunning = true
    },
    pause(state) {
      if (state.tetris.isRunning) state.tetris.isRunning = false
    },
    restart(state) {
      state.tetris = initialState()
    },
  },
})

export const {rotate, resume, moveRight, moveLeft, moveDown, restart, pause} =
  tetrisSlice.actions
export default tetrisSlice.reducer
