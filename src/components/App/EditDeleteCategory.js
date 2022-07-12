import { Delete, Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import { connect, useSelector } from 'react-redux';
import { updateUser } from '../../store/user/user.actions';

const EditDeleteCategory = (props) => {
  const user = useSelector((state) => state.user.user);
  const categoryGroups = useSelector((state) => state.user.user.categoryGroups);
  const category = props.category;

  const editCategory = () => {};

  const deleteCategory = () => {
    const userToUpdate = {
      ...user,
      categoryGroups: categoryGroups.map((group) =>
        group._id !== props.groupID
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
    props.resetCategory(category.name, props.groupName);
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
