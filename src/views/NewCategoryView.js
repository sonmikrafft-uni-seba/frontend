import React from 'react';
import { Grid, ToggleButtonGroup, ToggleButton } from '@mui/material';
import NewCategoryForm from '../components/Popup/NewCategoryForm';
import NewCategoryGroupForm from '../components/Popup/NewCategoryGroupForm';
import { useSelector, connect } from 'react-redux';
import { updateUser } from '../store/user/user.actions';

const NewCategoryView = (props) => {
  const [selectedOption, setSelectedOption] = React.useState('category');
  const changeSelectedOption = (_, newOption) => {
    setSelectedOption(newOption);
  };

  const user = useSelector((state) => state.user.user);
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
      conditionalFilter: keywords ? keywords.join(' OR ') : '',
      budgetType: [budgetType],
      budgetLimit: budgetLimit,
    };
    const groupIndex = categoryGroups.findIndex(
      (group) => group.name === categoryGroup
    );

    const userToUpdate = {
      ...user,
      categoryGroups: categoryGroups.map((item, i) =>
        i !== groupIndex
          ? item
          : {
              ...item,
              categories: [...item.categories, categoryToSave],
            }
      ),
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
    includedCategories,
    includedCategoryNames
  ) => {
    const categoryGroupToSave = {
      name: categoryGroupName,
      budgetLimit: budgetLimit,
      budgetType: budgetType,
      categories: includedCategories,
    };

    const userToUpdate = {
      ...user,
      categoryGroups: categoryGroups
        .map((group) => ({
          ...group,
          categories: group.categories.filter(
            (category) => !includedCategoryNames.includes(category.name)
          ),
        }))
        .concat([categoryGroupToSave]),
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
