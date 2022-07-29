import React from 'react';
import { useSelector, connect } from 'react-redux';
import { closeSnackbar } from '../store/snackbar/snackbar.actions';
import { IconButton, Snackbar } from '@mui/material';
import { Close } from '@mui/icons-material';

const SnackbarView = (props) => {
  const snackbarState = useSelector((state) => state.snackbar);

  const onCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    props.dispatch(closeSnackbar());
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={onCloseSnackbar}
      >
        <Close fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  if (snackbarState.open)
    return (
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={5000}
        onClose={onCloseSnackbar}
        message={snackbarState.message}
        action={action}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transitionDuration={{ enter: 1000 }}
      />
    );
};

export default connect()(SnackbarView);
