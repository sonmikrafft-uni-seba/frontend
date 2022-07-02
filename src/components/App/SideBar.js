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
  Link,
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
import { useSelector, connect } from 'react-redux';
import { openPopup } from '../../store/popup/popup.actions';
import { popupActionType, popupContentType } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const SideBar = (props) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const userState = useSelector((state) => state.user.user);

  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [bankAccount, setBankAccount] = React.useState('');
  const [categoryGroup, setCategoryGroup] = React.useState('');
  const [category, setCategory] = React.useState('');

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const categoryGroups = userState.categoryGroups;

  useEffect(() => {
    navigate('/app/' + bankAccount);
  }, [bankAccount]);

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
      {/* Account Selector */}
      <Box sx={{ p: 2 }}>
        <AccountSelector user={userState} setBankAccount={setBankAccount} />
      </Box>
      <List>
        <Box sx={{ p: 2, borderTop: 1, borderBottom: 1 }} bgcolor="#183867">
          <Typography variant="h6" align="center">
            Categories
          </Typography>
        </Box>

        {/* Overview */}
        <ListItem key="Overview" disablePadding>
          <ListItemButton
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
          >
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

        {/* Category Groups */}
        {categoryGroups.map((option) => (
          <ExpandableItem
            key={option._id}
            render={(xprops) => (
              <>
                <ListItem button onClick={() => xprops.setOpen(!xprops.open)}>
                  {' '}
                  {/* TODO: Add selection*/}
                  <ListItemIcon>
                    <Folder
                      sx={{
                        color: 'white',
                        borderRadius: '50%',
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={option.name} />
                  {xprops.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                {/* Categories */}
                <Collapse in={xprops.open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {categoryGroups.map((option) =>
                      option.categories.map((category) => (
                        <ListItem button key={category._id}>
                          <ListItemText primary={category.name} inset />
                        </ListItem>
                      ))
                    )}
                  </List>
                </Collapse>
              </>
            )}
          />
        ))}
      </List>

      {/* NEW CATEGORY button */}
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
