import React, { useState } from 'react';
import { useSelector, connect } from 'react-redux';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import PopupContainer from '../components/App/PopupContainer';
import { closePopup } from '../store/popup/popup.actions';
import { popupActionType, popupContentType } from '../constants';
import NewCategoryView from './NewCategoryView';
import TransactionForm from '../components/Popup/TransactionForm';
import BankAccountView from './BankAccountView';
import PlanComparison from '../components/Popup/SubscriptionPlan/PlanComparison';
import PlanCancellation from '../components/Popup/SubscriptionPlan/PlanCancellation';
import StripeCardContainer from '../components/Popup/SubscriptionPlan/StripeCardContainer';
import PremiumSubscriptionConfirmation from '../components/Popup/SubscriptionPlan/PremiumSubscriptionConfirmation';
import PremiumSubscriptionCancellation from '../components/Popup/SubscriptionPlan/PremiumCancellationConfirmation';
const PopupView = (props) => {
  const theme = useTheme();
  const popupState = useSelector((state) => state.popup);
  const transactionErrorState = useSelector((state) => state.transaction.error);
  const userState = useSelector((state) => state.user.user);
  const subscriptionState = useSelector((state) => state.subscription);
  const authState = useSelector((state) => state.auth);
  // the bool notifySave is passed to PopupContentViews and indicates that a user pressed popup save action
  const [notifySave, setNotifySave] = useState(false);
  const [saveable, setSaveable] = useState(false);
  const onClosePopup = () => {
    props.dispatch(closePopup());
    setNotifySave(false);
  };

  const contentSelector = (popupContent) => {
    switch (popupContent) {
      case popupContentType.NEW_TRANSACTION:
        return (
          <TransactionForm
            user={userState}
            error={transactionErrorState}
            notifySave={notifySave}
            setSaveable={setSaveable}
            onClosePopup={onClosePopup}
            contentObject={null}
          />
        );

      case popupContentType.EDIT_TRANSACTION:
        return (
          <TransactionForm
            user={userState}
            error={transactionErrorState}
            notifySave={notifySave}
            setSaveable={setSaveable}
            onClosePopup={onClosePopup}
            contentObject={popupState.popupContentObject}
          />
        );

      case popupContentType.NEW_CATEGORY:
        return (
          <NewCategoryView
            notifySave={notifySave}
            setNotifySave={setNotifySave}
            onClosePopup={onClosePopup}
            setSaveable={setSaveable}
          />
        );
      case popupContentType.BANK_MANAGEMENT:
        return (
          <BankAccountView
            user={userState}
            notifySave={notifySave}
            setNotifySave={setNotifySave}
            setSaveable={setSaveable}
            onClosePopup={onClosePopup}
          />
        );
      case popupContentType.PREMIUM_SUBSCRIPTION:
        return (
          <PlanComparison
            subscription={subscriptionState}
            onClosePopup={onClosePopup}
          />
        );

      case popupContentType.STRIPE_CARD_ELEMENT:
        return <StripeCardContainer subscription={subscriptionState} />;
      case popupContentType.PREMIUM_SUBSCRIPTION_CONFIRMATION:
        return (
          <PremiumSubscriptionConfirmation
            subscription={subscriptionState}
            user={userState}
            auth={authState}
            popup={popupState}
            onClosePopup={onClosePopup}
          />
        );
      case popupContentType.CANCEL_SUBSCRIPTION:
        return (
          <PlanCancellation
            subscription={subscriptionState}
            onClosePopup={onClosePopup}
            user={userState}
          />
        );
      case popupContentType.CANCEL_SUBSCRIPTION_CONFIRMATION:
        return (
          <PremiumSubscriptionCancellation
            subscription={subscriptionState}
            onClosePopup={onClosePopup}
            user={userState}
            auth={authState}
          />
        );
      default:
        return <>No Content!</>;
    }
  };

  const actionSelector = (popupAction) => {
    switch (popupAction) {
      case popupActionType.SAVE_OR_CANCEL:
        return [
          <Button
            key="save-button"
            onClick={() => {
              setNotifySave(true);
            }}
            disabled={!saveable}
            sx={{ color: theme.palette.primary }}
          >
            SAVE
          </Button>,
          <Button
            key="close-button"
            onClick={onClosePopup}
            sx={{ color: theme.palette.primary }}
          >
            CANCEL
          </Button>,
        ];
      case popupActionType.YES_OR_NO:
        return [
          <Button
            key="yes-no-button"
            onClick={() => {
              setNotifySave(true);
            }}
            sx={{ color: theme.palette.primary }}
          >
            YES
          </Button>,
          <Button
            key="close-button"
            onClick={onClosePopup}
            sx={{ color: theme.palette.primary }}
          >
            NO
          </Button>,
        ];
      case popupActionType.ADD_BANK:
        return [
          <Button
            key="add-button"
            onClick={() => {
              setNotifySave(true);
            }}
            sx={{ color: theme.palette.primary }}
          >
            Add Bank Account
          </Button>,
        ];
      case popupActionType.CONFIRM:
        return [
          <Button
            key="confirm-button"
            onClick={onClosePopup}
            sx={{ color: theme.palette.primary }}
          >
            OK
          </Button>,
        ];
      case popupActionType.EMPTY:
      default:
        return [];
    }
  };

  return (
    <PopupContainer
      maxWidth={'md'}
      fullWidth={true}
      onClose={onClosePopup}
      visible={popupState.visible}
      title={popupState.title}
      dialogActions={actionSelector(popupState.popupActionType)}
    >
      {contentSelector(popupState.popupContentType)}
    </PopupContainer>
  );
};

export default connect()(PopupView);
