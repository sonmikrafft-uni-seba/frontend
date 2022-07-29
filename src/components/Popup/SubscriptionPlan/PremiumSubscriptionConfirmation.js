import React, { useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  MenuItem,
  ListItemText,
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { connect } from 'react-redux';
import { getUser } from '../../../store/user/user.actions';
import { parseJwt, formatMoney } from '../../../utils';

const PremiumSubscriptionConfirmation = (props) => {
  const theme = useTheme();
  const paymentIntent = props.subscription.paymentIntent;
  const paidAmount = formatMoney(paymentIntent.amount);

  const [intervalID, setIntervalID] = React.useState();
  useEffect(() => {
    if (props.user.subscriptionPlan[0] == 'FREE') {
      let letIntervalID = setInterval(() => {
        const tokenObj = parseJwt(props.auth.token);
        props.dispatch(getUser(tokenObj._id));
      }, 3000);
      setIntervalID(letIntervalID);
    } else {
      clearInterval(intervalID);
    }
  }, [props.user.subscriptionPlan[0]]);

  const subscriptionOrders = [
    {
      duration: '1 month',
      cost: paidAmount,
    },
  ];

  return (
    <Container
      maxWidth="md"
      style={{
        padding: 32,
      }}
      align="center"
      justifyContent="center"
    >
      <CheckCircle style={{ color: 'green' }} fontSize="large" />
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        Thanks a lot for subscribing to Budgetly Premium!
      </Typography>
      <Typography variant="subtitle1" color="#9e9e9e">
        Your user profile has been successfully upgraded. You'll find all the
        details about your order below, and we have sent you a confirmation mail
        to assure that your purchase was successful. Have fun with Budgetly
        Premium!
      </Typography>
      <Box padding={2}>
        <Typography variant="subtitle1" color="#9e9e9e">
          Questions? Suggestions? Feedback?
        </Typography>
        <a href="mailto:budgetly@gmail.com">Shoot us an Email</a>
      </Box>
      <TextField
        id="select-subscription-duration"
        label="Order Review"
        value="1 Month"
        select
        helperText=""
        fullWidth
        size="small"
      >
        {subscriptionOrders.map((option) => (
          <MenuItem key={option.duration} value="1 Month">
            <ListItemText>{'1 Month'}</ListItemText>
            <Typography variant="body2" color="text.secondary">
              € {paidAmount}
            </Typography>
          </MenuItem>
        ))}
      </TextField>
    </Container>
  );
};

export default connect()(PremiumSubscriptionConfirmation);
