import {shapes} from '../utils'
import cn from '../style.module.scss'
import Square from './Square'

const NextBlock = ({nextShape}: {nextShape: number}) => {
  const box = shapes[nextShape][0]
  const grid = box.map((rowArray, row) => {
    return rowArray.map((square, col) => {
      return <Square key={`${row}${col}`} color={square} />
    })
  })
  return <div className={cn.nextBlock}>{grid}</div>
}

export default NextBlock
