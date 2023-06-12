import {shapes} from '../../pages/games/tetris/utils'
import {random} from '../../util/Random'

export const gridDefault = () => {
  return Array(18)
    .fill([])
    .map(() => Array(10).fill(0))
}

export const randomShape = () => {
  return random(1, shapes.length - 1)
}

export const nextRotation = (shape: number, rotation: number) => {
  return (rotation + 1) % shapes[shape].length
}

export const canMoveTo = (
  shape: number,
  grid: Array<Array<number>>,
  x: number,
  y: number,
  rotation: number,
) => {
  const currentShape = shapes[shape][rotation]
  for (let row = 0; row < currentShape.length; row++)
    for (let col = 0; col < currentShape[row].length; col++) {
      if (currentShape[row][col] !== 0) {
        const proposedX = col + x
        const proposedY = row + y
        if (proposedY < 0) continue
        const possibleRow = grid[proposedY]
        if (possibleRow) {
          if (
            possibleRow[proposedX] === undefined ||
            possibleRow[proposedX] !== 0
          )
            return false
        } else return false
      }
    }
  return true
}

export const checkRows = (grid: Array<Array<number>>) => {
  const points = [0, 40, 100, 300, 1200]
  let completedRows = 0
  for (let row = 0; row < grid.length; row++) {
    if (grid[row].indexOf(0) === -1) {
      completedRows += 1
      grid.splice(row, 1)
      grid.unshift(Array(10).fill(0))
    }
  }
  return points[completedRows]
}

export const addBlockToGrid = (
  shape: number,
  grid: Array<Array<number>>,
  x: number,
  y: number,
  rotation: number,
) => {
  let blockOffGrid = false
  const block = shapes[shape][rotation]
  const newGrid = [...grid]
  for (let row = 0; row < block.length; row++) {
    for (let col = 0; col < block[row].length; col++) {
      if (block[row][col]) {
        const yIndex = row + y
        if (yIndex < 0) {
          blockOffGrid = true
        } else {
          newGrid[row + y][col + x] = shape
        }
      }
    }
  }
  return {grid: newGrid, gameOver: blockOffGrid}
}
