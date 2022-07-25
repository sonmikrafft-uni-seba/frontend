import { Delete, Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import { connect, useSelector } from 'react-redux';
import { updateUser } from '../../store/user/user.actions';
import { openSnackbar } from '../../store/snackbar/snackbar.actions';
import { transactionsReassign } from '../../store/transaction/transaction.actions';

const EditDeleteCategoryGroup = (props) => {
  const user = useSelector((state) => state.user.user);
  const categoryGroups = useSelector((state) => state.user.user.categoryGroups);

  const editCategoryGroup = () => {};

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

    props.resetCategoryGroup(props.group.name);

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
      <IconButton edge="end" aria-label="edit" onClick={editCategoryGroup}>
        <Edit />
      </IconButton>
      <IconButton edge="end" aria-label="delete" onClick={deleteCategoryGroup}>
        <Delete />
      </IconButton>
    </>
  );
};

export default connect()(EditDeleteCategoryGroup);
