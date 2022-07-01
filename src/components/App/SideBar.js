import * as React from 'react';
import {
  Folder,
  Dashboard,
  Receipt,
  Add,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import {
  Box,
  Typography,
  Button,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  ListItem,
  List,
  Drawer,
} from '@mui/material';
import ExpandableItem from './ExpandableItem';
import AccountSelector from './AccountSelector';
import { useTheme } from '@mui/material/styles';
import { connect, useSelector } from 'react-redux';
import { openPopup } from '../../store/popup/popup.actions';
import { popupActionType, popupContentType } from '../../constants';
import { GroupContext } from 'antd/lib/checkbox/Group';

const SideBar = (props) => {
  const categoryGroups = useSelector((state) => state.user.user.categoryGroups);
  const theme = useTheme();
  const onNewCategory = () => {
    props.dispatch(
      openPopup({
        title: 'New Category',
        popupContentType: popupContentType.NEW_CATEGORY,
        popupActionType: popupActionType.SAVE_OR_CANCEL,
      })
    );
  };

  return (
    <Drawer
      PaperProps={{
        sx: {
          backgroundColor: theme.palette.background.main,
          color: theme.palette.background.contrastText,
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box sx={{ pl: 3 }}>
        <img
          src={'/images/budgetly_dark.png'}
          loading="lazy"
          width="226px"
          height="150px"
        />
      </Box>
      <Box sx={{ p: 2 }}>
        <AccountSelector />
      </Box>
      <List>
        <Box sx={{ p: 2, borderTop: 1, borderBottom: 1 }} bgcolor="#183867">
          <Typography variant="h6" align="center">
            Categories
          </Typography>
        </Box>
        <ListItem key="Overview" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {
                <Dashboard
                  sx={{
                    color: 'white',
                    borderRadius: '50%',
                  }}
                />
              }
            </ListItemIcon>
            <ListItemText primary="Overview" />
          </ListItemButton>
        </ListItem>
        {categoryGroups.map(function (group) {
          return (
            <ExpandableItem
              key="Expandable"
              render={(xprops) => (
                <>
                  <ListItem
                    key={group.name}
                    button
                    onClick={() => xprops.setOpen(!xprops.open)}
                  >
                    <ListItemIcon>
                      <Folder
                        sx={{
                          color: 'white',
                          borderRadius: '50%',
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={group.name} />
                    {xprops.open ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={xprops.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {group.categories.map(function (category) {
                        return (
                          <ListItem key={category.name} button>
                            <ListItemText primary={category.name} inset />
                          </ListItem>
                        );
                      })}
                    </List>
                  </Collapse>
                </>
              )}
            />
          );
        })}
        <ListItem key="Uncategorized" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {<Receipt sx={{ color: 'white', borderRadius: '50%' }} />}
            </ListItemIcon>
            <ListItemText primary="Uncategorized" />
          </ListItemButton>
        </ListItem>
      </List>
      <Box sx={{ px: 6, py: 3, borderTop: 1 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={onNewCategory}
          startIcon={<Add />}
        >
          NEW CATEGORY
        </Button>
      </Box>
    </Drawer>
  );
};

export default connect()(SideBar);
