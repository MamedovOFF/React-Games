import cn from './style.module.scss'
import {useCallback, useEffect, useState} from 'react'
import {COL_SIZE, COLOR_MAP, getRandomShape, getShape, ROW_SIZE} from './utils'
import useDebounce from '../../../hooks/useDebounce'
import {useKeyPress} from '../../../hooks/useKeyPress'

const Square = ({color, name}: {color: number; name: number}) => {
  return (
    <div className={cn.row} style={{backgroundColor: COLOR_MAP[color]}}>
      {name}
    </div>
  )
}

const Index = () => {
  const [board, setBoard] = useState(Array(ROW_SIZE * COL_SIZE).fill(-1))
  const [posY, setPosY] = useState(-3)
  const [posX, setPosX] = useState(ROW_SIZE / 2)
  let posXtemp = posX
  const positionDebounce = useDebounce(posY, 500)
  const [shapeNum, setShapeNum] = useState(getRandomShape())

  const updateBoard = (shapePos: number) => {
    setBoard(() => {
      const res = Array(ROW_SIZE * COL_SIZE).fill(-1)
      const shape = getShape(shapeNum, 0, posX, posY)
      shape.forEach((row) =>
        row.forEach((pos) => {
          if (pos !== -1) {
            res[pos] = shapePos
          }
        }),
      )
      return res
    })
  }

  const newShape = () => {
    setShapeNum(() => getRandomShape())
    setPosY(() => 0)
    console.log('New Block')
  }

  const shiftDown = () => {
    const shape = getShape(shapeNum, 0, posX, posY)
    if (posY + shape.length >= COL_SIZE) {
      newShape()
      return
    }
    setPosY((prevState) => {
      return prevState + 1
    })
  }
  const shiftSides = (isRight: boolean) => {
    const curShape = getShape(shapeNum, 0, posX, posY)
    const {deltaX, func, isEdge} = isRight
      ? {
          deltaX: 1,
          func: (edgeVal: number[]) => Math.max.apply(null, edgeVal),
          isEdge: posXtemp + curShape[0].length === ROW_SIZE,
        }
      : {
          deltaX: -1,
          func: (edgeVal: number[]) => Math.min.apply(null, edgeVal),
          isEdge: posXtemp === 0,
        }
    // Making sure we are not going off the edge
    if (isEdge) return
    posXtemp += deltaX
    setPosX((prevState) => prevState + deltaX)
  }
  useKeyPress(() => console.log('q'), ['KeyQ'])
  useKeyPress(() => console.log('e'), ['KeyE'])
  useKeyPress(() => shiftSides(false), ['KeyA'])
  useKeyPress(() => shiftSides(true), ['KeyD'])

  useEffect(() => {
    updateBoard(shapeNum)
    shiftDown()
  }, [positionDebounce, posX])

  return (
    <div className={cn.game}>
      <div className={cn.board}>
        {board.map((el, idx) => (
          <Square key={idx} color={el} name={idx} />
        ))}
      </div>
    </div>
  )
}

export default Index
