import React, { useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import BankForm from '../components/Popup/BankForm';
import { BankingOnboardingState } from '../constants';
import { connect, useSelector } from 'react-redux';
import {
  ACTION_TYPES,
  remoteBankingListBankRequest,
  setAccountOnboardingState,
  setBankForOnboarding,
} from '../store/banking/banking.actions';

const BankFormView = (props) => {
  const bankingRequest = useSelector((state) => state.banking.request);

  // request banks if country changes
  const changeCountry = (country) => {
    props.dispatch(remoteBankingListBankRequest(country));
  };

  // save selected bank and transition to bank auth process
  const selectBank = (bank) => {
    props.dispatch(setBankForOnboarding(bank));
    props.dispatch(setAccountOnboardingState(BankingOnboardingState.AUTH_BANK));
  };

  // render bank list if bank list available
  if (bankingRequest.type == ACTION_TYPES.REMOTE_BANKING_LIST_BANK_SUCCESS) {
    return (
      <BankForm
        defaultCountry={props.defaultCountry}
        changeCountry={changeCountry}
        banks={bankingRequest.payload}
        selectBank={selectBank}
      />
    );
  } else {
    return <CircularProgress />;
  }
};

export default connect()(BankFormView);
