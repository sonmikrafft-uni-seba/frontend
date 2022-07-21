import { loadStripe } from '@stripe/stripe-js'; // import not used

export const SUBSCRIPTION_ENDPOINT_API = (userId) => {
  return 'http://localhost:3001/user/' + userId + '/subscription';
};

export const createSubscriptionRequest = async (token, userId, priceId) => {
  const response = await fetch(SUBSCRIPTION_ENDPOINT_API(userId), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'jwt ' + token,
    },
    body: JSON.stringify({ priceId: priceId }),
  });
  return await response.json();
};

export const cancelSubscriptionRequest = async (
  token,
  userId,
  subscriptionId
) => {
  const response = await fetch(SUBSCRIPTION_ENDPOINT_API(userId) + '/cancel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'jwt ' + token,
    },
    body: JSON.stringify({ subscriptionId: subscriptionId }),
  });
  return await response.json();
};

// Not used because I failed to pass elements
export const confirmPaymentIntentRequest = async (publicKey, elements) => {
  const stripe = loadStripe(`${publicKey}`);
  if (!stripe || !elements) {
    return;
  }
  return await stripe.confirmPayment({
    elements,
    confirmParams: {
      return_url: 'https://localhost:3000/app',
    },
    redirect: 'if_required',
  });
};

export const getConfig = async (token, userId) => {
  const response = await fetch(SUBSCRIPTION_ENDPOINT_API(userId) + '/config', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'jwt ' + token,
    },
  });
  return await response.json();
};
