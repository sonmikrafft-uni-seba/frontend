import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { connect } from 'react-redux';
import { changePopup } from '../../../store/popup/popup.actions';
import { popupContentType, popupActionType } from '../../../constants.js';
import { confirmPaymentIntent } from '../../../store/subscription/subscription.actions';

const StripeCardContainer = (props) => {
  const publicKey = props.subscription.publicKey;
  const clientSecret = props.subscription.clientSecret;
  const stripePromise = loadStripe(publicKey);
  const options = { clientSecret: clientSecret };

  const confirmPayment = (result) => {
    props.dispatch(confirmPaymentIntent(result));
  };

  const onPaymentSuccess = () => {
    props.dispatch(
      changePopup({
        title: 'Payment confirmation',
        popupContentType: popupContentType.PREMIUM_SUBSCRIPTION_CONFIRMATION,
        popupActionType: popupActionType.EMPTY,
      })
    );
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm
        onClosePopup={props.onClosePopup}
        onPaymentSuccess={onPaymentSuccess}
        confirmPayment={confirmPayment}
      />
    </Elements>
  );
};

export default connect()(StripeCardContainer);
