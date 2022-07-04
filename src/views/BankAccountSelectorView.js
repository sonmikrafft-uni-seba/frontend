import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import {
  remoteBankingAccountDetailsRequest,
  remoteBankingAccountsRequest,
  resetBankingAccountOnboarding,
} from '../store/banking/banking.actions';
import BankAccountSelector from '../components/Popup/BankAccountSelector';
import { updateUser } from '../store/user/user.actions';
import { BankingOnboardingState } from '../constants';

const BankAccountSelectorView = (props) => {
  const accountOnboarding = useSelector(
    (state) => state.banking.accountOnboarding
  );
  const user = useSelector((state) => state.user.user);

  // ensure that all accounts have not just ids
  const allAccountsHaveName = (accounts) => {
    return accounts.every((account) => account.hasOwnProperty('name'));
  };

  // create data structure for user bank
  const createUserBank = (accounts) => {
    const accountsList = accounts.map((account) => {
      return {
        name: account.name,
        metaData: {
          iban: account.iban,
          product: account.product,
          owner: account.ownerName,
          currency: account.currency,
        },
        accesstoken: account.id,
      };
    });

    const bank = {
      requisitionID: accountOnboarding.requisitionId,
      institutionID: accountOnboarding.selectedBank.id,
      name: accountOnboarding.selectedBank.name,
      metaData: {
        logo: accountOnboarding.selectedBank.logo,
        euaId: accountOnboarding.euaId,
      },
      bankaccounts: accountsList,
    };

    return bank;
  };

  // update user object
  const onAddAccounts = (accounts) => {
    if (
      accountOnboarding.state == BankingOnboardingState.SELECT_ACCOUNTS &&
      accounts.length > 0
    ) {
      const newBank = createUserBank(accounts);
      const newUser = { ...user, userBanks: [...user.userBanks, newBank] };
      props.dispatch(updateUser({ userToUpdate: newUser }));
      props.dispatch(resetBankingAccountOnboarding());
    }
  };

  useEffect(() => {
    // request accounts if their ids are not present
    if (!accountOnboarding.accounts || accountOnboarding.accounts.length == 0) {
      props.dispatch(remoteBankingAccountsRequest());
    } else if (
      // request details for all accounts
      accountOnboarding.accounts.length > 0 &&
      !allAccountsHaveName(accountOnboarding.accounts)
    ) {
      accountOnboarding.accounts.forEach((account) => {
        if (!account.hasOwnProperty('name'))
          props.dispatch(
            remoteBankingAccountDetailsRequest({ accountId: account.id })
          );
      });
    }
  }, [accountOnboarding]);

  return (
    <BankAccountSelector
      accounts={accountOnboarding.accounts}
      notifySave={props.notifySave}
      setSaveable={props.setSaveable}
      addAccounts={onAddAccounts}
    />
  );
};

export default connect()(BankAccountSelectorView);
