import { BudgetType, TransactionCurrency, TransactionType } from './constants';

export const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

export const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

export const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

export const parseJwt = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
};

export const categoryIdSelection = (categories, remittanceInformation) => {
  const remittanceInformationWordList = remittanceInformation
    .split(' ')
    .map((word) => word.toLowerCase());

  const newCategory = categories.findLast((category) => {
    if (category.conditionalFilter) {
    }
    return (
      category.conditionalFilter &&
      category.conditionalFilter != '' &&
      category.conditionalFilter
        .split('OR')
        .map((keyword) => keyword.trim().toLowerCase())
        .some((categoryKeyword) => {
          return remittanceInformationWordList.includes(categoryKeyword);
        })
    );
  });

  return newCategory ? newCategory._id : null;
};

export const transactionsToUpdateWithNewCategory = (
  categories,
  transactions,
  defaultCategoryId = null,
  isReassignAfterEditDelete = false
) => {
  let transactionsToUpdate = [];

  transactions.forEach((transaction) => {
    if (!transaction) {
      return;
    }

    const newCategoryId = categoryIdSelection(
      categories,
      transaction.remittanceInformation
    );

    // if transaction has no category, categoryId is new, or is to be reassigned after its category is deleted, push it to update list
    if (
      transaction.categoryID == null ||
      (newCategoryId != null && newCategoryId != transaction.categoryID) ||
      isReassignAfterEditDelete
    ) {
      transactionsToUpdate.push({
        ...transaction,
        categoryID: newCategoryId ? newCategoryId : defaultCategoryId,
      });
    }
  });

  return transactionsToUpdate;
};

export const bankingTransactionToDBtransaction = (transactionList, userId) => {
  const list = transactionList.map((account) => {
    return account.transactions.map((transaction) => {
      const partner = transaction.hasOwnProperty('debtorName')
        ? transaction.debtorName
        : 'Unknown';
      const amount = Number(transaction.transactionAmount.amount);
      return {
        transactionType: [
          amount < 0 ? TransactionType.OUTGOING : TransactionType.INCOMING,
        ],
        transactionCurrency: [
          transaction.transactionAmount.currency == 'EUR'
            ? TransactionCurrency.EUR
            : TransactionCurrency.DOL,
        ],
        transactionAmount: amount,
        transactionViewed: false,
        verified: false,
        transactionPartnerName: partner,
        remittanceInformation: transaction.remittanceInformationUnstructured,
        userID: userId,
        bankAccountID: account.bankAccountId,
        categoryID: null,
        valueDate: new Date(transaction.valueDate).toISOString(),
        transactionId: transaction.transactionId,
      };
    });
  });

  return list.reduce((p, n) => {
    return p.concat(n);
  });
};

export const timeConverter = (UNIX_timestamp) => {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var formattedDate = month + ' ' + date + ', ' + year;
  return formattedDate;
};

export const formatMoney = (money) => {
  return ((money * 1.0) / 100).toFixed(2);
};

export const computeBudgetAlarmString = (
  categories,
  categoryId,
  transactions,
  additionalAmount = 0
) => {
  const category = categories.find((cat) => cat._id == categoryId);
  const budgetLimit = category.budgetLimit;
  const budgetLimitString = budgetLimit ? '€ of ' + budgetLimit : '';
  const budgetType =
    category.budgetType == BudgetType.MONTHLY ? ' this month.' : ' this year.';

  const transactionsFilteredByCategory = transactions.filter(
    (trans) => trans.categoryID == category._id
  );

  // filter categories by current month/ year according to budgetType
  const today = new Date();
  let transactionsFilteredByDate = [];
  switch (category.budgetType[0]) {
    case BudgetType.MONTHLY:
      const month = today.getMonth();
      transactionsFilteredByDate = transactionsFilteredByCategory.filter(
        (trans) => new Date(trans.valueDate).getMonth() == month
      );
      break;
    case BudgetType.YEARLY:
      const year = today.getFullYear();
      transactionsFilteredByDate = transactionsFilteredByCategory.filter(
        (trans) => new Date(trans.valueDate).getFullYear() == year
      );
      break;
    default:
      transactionsFilteredByDate = transactionsFilteredByCategory;
  }

  let currentBudget = transactionsFilteredByDate
    .map((trans) => trans.transactionAmount)
    .reduce((acc, amount) => acc + amount, 0);

  currentBudget = -(currentBudget + parseFloat(additionalAmount));

  const warning =
    budgetLimit && currentBudget >= budgetLimit
      ? ' You have exceeded your limit!'
      : '';

  const zeroString = 'You have your full budget left';
  const nonZeroString =
    'You have currently spent ' +
    currentBudget +
    budgetLimitString +
    '€ for "' +
    category.name +
    '"' +
    budgetType +
    warning;

  const budgetAlarmstring = currentBudget > 0 ? nonZeroString : zeroString;

  return budgetAlarmstring;
};
