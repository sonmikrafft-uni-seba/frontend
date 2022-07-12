import React, { useEffect } from 'react';
import { Container, Button, Grid, Box } from '@mui/material';
import { connect } from 'react-redux';
import SubscriptionPlanCard from './SubscriptionPlanCard.js';
import { FreeSubscriptionText, PremiumSubscriptionText } from './texts.js';
import { changePopup } from '../../../store/popup/popup.actions';
import {
  createSubscription,
  getConfig,
} from '../../../store/subscription/subscription.actions';
import { popupContentType, popupActionType } from '../../../constants.js';

const PlanComparison = (props) => {
  // Load the configuration
  const [configLoaded, setConfigLoaded] = React.useState(false);
  useEffect(() => {
    if (!configLoaded) {
      props.dispatch(getConfig());
    }
  }, [configLoaded]);
  useEffect(() => {
    if (props.subscription.publicKey) {
      setConfigLoaded(true);
    }
  }, [props.subscription.publicKey]);
  // Change to the next pop up when the subscription is created and client secret as well as subscription id is loaded
  useEffect(() => {
    if (props.subscription.subscriptionId && props.subscription.clientSecret) {
      props.dispatch(
        changePopup({
          title: 'Payment method',
          popupContentType: popupContentType.STRIPE_CARD_ELEMENT,
          popupActionType: popupActionType.EMPTY,
        })
      );
    }
  }, [props.subscription.subscriptionId, props.subscription.clientSecret]);
  // useEffect for create subscription on proceed
  const onProceed = () => {
    if (configLoaded) {
      props.dispatch(createSubscription());
    } else {
      console.log('Something went wrong, config not loaded');
    }
  };

  return (
    <Container
      maxWidth="md"
      style={{
        padding: 32,
        backgroundColor: '#e6ecfd',
      }}
    >
      <Grid container spacing={5} align="center" justifyContent="center">
        <Grid item xs={5}>
          <SubscriptionPlanCard
            subscription={FreeSubscriptionText}
            description="You are currently a free user"
            isPremium={false}
          />
        </Grid>
        <Grid item xs={5}>
          <SubscriptionPlanCard
            subscription={PremiumSubscriptionText}
            description="Upgrade to Budgetly Premium"
            isPremium={true}
          />
        </Grid>
      </Grid>
      <Box sx={{ pt: 2 }} px={32}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={onProceed}
        >
          PROCEED TO PAYMENT
        </Button>
      </Box>
    </Container>
  );
};

export default connect()(PlanComparison);
