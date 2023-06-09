import {
  Button,
  Card,
  CardActions,
  CardContent,
  Skeleton,
  Typography,
} from '@mui/material'
import {Link} from 'react-router-dom'
import cn from './style.module.scss'

const Index = () => {
  return (
    <div className={cn.gamesTable}>
      <Card>
        <div className={cn.img}>
          <img src="src/assets/images/tic-tac-toe.jpg" alt="Tic-Tac-Toe" />
        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Tic-Tac-Toe
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Link to="/games/tic-tac-toe">
            <Button size="small">Play</Button>
          </Link>
        </CardActions>
      </Card>
      <Card>
        <div className={cn.img}>
          <img src="src/assets/images/tic-tac-toe.jpg" alt="Tic-Tac-Toe" />
        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Tetris
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Link to="/games/tetris">
            <Button size="small">Play</Button>
          </Link>
        </CardActions>
      </Card>
      <Skeleton variant="rectangular" width={345} height={550} />
      <Skeleton variant="rectangular" width={345} height={550} />
      <Skeleton variant="rectangular" width={345} height={550} />
      <Skeleton variant="rectangular" width={345} height={550} />
      <Skeleton variant="rectangular" width={345} height={550} />
      <Skeleton variant="rectangular" width={345} height={550} />
      <Skeleton variant="rectangular" width={345} height={550} />
      <Skeleton variant="rectangular" width={345} height={550} />
      <Skeleton variant="rectangular" width={345} height={550} />
      <Skeleton variant="rectangular" width={345} height={550} />
    </div>
  )
}

export default Index
