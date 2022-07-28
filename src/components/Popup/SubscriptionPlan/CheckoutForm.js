import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import React from 'react';
import { Button } from '@mui/material';

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event) => {
    event.preventDefault();

    // This solution violates our convention, but useElements hook does not work in service, passing elements as action payload does not work either.
    // Any help concerning this point would be appreciated!
    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      // Not used, since we never deploy the server
      confirmParams: {
        return_url: 'https://localhost:3000/',
      },
      redirect: 'if_required',
    });

    if (result.error) {
      console.log(result.error);
    } else if (
      result.paymentIntent &&
      result.paymentIntent.status === 'succeeded'
    ) {
      props.confirmPayment(result);
      props.onPaymentSuccess();
    }
  };

  return (
    <form>
      <PaymentElement />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Upgrade now
      </Button>
    </form>
  );
};

export default CheckoutForm;
