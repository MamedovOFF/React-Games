import {
  addBlockToGrid,
  canMoveTo,
  checkRows,
  gridDefault,
  nextRotation,
  randomShape,
} from '../actions/tetrisActions'
import {
  GAME_OVER,
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  PAUSE,
  RESTART,
  RESUME,
  ROTATE,
} from '../constants/tetris'

const defaultState = () => {
  return {
    grid: gridDefault(),
    shape: randomShape(),
    rotation: 0,
    x: 5,
    y: -4,
    nextShape: randomShape(),
    isRunning: true,
    score: 0,
    speed: 1000,
    gameOver: false,
  }
}

const tetris = (state = defaultState(), action: any) => {
  switch (action.type) {
    case ROTATE: {
      const newRotation = nextRotation(state.shape, state.rotation)
      if (canMoveTo(state.shape, state.grid, state.x, state.y, newRotation)) {
        return {...state, rotation: newRotation}
      }
      return state
    }

    case MOVE_RIGHT: {
      if (
        canMoveTo(state.shape, state.grid, state.x + 1, state.y, state.rotation)
      )
        return {...state, x: state.x + 1}
      return state
    }

    case MOVE_LEFT: {
      if (
        canMoveTo(state.shape, state.grid, state.x - 1, state.y, state.rotation)
      ) {
        return {...state, x: state.x - 1}
      }
      return state
    }

    case MOVE_DOWN: {
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
        const newState = {...state}
        newState.shape = 0
        newState.grid = newGrid
        return {...state, gameOver: true}
      }

      const newState = defaultState()
      newState.grid = newGrid
      newState.shape = state.nextShape
      newState.score = state.score
      newState.isRunning = state.isRunning

      newState.score = state.score + checkRows(newGrid)

      return newState
    }

    case RESUME: {
      if (!state.isRunning) return {...state, isRunning: true}
      return state
    }

    case PAUSE: {
      if (state.isRunning) return {...state, isRunning: false}
      return state
    }

    case GAME_OVER:
      return state

    case RESTART:
      return defaultState()

    default:
      return state
  }
}

export default tetris
