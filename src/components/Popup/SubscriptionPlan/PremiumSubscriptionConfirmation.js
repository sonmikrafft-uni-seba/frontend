import React from 'react';
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

const PremiumSubscriptionConfirmation = () => {
  const theme = useTheme();

  const subscriptionOrders = [
    {
      duration: '1 month',
      cost: 2.99,
    },
  ];

  const [subcriptionDuration, setSubscriptionDuration] = React.useState(
    subscriptionOrders[0].duration
  );

  const handleChange = (event) => {
    setSubscriptionDuration(event.target.value);
  };

  return (
    <Container
      maxWidth="md"
      style={{
        padding: 32,
        backgroundColor: theme.palette.secondary.main,
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
        <Typography
          variant="subtitle1"
          color={theme.palette.primary.main}
          sx={{ textDecoration: 'underline' }}
        >
          Shoot us an email.
        </Typography>
      </Box>
      <TextField
        id="select-subscription-duration"
        select
        label="Order Review"
        value={subcriptionDuration}
        onChange={handleChange}
        helperText="Please select the duration for the subscription"
        fullWidth
        size="small"
      >
        {subscriptionOrders.map((option) => (
          <MenuItem key={option.duration} value={option.duration}>
            <ListItemText>{option.duration}</ListItemText>
            <Typography variant="body2" color="text.secondary">
              € {option.cost}
            </Typography>
          </MenuItem>
        ))}
      </TextField>
    </Container>
  );
};

export default connect()(PremiumSubscriptionConfirmation);
