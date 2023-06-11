import {
  GAME_OVER,
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  PAUSE,
  RESTART,
  RESUME,
  ROTATE,
} from './actions/tetrisActions'
import {
  addBlockToGrid,
  canMoveTo,
  checkRows,
  gridDefault,
  nextRotation,
  randomShape,
} from '../pages/games/tetris/utils'

const defaultState = () => {
  return {
    // Create an empty grid
    grid: gridDefault(),
    // Get a new random shape
    shape: randomShape(),
    // set rotation of the shape to 0
    rotation: 0,
    // set the 'x' position of the shape to 5 and y to -4, which puts the shape in the center of the grid, above the top
    x: 5,
    y: -4,
    // set the index of the next shape to a new random shape
    nextShape: randomShape(),
    // Tell the game that it's currently running
    isRunning: true,
    // Set the score to 0
    score: 0,
    // Set the default speed
    speed: 1000,
    // Game isn't over yet
    gameOver: false,
  }
}

const tetrisReducer = (state = defaultState(), action) => {
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
      ) {
        return {...state, x: state.x + 1}
      }
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
      // Get the next potential Y position
      const maybeY = state.y + 1

      // Check if the current block can move here
      if (canMoveTo(state.shape, state.grid, state.x, maybeY, state.rotation)) {
        // If so move down don't place the block
        return {...state, y: maybeY}
      }

      // If not place the block
      // (this returns an object with a grid and gameover bool)
      const obj = addBlockToGrid(
        state.shape,
        state.grid,
        state.x,
        state.y,
        state.rotation,
      )
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const newGrid = obj.grid
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const gameOver = obj.gameOver

      if (gameOver) {
        // Game Over
        const newState = {...state}
        newState.shape = 0
        newState.grid = newGrid
        return {...state, gameOver: true}
      }

      // reset somethings to start a new shape/block
      const newState = defaultState()
      newState.grid = newGrid
      newState.shape = state.nextShape
      newState.score = state.score
      newState.isRunning = state.isRunning

      // TODO: Check and Set level
      // Score increases decrease interval
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

export default tetrisReducer
