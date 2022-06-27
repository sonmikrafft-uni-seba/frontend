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
import { useNavigate } from 'react-router-dom';
import { Star, Logout, AccountCircle } from '@mui/icons-material';
import { logout } from '../../store/auth/auth.actions';
import { connect } from 'react-redux';

const ApplicationBar = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const openDropdownMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeDropdownMenu = () => {
    setAnchorEl(null);
  };

  const onLogout = () => {
    setAnchorEl(null);
    props.dispatch(logout({}));
    navigate('/');
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
              <MenuItem onClick={onLogout}>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default connect()(ApplicationBar);
