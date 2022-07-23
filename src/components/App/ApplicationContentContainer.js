import * as React from 'react';
import { Container, Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CachedIcon from '@mui/icons-material/Cached';
import TransactionTable from './TransactionTable';
import { connect } from 'react-redux';
import { openPopup } from '../../store/popup/popup.actions';
import { popupContentType, popupActionType } from '../../constants';
import { transactionsPullBanking } from '../../store/transaction/transaction.actions';
import BalanceIndicator from './BalanceIndicator';
import VisualisationToggle from './VisualisationToggle';
import Charts from './Charts.js';

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

  const onFetchRemoteTransactions = () => {
    props.dispatch(transactionsPullBanking());
  };

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          pl: 30,
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
          <Box sx={{ flexGrow: 1 }}></Box>
          <Button
            variant="contained"
            color="primary"
            onClick={onNewTransaction}
            startIcon={<AddIcon />}
          >
            New Transaction
          </Button>
          <Button
            sx={{ marginLeft: '2px' }}
            onClick={onFetchRemoteTransactions}
          >
            <CachedIcon />
          </Button>
        </Box>
        <Charts
          context={props.viewedBudget}
          transactions={props.transactions}
          viewedBudget={props.viewedBudget}
        />
        <TransactionTable
          updateTransaction={props.updateTransaction}
          transactions={props.transactions}
        />
      </Box>
    </Container>
  );
};

export default connect()(ApplicationContentContainer);
