import { Delete, Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import { connect, useSelector } from 'react-redux';
import { updateUser } from '../../store/user/user.actions';

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
    props.resetCategoryGroup(props.group.name);
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
