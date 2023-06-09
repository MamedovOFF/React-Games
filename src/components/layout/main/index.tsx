import {Container} from '@mui/material'
import {Outlet} from 'react-router-dom'
import Navigation from '../../navigation'

const Index = () => {
  return (
    <>
      <Navigation />
      <Container>
        <Outlet />
      </Container>
    </>
  )
}

export default Index
