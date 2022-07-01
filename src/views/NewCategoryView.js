import React, { useEffect, useState } from 'react';
import { Grid, Box, ToggleButtonGroup, ToggleButton } from '@mui/material';
import NewCategoryForm from '../components/Popup/NewCategoryForm';
import NewCategoryGroupForm from '../components/Popup/NewCategoryGroupForm';
import { useSelector, connect } from 'react-redux';
import { updateUser } from '../store/user/user.actions';

const NewCategoryView = (props) => {
  const [selectedOption, setSelectedOption] = React.useState('category');
  const changeSelectedOption = (_, newOption) => {
    setSelectedOption(newOption);
  };

  const firstName = useSelector((state) => state.user.user.firstName);
  const lastName = useSelector((state) => state.user.user.lastName);
  const email = useSelector((state) => state.user.user.email);
  const subscription = useSelector((state) => state.user.user.subscriptionPlan);
  const password = useSelector((state) => state.user.user.password);
  const userBanks = useSelector((state) => state.user.user.userBanks);
  const categoryGroups = useSelector((state) => state.user.user.categoryGroups);

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
      budgetType: [budgetType],
      budgetLimit: budgetLimit,
    };
    const groupIndex = categoryGroups.findIndex(
      (group) => group.name === categoryGroup
    );

    const userToUpdate = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      subscription: subscription,
      password: password,
      userBanks: userBanks,
      categoryGroups: categoryGroups.map((item, i) =>
        i !== groupIndex
          ? item
          : {
              ...item,
              categories: [...item.categories, categoryToSave],
            }
      ),
    };
    console.log(userToUpdate);
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

    const userToUpdate = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      subscription: subscription,
      password: password,
      userBanks: userBanks,
      categoryGroups: [...categoryGroups, categoryGroupToSave],
    };
    props.dispatch(
      updateUser({
        userToUpdate,
      })
    );
    props.onClosePopup();
  };
  return (
    <Grid
      container
      direction="column"
      alignItems="flex-start"
      justifyContent="flex-start"
    >
      <Grid item py={2}>
        <ToggleButtonGroup
          color="primary"
          value={selectedOption}
          exclusive
          onChange={changeSelectedOption}
        >
          <ToggleButton value="category">Add Category</ToggleButton>
          <ToggleButton value="categoryGroup">Add Category Group</ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      <Grid item>
        {selectedOption === 'category' ? (
          <NewCategoryForm
            onSaveCategory={onSaveCategory}
            notifySave={props.notifySave}
            setSaveable={props.setSaveable}
          />
        ) : (
          <NewCategoryGroupForm
            onSaveCategoryGroup={onSaveCategoryGroup}
            notifySave={props.notifySave}
            setSaveable={props.setSaveable}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default connect()(NewCategoryView);
