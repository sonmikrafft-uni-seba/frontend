import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import {
  ACTION_TYPES,
  remoteBankingAuthRequest,
  remoteBankingEUARequest,
  setAccountOnboardingState,
  setEuaForOnboarding,
  setReqForOnboarding,
} from '../store/banking/banking.actions';
import { useLocation } from 'react-router-dom';
import { BankingOnboardingState, baseUrl, popupActionType } from '../constants';
import { changePopup } from '../store/popup/popup.actions';

const BankAuthView = (props) => {
  const user = useSelector((state) => state.user.user);
  const request = useSelector((state) => state.banking.request);
  const location = useLocation();

  useEffect(() => {
    if (request.type == ACTION_TYPES.REMOTE_BANKING_LIST_BANK_SUCCESS) {
      props.dispatch(
        remoteBankingEUARequest({
          max_historical_days: 90,
          access_valid_for_days: 30,
          access_scope: ['balances', 'transactions', 'details'],
        })
      );
    } else if (request.type == ACTION_TYPES.REMOTE_BANKING_EUA_SUCCESS) {
      props.dispatch(setEuaForOnboarding(request.payload.id));
      props.dispatch(
        remoteBankingAuthRequest({
          redirect: baseUrl + location.pathname,
          reference: new Date().toISOString() + '-' + user._id,
          agreement: request.payload.id,
          user_language: 'EN',
        })
      );
    } else if (request.type == ACTION_TYPES.REMOTE_BANKING_AUTH_SUCCESS) {
      props.dispatch(setReqForOnboarding(request.payload.id));
      props.dispatch(
        setAccountOnboardingState(BankingOnboardingState.SELECT_ACCOUNTS)
      );
      props.dispatch(
        changePopup({
          title: 'Select Accounts',
          popupActionType: popupActionType.SAVE_OR_CANCEL,
        })
      );
      window.location.replace(request.payload.link);
    }
  }, [request.type]);

  if (request.type == ACTION_TYPES.REMOTE_BANKING_AUTH_SUCCESS) {
    return <>Redirecting...</>;
  } else {
    return <CircularProgress />;
  }
};

export default connect()(BankAuthView);
