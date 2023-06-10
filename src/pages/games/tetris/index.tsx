import cn from './style.module.scss'
import {useEffect, useState} from 'react'
import {COL_SIZE, COLOR_MAP, getRandomShape, getShape, ROW_SIZE} from './utils'
import {useKeyPress} from '../../../hooks/useKeyPress'

const Square = ({color, name}: {color: number; name: number}) => {
  return (
    <div className={cn.row} style={{backgroundColor: COLOR_MAP[color]}}>
      {name}
    </div>
  )
}

const Index = () => {
  const [board, setBoard] = useState<Array<number>>(
    Array(ROW_SIZE * COL_SIZE).fill(-1),
  )
  const [position, setPosition] = useState(() => ({x: ROW_SIZE / 2, y: -3}))
  const [shapeNum, setShapeNum] = useState(getRandomShape())

  const updateBoard = (shapePos: number) => {
    setBoard((prevState) => {
      const res = [...prevState]
      const shape = getShape(shapeNum, 0, position.x, position.y)
      shape.forEach((row) => {
        row.forEach((pos) => {
          if (pos !== -1) {
            res[pos] = shapePos
          }
        })
      })
      return res
    })
  }

  const newShape = () => {
    // const shape = getShape(shapeNum, 0, position.x, position.y)
    // for (let i = 0; i < shape.length; i++) {
    //   const row = [...Array(ROW_SIZE)].map(
    //     (_, pos) => pos + ROW_SIZE * (position.y + i),
    //   )
    //
    //   const isFilled =
    //     row.map((pos) => board[pos]).filter((val) => val !== -1).length ===
    //     ROW_SIZE
    //   if (isFilled) {
    //     setBoard((prevState) => {
    //       const board = [...prevState]
    //       row.forEach((pos) => (board[pos] = -1))
    //       for (let j = row[0]; j > 0; j--) {
    //         if (board[j] !== -1) {
    //           board[j + ROW_SIZE] = board[j]
    //           board[j] = -1
    //         }
    //       }
    //       return board
    //     })
    //   }
    // }
    setShapeNum(getRandomShape())
    setPosition(() => ({
      x: ROW_SIZE / 2,
      y: -3,
    }))
  }

  const shiftDown = () => {
    setPosition((prevState) => ({...prevState, y: prevState.y + 1}))
  }

  const shiftSides = (isRight: boolean) => {
    setPosition((prevState) => {
      const curShape = getShape(shapeNum, 0, prevState.x, prevState.y)
      const {deltaX, func, isEdge} = isRight
        ? {
            deltaX: 1,
            func: (edgeVal: number[]) => Math.max(...edgeVal),
            isEdge: prevState.x + curShape[0].length === ROW_SIZE,
          }
        : {
            deltaX: -1,
            func: (edgeVal: number[]) => Math.min(...edgeVal),
            isEdge: prevState.x === 0,
          }
      if (isEdge) {
        console.log('isEdge')
        return prevState
      }

      let isConflict = false

      curShape.forEach((oldArray) => {
        // Removing elemnts that are not part of block
        const newArray = oldArray.filter((val) => val !== -1)
        // checking the edge most value after we shift
        const edgeValue = func(newArray) + deltaX
        // checking that there is no conflict
        if (board[edgeValue] !== -1) {
          isConflict = true
        }
      })
      if (!isConflict) {
        console.log(deltaX)
        return {
          ...prevState,
          x: prevState.x + deltaX,
        }
      }

      return prevState
    })
  }

  // useEffect(() => {
  //   const int = setInterval(() => {
  //     shiftDown()
  //   }, 500)
  //   return () => {
  //     clearInterval(int)
  //   }
  // }, [position])

  useEffect(() => {
    updateBoard(shapeNum)
    const shape = getShape(shapeNum, 0, position.x, position.y)
    if (position.y + shape.length >= COL_SIZE) {
      newShape()
      return
    } else {
      for (let i = 0; i < shape[0].length; i++) {
        const newArray = shape.map((row) =>
          row[i] === -1 ? -1 : row[i] + ROW_SIZE,
        )
        const bottomValue = Math.max(...newArray)
        if (board[bottomValue] !== undefined && board[bottomValue] !== -1) {
          if (position.y <= 0 && position.y !== -3) {
            // newShape()
            // alert('Game Over')
          } else newShape()
          return
        }
      }
    }
    return () => {
      updateBoard(-1)
    }
  }, [position])

  useKeyPress(() => shiftSides(false), ['KeyA'])
  useKeyPress(() => shiftSides(true), ['KeyD'])
  useKeyPress(shiftDown, ['KeyS'])

  return (
    <div className={cn.game}>
      X:{position.x} Y:{position.y}
      <div className={cn.board}>
        {board.map((el, idx) => (
          <Square key={idx} color={el} name={idx} />
        ))}
      </div>
    </div>
  )
}

export default Index
