import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { connect } from 'react-redux';

const PremiumSubscriptionCancellation = () => {
  const theme = useTheme();

  const cancellationDate = 'Sept 30, 2022';

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
        Your subscription has been successfully cancelled!
      </Typography>
      <Typography variant="subtitle1" color="#9e9e9e">
        Your user profile will no longer be a premium account after{' '}
        {cancellationDate}, and we have sent you a confirmation mail to assure
        that the cancelling of the premium plan was successful. We are sorry to
        hear that you are leaving Budgetly Premium.
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
    </Container>
  );
};

export default connect()(PremiumSubscriptionCancellation);
