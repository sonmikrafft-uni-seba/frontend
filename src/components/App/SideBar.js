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
  IconButton,
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
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const SideBar = (props) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const userState = useSelector((state) => state.user.user);

  const { categoryGroupName, categoryName } = useParams();
  const [selected, setSelected] = React.useState('Overview');
  const [bankAccount, setBankAccount] = React.useState('');
  const [categoryGroup, setCategoryGroup] = React.useState(categoryGroupName);
  const [category, setCategory] = React.useState(categoryName);

  const handleListItemSelection = (name) => {
    setSelected(name);
  };

  const handleCategoryGroupClick = (name) => {
    handleListItemSelection(name);
    setCategoryGroup(name);
    setCategory('');
  };

  const handleCategoryClick = (groupName, name) => {
    handleListItemSelection(name);
    setCategoryGroup(groupName);
    setCategory(name);
  };

  const categoryGroups = userState.categoryGroups;

  useEffect(() => {
    var path = '/app/';
    if (bankAccount !== '' && typeof categoryGroup !== 'undefined') {
      path = path.concat(bankAccount + '/' + categoryGroup);
    } else {
      path = path.concat('allAccounts/Overview');
    }
    if (category !== '' && typeof category !== 'undefined') {
      path = path.concat('/' + category);
    }
    navigate(path);
  }, [bankAccount, categoryGroup, category]);

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
            selected={selected === 'Overview'}
            onClick={(event) => handleCategoryGroupClick('Overview')}
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
        {categoryGroups
          .slice(0)
          .reverse()
          .map((option) => (
            <ExpandableItem
              key={option._id}
              render={(xprops) => (
                <>
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" aria-label="expand">
                        {xprops.open ? (
                          <ExpandLess
                            onClick={() => xprops.setOpen(!xprops.open)}
                          />
                        ) : (
                          <ExpandMore
                            onClick={() => xprops.setOpen(!xprops.open)}
                          />
                        )}
                      </IconButton>
                    }
                    disablePadding
                  >
                    <ListItemButton
                      selected={selected === option.name}
                      onClick={(event) => handleCategoryGroupClick(option.name)}
                    >
                      <ListItemIcon>
                        <Folder
                          sx={{
                            color: 'white',
                            borderRadius: '50%',
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText primary={option.name} />
                    </ListItemButton>
                  </ListItem>

                  {/* Categories */}
                  <Collapse in={xprops.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {option.categories.map((category) => (
                        <ListItem button key={category._id} disablePadding>
                          <ListItemButton
                            selected={selected === category.name}
                            onClick={(event) =>
                              handleCategoryClick(option.name, category.name)
                            }
                          >
                            <ListItemText primary={category.name} inset />
                          </ListItemButton>
                        </ListItem>
                      ))}
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
