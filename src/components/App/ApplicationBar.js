import * as React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Menu,
} from '@mui/material';
import { Star, AccountCircle } from '@mui/icons-material';

export default function ApplicationBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const openDropdownMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeDropdownMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="brightBackground">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={openDropdownMenu}
              color="primary"
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
              onClose={closeDropdownMenu}
            >
              <MenuItem onClick={closeDropdownMenu}>
                <ListItemIcon>
                  <Star />
                </ListItemIcon>
                <ListItemText primary="Upgrade to Premium" />
              </MenuItem>
              <MenuItem onClick={closeDropdownMenu}>
                <ListItemIcon>
                  <Star />
                </ListItemIcon>
                <ListItemText primary="Place holder" />
              </MenuItem>
              <MenuItem onClick={closeDropdownMenu}>
                <ListItemIcon>
                  <Star />
                </ListItemIcon>
                <ListItemText primary="Place holder" />
              </MenuItem>
              <MenuItem onClick={closeDropdownMenu}>
                <ListItemIcon>
                  <Star />
                </ListItemIcon>
                <ListItemText primary="Place holder" />
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
