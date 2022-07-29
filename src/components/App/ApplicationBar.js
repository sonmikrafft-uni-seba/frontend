import React, { useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Menu,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Star,
  Logout,
  AccountCircle,
  SettingsOutlined,
} from '@mui/icons-material';
import { openPopup } from '../../store/popup/popup.actions.js';
import { popupContentType, popupActionType } from '../../constants';
import { connect } from 'react-redux';
import { reset } from '../../store/subscription/subscription.actions';
import { logoutUser } from '../../store/root.actions';

const ApplicationBar = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const openDropdownMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeDropdownMenu = () => {
    setAnchorEl(null);
  };

  const openManageAccounts = () => {
    props.dispatch(
      openPopup({
        title: 'Bank Accounts',
        popupContentType: popupContentType.BANK_MANAGEMENT,
        popupActionType: popupActionType.ADD_BANK,
      })
    );
  };

  const onLogout = () => {
    setAnchorEl(null);
    props.dispatch(reset());
    props.dispatch(logoutUser());
    navigate('/');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="brightBackground">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <div>
            {props.isPremium && (
              <Button
                color="primary"
                onClick={openManageAccounts}
                startIcon={<SettingsOutlined />}
              >
                Manage Bank Accounts
              </Button>
            )}
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
              {props.user.subscriptionCancelDate ? (
                <MenuItem
                  onClick={() => {
                    props.dispatch(
                      openPopup({
                        title: 'Cancel Confirmation',
                        popupContentType:
                          popupContentType.CANCEL_SUBSCRIPTION_CONFIRMATION,
                        popupActionType: popupActionType.EMPTY,
                      })
                    );
                  }}
                >
                  <ListItemIcon>
                    <Star />
                  </ListItemIcon>
                  <ListItemText primary="My Budgetly Premium" />
                </MenuItem>
              ) : props.isPremium ? (
                <MenuItem
                  onClick={() => {
                    props.dispatch(
                      openPopup({
                        title: 'Premium Plan',
                        popupContentType: popupContentType.CANCEL_SUBSCRIPTION,
                        popupActionType: popupActionType.EMPTY,
                      })
                    );
                  }}
                >
                  <ListItemIcon>
                    <Star />
                  </ListItemIcon>
                  <ListItemText primary="My Budgetly Premium" />
                </MenuItem>
              ) : (
                <MenuItem
                  onClick={() => {
                    props.dispatch(
                      openPopup({
                        title: 'Overview of Premium Features',
                        popupContentType: popupContentType.PREMIUM_SUBSCRIPTION,
                        popupActionType: popupActionType.EMPTY,
                      })
                    );
                  }}
                >
                  <ListItemIcon>
                    <Star />
                  </ListItemIcon>
                  <ListItemText primary="Upgrade to Premium" />
                </MenuItem>
              )}
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
