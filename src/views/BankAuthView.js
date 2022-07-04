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
      // 1. step: get end user agreement with fixed settings
      props.dispatch(
        remoteBankingEUARequest({
          max_historical_days: 90,
          access_valid_for_days: 30,
          access_scope: ['balances', 'transactions', 'details'],
        })
      );
    } else if (request.type == ACTION_TYPES.REMOTE_BANKING_EUA_SUCCESS) {
      // 2. step: save eua and get requisition object
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
      // 3. step: save requistion and redirect to bank authentification page
      props.dispatch(setReqForOnboarding(request.payload.id));
      // set onboarding state to select accounts, so that if user comes back everything is ready for review
      props.dispatch(
        setAccountOnboardingState(BankingOnboardingState.SELECT_ACCOUNTS)
      );
      props.dispatch(
        changePopup({
          title: 'Select Accounts',
          popupActionType: popupActionType.SAVE_OR_CANCEL,
        })
      );

      // redirect to bank authentification page
      window.location.replace(request.payload.link);
    }
  }, [request.type]);

  return <CircularProgress />;
};

export default connect()(BankAuthView);
