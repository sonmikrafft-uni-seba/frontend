import { Delete, Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import { connect, useSelector } from 'react-redux';
import { updateUser } from '../../store/user/user.actions';
import { openPopup } from '../../store/popup/popup.actions';
import { openSnackbar } from '../../store/snackbar/snackbar.actions';
import { transactionsReassign } from '../../store/transaction/transaction.actions';
import { popupActionType, popupContentType } from '../../constants';

const EditDeleteCategory = (props) => {
  const user = useSelector((state) => state.user.user);
  const categoryGroups = useSelector((state) => state.user.user.categoryGroups);

  const category = props.category;

  const editCategory = () => {
    props.dispatch(
      openPopup({
        title: 'Edit Category/ Category Group',
        popupContentType: popupContentType.EDIT_CATEGORY,
        popupContentObject: category,
        popupActionType: popupActionType.SAVE_OR_CANCEL,
      })
    );
    props.setSelected(category.name.toLowerCase());
    props.handleCategoryClick(props.group.name, category.name);
  };

  const deleteCategory = () => {
    const userToUpdate = {
      ...user,
      categoryGroups: categoryGroups.map((group) =>
        group._id !== props.group._id
          ? group
          : {
              ...group,
              categories: group.categories.filter(
                (cat) => cat._id !== category._id
              ),
            }
      ),
    };
    props.dispatch(
      updateUser({
        userToUpdate,
      })
    );

    props.dispatch(
      transactionsReassign({ deletedCategoryIds: [category._id] })
    );

    props.resetCategory(category.name, props.groupName);
    props.setSelected(props.groupName);

    props.dispatch(
      openSnackbar({
        message:
          'Your category "' +
          category.name +
          '" has been successfully deleted.',
      })
    );
  };

  return (
    <>
      <IconButton edge="end" aria-label="edit" onClick={editCategory}>
        <Edit />
      </IconButton>
      <IconButton edge="end" aria-label="delete" onClick={deleteCategory}>
        <Delete />
      </IconButton>
    </>
  );
};

export default connect()(EditDeleteCategory);
