import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { outerTheme } from './HomePageTheme';
import { ThemeProvider } from '@mui/material/styles';
export default function MyAppBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={outerTheme}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Box sx={{ flexGrow: 1 }} />
            {auth && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="secondary"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <StarIcon />
                    </ListItemIcon>
                    <ListItemText primary="Upgrade to Premium" />
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <StarIcon />
                    </ListItemIcon>
                    <ListItemText primary="Place holder" />
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <StarIcon />
                    </ListItemIcon>
                    <ListItemText primary="Place holder" />
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <StarIcon />
                    </ListItemIcon>
                    <ListItemText primary="Place holder" />
                  </MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
}
