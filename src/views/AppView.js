import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PopupView from './PopupView';
import SideBar from '../components/App/SideBar';
import ApplicationBar from '../components/App/ApplicationBar';
import ApplicationContentContainer from '../components/App/ApplicationContentContainer';
import { connect, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  loadTransactions,
  updateTransaction,
} from '../store/transaction/transaction.actions';
import { allAccountsConstant } from '../constants';
import SnackbarView from './SnackbarView';

const AppView = (props) => {
  const transactions = useSelector((state) => state.transaction.transactions);
  const bankAccountFilter = useSelector((state) => state.app.selectedAccount);
  const user = useSelector((state) => state.user.user);
  const { categoryGroupName, categoryName } = useParams();

  const [transactionsLoaded, setTransactionsLoaded] = useState(false);

  const updateATransaction = (transaction) => {
    props.dispatch(updateTransaction(transaction));
  };

  const enhanceTransactionInformation = (transactions) => {
    const findCategoryName = (categoryId) => {
      const category = user.categoryGroups
        .map((group) => group.categories)
        .flat()
        .find((category) => {
          return category._id == categoryId;
        });
      return category.name;
    };

    const findAccountName = (accountId) => {
      const account = user.userBanks
        .map((bank) => bank.bankaccounts)
        .flat()
        .find((account) => {
          return account._id == accountId;
        });
      return typeof account !== 'undefined' ? account.name : 'No Account';
    };
    return transactions.map((transaction) => {
      return {
        ...transaction,
        category: findCategoryName(transaction.categoryID),
        account: findAccountName(transaction.bankAccountID),
      };
    });
  };

  const filterTransactions = (transactions) => {
    // filter by bankAccount
    if (bankAccountFilter != allAccountsConstant) {
      transactions = transactions.filter((transaction) => {
        return transaction.bankAccountID == bankAccountFilter;
      });
    }

    // all categories
    if (categoryGroupName == 'overview') {
      return transactions;
    }

    let categoryIdsToFilter = [];
    // get selected categoryGroup
    const categoryGroup = user.categoryGroups.filter((group) => {
      return group.name.toLowerCase() == categoryGroupName;
    })[0];

    // filter by all categories in selected category group
    if (!categoryName) {
      categoryIdsToFilter = categoryGroup.categories.map((category) => {
        return category._id;
      });
    } else {
      // filter by selected category
      categoryIdsToFilter = categoryGroup.categories
        .filter((category) => {
          return category.name.toLowerCase() == categoryName;
        })
        .map((category) => category._id);
    }

    // apply cateogry filter
    return transactions.filter((transaction) => {
      return categoryIdsToFilter.includes(transaction.categoryID);
    });
  };

  useEffect(() => {
    if (transactions.length === 0 && !transactionsLoaded) {
      props.dispatch(loadTransactions());
      setTransactionsLoaded(true);
    }
  }, [transactions]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <PopupView />
      <SnackbarView />
      <ApplicationBar />
      <SideBar />
      <ApplicationContentContainer
        updateTransaction={updateATransaction}
        transactions={enhanceTransactionInformation(
          filterTransactions(transactions)
        )}
      />
    </Box>
  );
};

export default connect()(AppView);
