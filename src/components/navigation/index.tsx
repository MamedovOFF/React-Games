import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Button from '@mui/material/Button'
import {
  Drawer,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
} from '@mui/material'
import {useState} from 'react'
import {Games, GitHub, Home, Info} from '@mui/icons-material'
import {NavLink} from 'react-router-dom'

const Index = () => {
  const [toggle, setToggle] = useState<boolean>(false)
  return (
    <>
      <Box sx={{flexGrow: 1}}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{mr: 2}}
              onClick={() => setToggle(true)}>
              <MenuIcon />
            </IconButton>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer anchor={'left'} open={toggle} onClose={() => setToggle(false)}>
        <div className="navigation_wrapper">
          <Paper sx={{width: 320, maxWidth: '100%'}}>
            <MenuList>
              <NavLink to="/">
                <MenuItem>
                  <ListItemIcon>
                    <Home fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Home</ListItemText>
                </MenuItem>
              </NavLink>
              <NavLink to="/games">
                <MenuItem>
                  <ListItemIcon>
                    <Games fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Games</ListItemText>
                </MenuItem>
              </NavLink>
              <NavLink to="/about">
                <MenuItem>
                  <ListItemIcon>
                    <Info fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>About</ListItemText>
                </MenuItem>
              </NavLink>
            </MenuList>
          </Paper>

          <a href="https://github.com/MamedovOFF" target="_blank">
            <MenuItem>
              <ListItemIcon>
                <GitHub fontSize="small" />
              </ListItemIcon>
              <ListItemText>GitHub</ListItemText>
            </MenuItem>
          </a>
        </div>
      </Drawer>
    </>
  )
}

export default Index
