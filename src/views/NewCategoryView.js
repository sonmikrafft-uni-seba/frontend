import React, { useEffect } from 'react';
import { Grid, ToggleButtonGroup, ToggleButton } from '@mui/material';
import NewCategoryForm from '../components/Popup/NewCategoryForm';
import NewCategoryGroupForm from '../components/Popup/NewCategoryGroupForm';
import { useSelector, connect } from 'react-redux';
import { updateUser } from '../store/user/user.actions';
import CategoryGroupConfirmation from '../components/Popup/CategoryGroupConfirmation';
import { changePopup } from '../store/popup/popup.actions';
import { popupActionType, defaultCategoryGroup } from '../constants';
import CategoryConfirmation from '../components/Popup/CategoryConfirmation';
import { transactionsReassign } from '../store/transaction/transaction.actions';

const NewCategoryView = (props) => {
  const [selectedOption, setSelectedOption] = React.useState(
    props.contentObject && props.contentObject.hasOwnProperty('categories')
      ? 'categoryGroup'
      : 'category'
  );
  const [isConfirmation, setIsConfirmation] = React.useState(false);
  const [newCategoryIdentification, setNewCategoryIdentification] =
    React.useState('');
  const user = useSelector((state) => state.user.user);
  const categoryGroups = useSelector((state) => state.user.user.categoryGroups);

  const EDIT = props.contentObject != null;

  const changeSelectedOption = (_, newOption) => {
    setSelectedOption(newOption);
  };

  useEffect(() => {
    if (selectedOption === 'category') {
      props.dispatch(
        changePopup({
          title: EDIT ? 'Edit Category' : 'Add Category',
        })
      );
    } else {
      props.dispatch(
        changePopup({
          title: EDIT ? 'Edit Category Group' : 'Add Category Group',
        })
      );
    }
  }, [selectedOption]);

  useEffect(() => {
    if (isConfirmation) {
      if (selectedOption === 'category') {
        props.dispatch(
          changePopup({
            popupActionType: popupActionType.YES_OR_NO,
          })
        );
      } else {
        props.dispatch(
          changePopup({
            popupActionType: popupActionType.CONFIRM,
          })
        );
      }
    }
  }, [selectedOption, isConfirmation]);

  useEffect(() => {
    if (props.notifySave && isConfirmation) {
      const categoryId = categoryGroups
        .find((group) => group.name == newCategoryIdentification.groupName)
        .categories.find(
          (category) => category.name == newCategoryIdentification.categoryName
        )._id;

      if (EDIT) {
        props.dispatch(transactionsReassign({}));
      } else {
        props.dispatch(transactionsReassign({ categoryId: categoryId }));
      }
      props.onClosePopup();
    }
  }, [props.notifySave]);

  const onSaveCategory = (
    categoryName,
    budgetLimit,
    budgetType,
    keywords,
    categoryGroup
  ) => {
    const groupIndex = categoryGroups.findIndex(
      (group) => group.name === categoryGroup
    );

    let userToUpdate = {};
    if (EDIT) {
      /**
       * if category stays in its group, update category
       * else remove category from previous group and add to new one
       */
      const conditionalFilter = keywords ? keywords.join(' OR ') : '';
      let categoryToSave = categoryGroups
        .map((group) => group.categories)
        .flat()
        .find((cat) => cat.name == categoryName);
      categoryToSave = {
        ...categoryToSave,
        budgetLimit: budgetLimit,
        budgetType: budgetType,
        conditionalFilter: conditionalFilter,
      };

      const remainsInGroup = categoryGroups
        .map(
          (group, i) =>
            i === groupIndex &&
            group.categories.map((cat) => cat.name).includes(categoryName)
        )
        .includes(true);

      if (remainsInGroup) {
        const newGroups = categoryGroups.map((group, i) =>
          i !== groupIndex
            ? group
            : {
                ...group,
                categories: group.categories.map((cat) =>
                  cat.name == categoryName ? categoryToSave : cat
                ),
              }
        );
        userToUpdate = {
          ...user,
          categoryGroups: newGroups,
        };
      } else {
        const groupsWithoutCategory = categoryGroups.map((group, i) =>
          group.categories.map((cat) => cat.name).includes(categoryName)
            ? {
                ...group,
                categories: group.categories.filter(
                  (cat) => cat.name != categoryName
                ),
              }
            : group
        );

        const newGroups = groupsWithoutCategory.map((group, i) =>
          i !== groupIndex
            ? group
            : {
                ...group,
                categories: [...group.categories, categoryToSave],
              }
        );
        userToUpdate = {
          ...user,
          categoryGroups: newGroups,
        };
      }
    } else {
      /**
       * create new category with specified fields and add to specified category group
       */
      const categoryToSave = {
        name: categoryName,
        conditionalFilter: keywords ? keywords.join(' OR ') : '',
        budgetType: [budgetType],
        budgetLimit: budgetLimit,
      };

      userToUpdate = {
        ...user,
        categoryGroups: categoryGroups.map((group, i) =>
          i !== groupIndex
            ? group
            : {
                ...group,
                categories: [...group.categories, categoryToSave],
              }
        ),
      };
    }

    props.dispatch(
      updateUser({
        userToUpdate,
      })
    );

    setIsConfirmation(true);
    props.setNotifySave(false);
    setNewCategoryIdentification({
      groupName: categoryGroup,
      categoryName: categoryName,
    });
  };

  const onSaveCategoryGroup = (
    categoryGroupName,
    budgetLimit,
    budgetType,
    includedCategories,
    includedCategoryNames,
    excludedCategories
  ) => {
    let userToUpdate = {};

    if (EDIT) {
      /**
       * update user by moving all excluded categories into default Category Group,
       * adding all included categories,
       * and filter all categories that have been moved from other groups
       */

      // move all excluded categories into default Category Group
      const categoryGroupsExcludedInNoGroup = categoryGroups.map((group) =>
        group.name == defaultCategoryGroup
          ? {
              ...group,
              categories: [...group.categories, ...excludedCategories],
            }
          : group
      );
      userToUpdate = {
        ...user,
        categoryGroups: categoryGroupsExcludedInNoGroup.map((group) =>
          group.name == categoryGroupName
            ? {
                ...group,
                budgetLimit: budgetLimit,
                budgetType: budgetType,
                categories: includedCategories,
              }
            : {
                ...group,
                categories: group.categories.filter(
                  (category) => !includedCategoryNames.includes(category.name)
                ),
              }
        ),
      };
    } else {
      /**
       * craete new category group with specified fields
       * and filter all categories that have been moved from other groups
       */
      const categoryGroupToSave = {
        name: categoryGroupName,
        budgetLimit: budgetLimit,
        budgetType: budgetType,
        categories: includedCategories,
      };

      userToUpdate = {
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
    }

    props.dispatch(
      updateUser({
        userToUpdate,
      })
    );

    setIsConfirmation(true);
  };

  return (
    <>
      {/* Page 1 */}
      {!isConfirmation && (
        <Grid
          container
          direction="column"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Grid item py={2}>
            {!EDIT && (
              <ToggleButtonGroup
                color="primary"
                value={selectedOption}
                exclusive
                onChange={changeSelectedOption}
              >
                <ToggleButton value="category">Category</ToggleButton>
                <ToggleButton value="categoryGroup">
                  Category Group
                </ToggleButton>
              </ToggleButtonGroup>
            )}
          </Grid>
          <Grid item>
            {selectedOption === 'category' ? (
              <NewCategoryForm
                onSaveCategory={onSaveCategory}
                notifySave={props.notifySave}
                setSaveable={props.setSaveable}
                category={props.contentObject}
              />
            ) : (
              <NewCategoryGroupForm
                onSaveCategoryGroup={onSaveCategoryGroup}
                notifySave={props.notifySave}
                setSaveable={props.setSaveable}
                categoryGroup={props.contentObject}
              />
            )}
          </Grid>
        </Grid>
      )}

      {/* Page 2 */}
      {isConfirmation &&
        (selectedOption === 'category' ? (
          <CategoryConfirmation EDIT={EDIT} />
        ) : (
          <CategoryGroupConfirmation EDIT={EDIT} />
        ))}
    </>
  );
};

export default connect()(NewCategoryView);
