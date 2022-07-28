import React from 'react';
import { Typography, Box } from '@mui/material';
import { BudgetType } from '../../constants';

const BalanceIndicator = (props) => {
  const budget = props.viewedBudget();

  if (budget.hasOwnProperty('period') && props.transactions.length > 0) {
    const now = new Date();
    const from =
      budget.period && budget.period == BudgetType.MONTHLY
        ? new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
        : new Date(now.getFullYear(), 1, 1).toISOString();
    const to = now.toISOString();

    const transactionsToSum = props.transactions.filter((transaction) => {
      return transaction.valueDate < to && transaction.valueDate > from;
    });

    const transactionSum = transactionsToSum.reduce((sum, transaction) => {
      return sum + transaction.transactionAmount;
    }, 0);

    const underBudget = Number(budget.limit) + transactionSum < 0;

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ paddingRight: '10px' }}>
          Balance:
          <span
            style={{ color: underBudget ? 'green' : 'red', paddingLeft: '5px' }}
          >
            {transactionSum}€
          </span>
        </Typography>
        <Typography>
          Limit:
          <span style={{ paddingLeft: '5px' }}>
            {budget.period == BudgetType.MONTHLY
              ? Number(budget.limit) + '€ ' + BudgetType.MONTHLY.toLowerCase()
              : Number(budget.limit) + '€ ' + BudgetType.YEARLY.toLowerCase()}
          </span>
        </Typography>
      </Box>
    );
  }
};

export default BalanceIndicator;
