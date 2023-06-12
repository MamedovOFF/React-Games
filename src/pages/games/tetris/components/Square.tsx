import cn from '../style.module.scss'
import {COLOR_MAP} from '../utils'

type squareProps = {
  color: number
}

const Square = ({color}: squareProps) => (
  <div className={cn.square} style={{backgroundColor: COLOR_MAP[color]}} />
)

export default Square
