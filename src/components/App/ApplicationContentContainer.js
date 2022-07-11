import * as React from 'react';
import { Container, Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TransactionTable from './TransactionTable';
import VisualizationToggleGroup from './ToggleButton';
import { connect } from 'react-redux';
import { openPopup } from '../../store/popup/popup.actions';
import { popupContentType, popupActionType } from '../../constants';

const ApplicationContentContainer = (props) => {
  const onNewTransaction = () => {
    props.dispatch(
      openPopup({
        title: 'New Transaction',
        popupContentType: popupContentType.NEW_TRANSACTION,
        popupActionType: popupActionType.SAVE_OR_CANCEL,
      })
    );
  };

  return (
    <Container>
      <Box
        sx={{
          pl: 40,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            py: 4,
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <VisualizationToggleGroup />
          <Box sx={{ flexGrow: 1 }} />
          <Button
            variant="contained"
            color="primary"
            onClick={onNewTransaction}
            startIcon={<AddIcon />}
          >
            New Transaction
          </Button>
        </Box>
        <TransactionTable
          updateTransaction={props.updateTransaction}
          transactions={props.transactions}
        />
      </Box>
    </Container>
  );
};

export default connect()(ApplicationContentContainer);
