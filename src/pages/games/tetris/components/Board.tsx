import cn from '../style.module.scss'
import Square from './Square'
import {shapes} from '../utils'

type boardProps = {
  shape: number
  rotation: number
  grid: Array<Array<number>>
  x: number
  y: number
}

const Board = ({shape, rotation, grid, x, y}: boardProps) => {
  const block = shapes[shape][rotation]
  const blockColor = shape
  return (
    <div className={cn.board}>
      {grid.map((rowArray: Array<number>, row: number) => {
        return rowArray.map((square, col) => {
          const blockX = col - x
          const blockY = row - y
          let color = square
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
      })}
    </div>
  )
}

export default Board
