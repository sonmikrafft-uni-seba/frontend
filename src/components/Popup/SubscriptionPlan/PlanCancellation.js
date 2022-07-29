import React, { useEffect } from 'react';
import { Container, Button, Grid, Box } from '@mui/material';
import { connect } from 'react-redux';
import SubscriptionPlanCard from './SubscriptionPlanCard.js';
import { PremiumSubscriptionText } from './texts.js';
import {
  cancelSubscription,
  removePaymentIntent,
} from '../../../store/subscription/subscription.actions';
import { changePopup } from '../../../store/popup/popup.actions';
import { popupContentType, popupActionType } from '../../../constants.js';

const PlanCancellation = (props) => {
  const subscriptionToCancel = props.user.activeSubscriptionId;

  const onCancel = () => {
    props.dispatch(cancelSubscription(subscriptionToCancel));
    props.dispatch(removePaymentIntent());
  };

  useEffect(() => {
    if (props.subscription.cancelledSubscriptionId) {
      props.dispatch(
        changePopup({
          title: 'Cancel Confirmation',
          popupContentType: popupContentType.CANCEL_SUBSCRIPTION_CONFIRMATION,
          popupActionType: popupActionType.EMPTY,
        })
      );
    }
  }, [props.subscription.cancelledSubscriptionId]);

  return (
    <Container
      maxWidth="md"
      style={{
        padding: 12,
        backgroundColor: '#e6ecfd',
      }}
      align="center"
    >
      <SubscriptionPlanCard
        subscription={PremiumSubscriptionText}
        description="Thank you for choosing Budgetly Premium!"
        isPremium={true}
      />
      <Box sx={{ pt: 2 }}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          onClick={onCancel}
        >
          CANCEL SUBSCRIPTION
        </Button>
      </Box>
    </Container>
  );
};

export default connect()(PlanCancellation);
