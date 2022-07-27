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
import EditDeleteCategory from './EditDeleteCategory';
import EditDeleteCategoryGroup from './EditDeleteCategoryGroup';

const SideBar = (props) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const userState = useSelector((state) => state.user.user);
  const categoryGroups = userState.categoryGroups;

  const { categoryGroupName, categoryName } = useParams();
  const [selected, setSelected] = React.useState('overview');
  const [categoryGroup, setCategoryGroup] = React.useState(categoryGroupName);
  const [category, setCategory] = React.useState(categoryName);

  const handleCategoryGroupClick = (name) => {
    setCategoryGroup(name.toLowerCase());
    setCategory('');
  };

  const handleCategoryClick = (groupName, name) => {
    setCategoryGroup(groupName.toLowerCase());
    setCategory(name.toLowerCase());
  };

  const resetCategoryGroup = (groupName) => {
    if (selected === groupName.toLowerCase()) {
      setSelected('overview');
      setCategoryGroup('overview');
    }
  };

  const resetCategory = (catName, groupName) => {
    if (groupName === 'No Group') {
      groupName = 'overview';
    }
    if (selected === catName.toLowerCase()) {
      setSelected(groupName.toLowerCase());
      setCategoryGroup(groupName.toLowerCase());
      setCategory('');
    }
  };

  useEffect(() => {
    var path = '/app/';

    // change url to either /overview or the selected category group
    path = path.concat(
      typeof categoryGroup !== 'undefined'
        ? categoryGroup.toLowerCase()
        : 'overview'
    );

    // add category to url
    if (category !== '' && typeof category !== 'undefined') {
      path = path.concat('/' + category);
      // select category in sidebar
      setSelected(category);
    } else if (typeof categoryGroup !== 'undefined') {
      // select category in sidebar
      setSelected(categoryGroup);
    } else {
      // fall back to overview
      setSelected('overview');
    }

    navigate(path);
  }, [categoryGroup, category]);

  const onNewCategory = () => {
    props.dispatch(
      openPopup({
        title: 'New Category/ New Category Group',
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
        <AccountSelector user={userState} />
      </Box>
      <List
        sx={{
          // selected and (selected + hover) states
          '&& .Mui-selected, && .Mui-selected:hover': {
            bgcolor: '#183867',
            '&, & .MuiListItemIcon-root': {
              color: theme.palette.background.contrastText,
            },
          },
        }}
      >
        <Box sx={{ p: 2, borderTop: 1, borderBottom: 1 }} bgcolor="#183867">
          <Typography variant="h6" align="center">
            Categories
          </Typography>
        </Box>
        {/* Overview */}
        <ListItem key="Overview" disablePadding>
          <ListItemButton
            selected={selected === 'overview'}
            onClick={(event) => handleCategoryGroupClick('overview')}
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
          .filter((group) => group.name !== 'No Group')
          .map((option) => (
            <ExpandableItem
              key={option._id}
              render={(xprops) => (
                <>
                  <ListItem
                    secondaryAction={
                      <>
                        <EditDeleteCategoryGroup
                          group={option}
                          resetCategoryGroup={resetCategoryGroup}
                          setSelected={setSelected}
                          handleCategoryGroupClick={handleCategoryGroupClick}
                        />
                        <IconButton
                          edge="end"
                          onClick={() => xprops.setOpen(!xprops.open)}
                          aria-label="expand"
                        >
                          {xprops.open ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                      </>
                    }
                    disablePadding
                  >
                    <ListItemButton
                      selected={selected === option.name.toLowerCase()}
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
                        <ListItem
                          button
                          key={category._id}
                          secondaryAction={
                            <EditDeleteCategory
                              category={category}
                              group={option}
                              groupName={option.name}
                              resetCategory={resetCategory}
                              setSelected={setSelected}
                              handleCategoryClick={handleCategoryClick}
                            />
                          }
                          disablePadding
                        >
                          <ListItemButton
                            selected={selected === category.name.toLowerCase()}
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
        {/* No Group Categories */}
        {categoryGroups[0].categories
          .slice(0)
          .reverse()
          .map((category) => (
            <ListItem
              button
              key={category._id}
              secondaryAction={
                category.name !== 'Uncategorized' && (
                  <EditDeleteCategory
                    category={category}
                    group={categoryGroups[0]}
                    groupName={categoryGroups[0].name}
                    resetCategory={resetCategory}
                    setSelected={setSelected}
                    handleCategoryClick={handleCategoryClick}
                  />
                )
              }
              disablePadding
            >
              <ListItemButton
                selected={selected === category.name.toLowerCase()}
                onClick={(event) =>
                  handleCategoryClick(categoryGroups[0].name, category.name)
                }
              >
                <ListItemIcon>
                  {<Receipt sx={{ color: 'white', borderRadius: '50%' }} />}
                </ListItemIcon>
                <ListItemText primary={category.name} />
              </ListItemButton>
            </ListItem>
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
