import {Outlet, useLocation, useNavigate} from 'react-router-dom'
import Capitalize from '../../util/Capitalize'
import {Collapse, Fab} from '@mui/material'
import {ArrowBack, GitHub} from '@mui/icons-material'

const Index = () => {
  const {pathname} = useLocation()
  const navigate = useNavigate()
  const header = Capitalize(pathname.split('/').pop() as string)

  return (
    <div className="page">
      <div className="header">
        <Collapse in={header !== 'Games'} orientation="horizontal">
          <Fab color="primary" aria-label="add" onClick={() => navigate(-1)}>
            <ArrowBack />
          </Fab>
        </Collapse>
        <h2 className="title">{header}</h2>
        <Fab color="primary" aria-label="add">
          <GitHub />
        </Fab>
      </div>
      <Outlet />
    </div>
  )
}

export default Index
