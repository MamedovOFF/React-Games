import cn from './style.module.scss'
import {useState} from 'react'
import {calculateWinner, isFull} from './util'

interface Square {
  value: string | null
  onClick: () => void
}

const Square = ({value, onClick}: Square) => {
  return (
    <button disabled={!!value} className={cn.square} onClick={onClick}>
      {value}
    </button>
  )
}

const Index = () => {
  const [table, setTable] = useState<Array<string | null>>(Array(9).fill(null))
  const [player, setPlayer] = useState<string>('X')

  const winner: string | null = calculateWinner(table)
  let status: string
  if (winner) status = 'Winner: ' + winner
  else if (isFull(table) >= 9) status = 'DRAW, NO ONE WINS'
  else status = 'Next player: ' + (player === 'X' ? 'X' : 'O')

  function nextPlayer(idx: number) {
    if (winner) return
    if (player === 'X') setPlayer('O')
    else setPlayer('X')

    setTable((prevState) => {
      if (!prevState[idx]) {
        const newArr = prevState
        newArr.splice(idx, 1, player)
        return newArr
      }
      return prevState
    })
  }

  return (
    <div className={cn.game}>
      <div className={cn.board}>
        {table.map((el, idx) => (
          <Square key={idx} onClick={() => nextPlayer(idx)} value={el} />
        ))}
      </div>
      <h4 className={cn.move}>{status}</h4>
    </div>
  )
}

export default Index
