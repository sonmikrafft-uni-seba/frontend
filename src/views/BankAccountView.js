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
} from '../store/banking/banking.actions';
import { parseJwt } from '../utils';

const BankAccountView = (props) => {
  const accountOnboardingState = useSelector(
    (state) => state.banking.accountOnboarding.state
  );

  const accessToken = useSelector((state) => state.banking.request.accessToken);
  const refreshToken = useSelector(
    (state) => state.banking.request.refreshToken
  );

  const defaultCountry = 'DE';

  // if accessToken not set, request a new one
  if (!accessToken) {
    props.dispatch(remoteBankingTokenRequest());
  }

  // token expires or is expired, ask for refresh
  if (
    refreshToken != null &&
    new Date(parseJwt(refreshToken).exp) >
      new Date().setHours(new Date().getHours - 1)
  ) {
    props.dispatch(remoteBankingRefreshTokenRequest(refreshToken));
  }

  // handle popup page switch
  useEffect(() => {
    if (!props.notifySave) return;

    switch (accountOnboardingState) {
      case BankingOnboardingState.BANK_LIST:
        // pull banks for default country
        // switch view
        // change actions
        props.dispatch(remoteBankingListBankRequest('DE'));
        props.dispatch(
          setAccountOnboardingState(BankingOnboardingState.SELECT_BANK)
        );
        props.dispatch(
          changePopup({
            title: 'Select Bank',
            popupActionType: popupActionType.EMPTY,
          })
        );
        props.setNotifySave(false);
        return;
      case BankingOnboardingState.SELECT_ACCOUNTS:
        props.setNotifySave(false);
        return;
      default:
        props.setNotifySave(false);
        return;
    }
  }, [props.notifySave]);

  const renderContent = (contentMode) => {
    switch (contentMode) {
      case BankingOnboardingState.BANK_LIST:
        return <BankAccountList />;
      case BankingOnboardingState.SELECT_BANK:
        return <BankFormView defaultCountry={defaultCountry} />;
      case BankingOnboardingState.AUTH_BANK:
        return <BankAuthView />;
      case BankingOnboardingState.SELECT_ACCOUNTS:
        return (
          <BankAccountSelectorView
            setSaveable={props.setSaveable}
            notifySave={props.notifySave}
          />
        );
      default:
        return <>Broken -.-</>;
    }
  };

  return renderContent(accountOnboardingState);
};

export default connect()(BankAccountView);
