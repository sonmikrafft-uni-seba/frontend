import React, { useEffect, useState } from 'react';
import { Grid, Box, ToggleButtonGroup, ToggleButton } from '@mui/material';
import NewCategoryForm from '../components/App/NewCategoryPopUp/NewCategoryForm';
import NewCategoryGroupForm from '../components/App/NewCategoryPopUp/NewCategoryGroupForm';
import { useSelector, connect } from 'react-redux';
// import { createCategory } from '../store/category/category.actions';
import { updateUser } from '../store/user/user.actions';
const NewCategoryView = (props) => {
  const [selectedOption, setSelectedOption] = React.useState('category');
  const changeSelectedOption = (event, newOption) => {
    setSelectedOption(newOption);
  };

  // const firstName = useSelector((state) => state.user.user.firstName);
  // const lastName = useSelector((state) => state.user.user.lastName);
  // const email = useSelector((state) => state.user.user.email);
  // const subscription = useSelector((state) => state.user.user.subscription);
  // const password = useSelector((state) => state.user.user.password);
  // const salt = useSelector((state) => state.user.user.salt);
  // const userBanks = useSelector((state) => state.user.user.userBanks);
  // const oldCategoryGroups = useSelector(
  //   (state) => state.user.user.categoryGroups
  // );
  const oldCategoryGroups = [
    {
      name: 'Food',
      budgetType: 'MONTHLY',
      budgetLimit: 100,
      categories: [],
    },
  ];
  const onSaveCategory = (
    categoryName,
    budgetLimit,
    budgetType,
    keywords,
    categoryGroup
  ) => {
    const categoryToSave = {
      name: categoryName,
      conditionalFilter: keywords ? keywords.join(' AND ') : '',
      budgetType: budgetType,
      budgetLimit: budgetLimit,
    };

    const groupIndex = oldCategoryGroups.findIndex(
      (group) => group.name == categoryGroup
    );
    const newCategoryGroups = oldCategoryGroups;
    newCategoryGroups[groupIndex].categories.push(categoryToSave);

    const userToUpdate = {
      // firstName: firstName,
      // lastName: lastName,
      // email: email,
      // subscription: subscription,
      // password: password,
      // salt: salt,
      // userBanks: userBanks,
      // categoryGroups: newCategoryGroups,
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      subscription: 'subscription',
      password: 'password',
      salt: 'salt',
      userBanks: 'userBanks',
      categoryGroups: newCategoryGroups,
    };
    props.dispatch(
      updateUser({
        userToUpdate,
      })
    );
    props.onClosePopup();
  };

  const onSaveCategoryGroup = (
    categoryGroupName,
    budgetLimit,
    budgetType,
    includedCategories
  ) => {
    const categoryGroupToSave = {
      name: categoryGroupName,
      budgetLimit: budgetLimit,
      budgetType: budgetType,
      categories: includedCategories,
    };

    const newCategoryGroups = oldCategoryGroups;
    newCategoryGroups.push(categoryGroupToSave);

    const userToUpdate = {
      // firstName: firstName,
      // lastName: lastName,
      // email: email,
      // subscription: subscription,
      // password: password,
      // salt: salt,
      // userBanks: userBanks,
      // categoryGroups: newCategoryGroups,
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      subscription: 'subscription',
      password: 'password',
      salt: 'salt',
      userBanks: 'userBanks',
      categoryGroups: newCategoryGroups,
    };
    props.dispatch(
      updateUser({
        userToUpdate,
      })
    );
    props.onClosePopup();
  };
  return (
    <Box>
      <Grid container direction="column" justifyContent="center">
        <Grid item py={2}>
          <ToggleButtonGroup
            color="primary"
            value={selectedOption}
            exclusive
            onChange={changeSelectedOption}
          >
            <ToggleButton value="category">Add Category</ToggleButton>
            <ToggleButton value="categoryGroup">
              Add Category Group
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item>
          {selectedOption === 'category' ? (
            <NewCategoryForm
              onSaveCategory={onSaveCategory}
              notifySave={props.notifySave}
            />
          ) : (
            <NewCategoryGroupForm
              onSaveCategoryGroup={onSaveCategoryGroup}
              notifySave={props.notifySave}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default connect()(NewCategoryView);
