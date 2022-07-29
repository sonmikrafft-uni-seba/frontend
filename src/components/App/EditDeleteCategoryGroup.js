import { Delete, Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import { connect, useSelector } from 'react-redux';
import { updateUser } from '../../store/user/user.actions';
import { openPopup } from '../../store/popup/popup.actions';
import { openSnackbar } from '../../store/snackbar/snackbar.actions';
import { transactionsReassign } from '../../store/transaction/transaction.actions';
import { popupActionType, popupContentType } from '../../constants';

const EditDeleteCategoryGroup = (props) => {
  const user = useSelector((state) => state.user.user);
  const categoryGroups = useSelector((state) => state.user.user.categoryGroups);
  const selectedGroup = categoryGroups.find(
    (group) => group._id == props.group._id
  );

  const editCategoryGroup = () => {
    props.dispatch(
      openPopup({
        title: 'Edit Category/ Category Group',
        popupContentType: popupContentType.EDIT_CATEGORY,
        popupContentObject: selectedGroup,
        popupActionType: popupActionType.SAVE_OR_CANCEL,
      })
    );
    props.setSelected(selectedGroup.name.toLowerCase());
    props.handleCategoryGroupClick(selectedGroup.name.toLowerCase());
  };

  const deleteCategoryGroup = () => {
    const userToUpdate = {
      ...user,
      categoryGroups: categoryGroups.filter(
        (group) => group._id !== props.group._id
      ),
    };
    props.dispatch(
      updateUser({
        userToUpdate,
      })
    );

    const deletedCategories = categoryGroups.find(
      (group) => group._id == props.group._id
    ).categories;

    props.dispatch(
      transactionsReassign({
        deletedCategoryIds: deletedCategories.map((cat) => cat._id),
      })
    );

    const deletedCategoryNames = deletedCategories.map((cat) =>
      cat.name.toLowerCase()
    );
    props.resetCategoryGroup(props.group.name, deletedCategoryNames);

    props.dispatch(
      openSnackbar({
        message:
          'Your category group "' +
          props.group.name +
          '" has been successfully deleted.',
      })
    );
  };

  return (
    <>
      <IconButton
        sx={{ color: 'white' }}
        edge="end"
        aria-label="edit"
        onClick={editCategoryGroup}
      >
        <Edit />
      </IconButton>
      <IconButton
        sx={{ color: 'white' }}
        edge="end"
        aria-label="delete"
        onClick={deleteCategoryGroup}
      >
        <Delete />
      </IconButton>
    </>
  );
};

export default connect()(EditDeleteCategoryGroup);
