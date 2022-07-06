import React, { useEffect } from 'react';
import BankAccountList from '../components/Popup/BankAccountList';
import BankAccountSelectorView from './BankAccountSelectorView';
import BankAuthView from './BankAuthView';
import BankFormView from './BankFormView';
import { BankingOnboardingState, popupActionType } from '../constants';
import { connect, useSelector } from 'react-redux';
import { changePopup } from '../store/popup/popup.actions';
import {
  setAccountOnboardingState,
  remoteBankingTokenRequest,
  remoteBankingRefreshTokenRequest,
  remoteBankingListBankRequest,
  resetBankingAccountOnboarding,
} from '../store/banking/banking.actions';
import { parseJwt } from '../utils';
import { CircularProgress, Box } from '@mui/material';

const BankAccountView = (props) => {
  // state to manage on which page we are in onboarding process
  const accountOnboardingState = useSelector(
    (state) => state.banking.accountOnboarding.state
  );

  const popupVisibleState = useSelector((state) => state.popup.visible);
  const userBanks = useSelector((state) => state.user.user.userBanks);
  const accessToken = useSelector((state) => state.banking.request.accessToken);
  const refreshToken = useSelector(
    (state) => state.banking.request.refreshToken
  );

  const defaultCountry = 'DE';

  useEffect(() => {
    // if accessToken not set, request a new one
    if (!accessToken) {
      props.dispatch(remoteBankingTokenRequest());
    }

    // timestamp of when the token should be updated
    let accessTokenLimit = new Date();
    accessTokenLimit.setHours(new Date().getHours() - 1);

    // timestamp of when the access token expires
    let accessTokenExp = new Date(parseJwt(accessToken).exp * 1000);

    // token expires or is expired, ask for refresh
    if (refreshToken != null && accessTokenExp < accessTokenLimit) {
      props.dispatch(remoteBankingRefreshTokenRequest(refreshToken));
    }
  }, [accessToken, refreshToken]);

  // reset onboarding flow if popup is closed
  useEffect(() => {
    if (!popupVisibleState) {
      props.dispatch(resetBankingAccountOnboarding());
    }
  }, [popupVisibleState]);

  // handle popup page switch
  useEffect(() => {
    if (!props.notifySave) return;

    switch (accountOnboardingState) {
      case BankingOnboardingState.BANK_LIST:
        // pull banks for default country
        props.dispatch(remoteBankingListBankRequest('DE'));
        // switch view
        props.dispatch(
          setAccountOnboardingState(BankingOnboardingState.SELECT_BANK)
        );
        // change actions

        props.dispatch(
          changePopup({
            title: 'Select Bank',
            popupActionType: popupActionType.EMPTY,
          })
        );
        props.setNotifySave(false);
        return;
      default:
        props.setNotifySave(false);
        return;
    }
  }, [props.notifySave]);

  const renderContent = (contentMode) => {
    switch (contentMode) {
      case BankingOnboardingState.BANK_LIST: // list of all bank accounts of user
        return <BankAccountList userBanks={userBanks} />;
      case BankingOnboardingState.SELECT_BANK: // list of all banks available
        return <BankFormView defaultCountry={defaultCountry} />;
      case BankingOnboardingState.AUTH_BANK: // auth process for selected bank
        return <BankAuthView />;
      case BankingOnboardingState.SELECT_ACCOUNTS: // select accounts of authenticated bank account
        return (
          <BankAccountSelectorView
            setSaveable={props.setSaveable}
            notifySave={props.notifySave}
          />
        );
      default:
        return (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              padding: '50px',
            }}
          >
            <CircularProgress />
          </Box>
        );
    }
  };

  return renderContent(accountOnboardingState);
};

export default connect()(BankAccountView);
