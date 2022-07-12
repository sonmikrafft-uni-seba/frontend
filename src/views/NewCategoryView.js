import React, { useEffect } from 'react';
import { Grid, ToggleButtonGroup, ToggleButton } from '@mui/material';
import NewCategoryForm from '../components/Popup/NewCategoryForm';
import NewCategoryGroupForm from '../components/Popup/NewCategoryGroupForm';
import { useSelector, connect } from 'react-redux';
import { updateUser } from '../store/user/user.actions';
import CategoryGroupConfirmation from '../components/Popup/CategoryGroupConfirmation';
import { changePopup } from '../store/popup/popup.actions';
import { popupActionType } from '../constants';
import CategoryConfirmation from '../components/Popup/CategoryConfirmation';
import { transactionsReassign } from '../store/transaction/transaction.actions';

const NewCategoryView = (props) => {
  const [selectedOption, setSelectedOption] = React.useState('category');
  const [isConfirmation, setIsConfirmation] = React.useState(false);
  const [newCategoryIdentification, setNewCategoryIdentification] =
    React.useState('');
  const user = useSelector((state) => state.user.user);
  const categoryGroups = useSelector((state) => state.user.user.categoryGroups);

  const changeSelectedOption = (_, newOption) => {
    setSelectedOption(newOption);
  };

  useEffect(() => {
    if (selectedOption === 'category') {
      props.dispatch(
        changePopup({
          title: 'Add Category',
        })
      );
    } else {
      props.dispatch(
        changePopup({
          title: 'Add Category Group',
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

      props.dispatch(transactionsReassign({ categoryId: categoryId }));
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
      )}

      {/* Page 2 */}
      {isConfirmation &&
        (selectedOption === 'category' ? (
          <CategoryConfirmation />
        ) : (
          <CategoryGroupConfirmation />
        ))}
    </>
  );
};

export default connect()(NewCategoryView);
