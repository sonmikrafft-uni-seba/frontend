import React, { useState } from 'react';
import { useSelector, connect } from 'react-redux';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import PopupContainer from '../components/App/PopupContainer';
import { closePopup } from '../store/popup/popup.actions';
import { popupActionType, popupContentType } from '../constants';
import TransactionForm from '../components/Popup/TransactionForm';

const PopupView = (props) => {
  const theme = useTheme();
  const popupState = useSelector((state) => state.popup);
  const transactionErrorState = useSelector((state) => state.transaction.error);
  const userState = useSelector((state) => state.user.user);

  // the bool notifySave is passed to PopupContentViews and indicates that a user pressed popup save action
  const [notifySave, setNotifySave] = useState(false);
  const [saveable, setSaveable] = useState(false);

  const onClosePopup = () => {
    props.dispatch(closePopup());
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
          />
        );

      case popupContentType.NEW_CATEGORY:
        // return <NewCategoryView notifySave={notifySave}/>
        return <>Category View</>;
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
      default:
        return [
          <Button
            key="close-button"
            onClick={onClosePopup}
            sx={{ color: theme.palette.primary }}
          >
            Close
          </Button>,
        ];
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
