import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

export default function PopupContainer(props) {
  const theme = useTheme();

  return (
    <Dialog
      fullWidth={props.fullWidth || false}
      maxWidth={props.maxWidth || 'md'}
      open={props.visible || false}
      onClose={props.onClose}
    >
      <DialogTitle>
        <>
          {props.title}
          <IconButton
            aria-label="close"
            onClick={props.onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme.palette.secondary,
            }}
          >
            <Close />
          </IconButton>
        </>
      </DialogTitle>
      <DialogContent>{props.children}</DialogContent>
      <DialogActions>{props.dialogActions}</DialogActions>
    </Dialog>
  );
}

PopupContainer.propTypes = {
  fullWidth: PropTypes.bool,
  maxWidth: PropTypes.string,
  visible: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  dialogActions: PropTypes.array,
};
