import React from 'react';
import { Container, Button, Grid, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { connect } from 'react-redux';
import SubscriptionPlanCard from './SubscriptionPlanCard.js';
import { PremiumSubscriptionText } from './texts.js';

const PlanComparison = () => {
  const theme = useTheme();

  const onCancel = () => {
    console.log('Subscription is being cancelled...');
  };

  return (
    <Container
      maxWidth="md"
      style={{
        padding: 32,
        backgroundColor: '#e6ecfd',
      }}
      align="center"
    >
      <SubscriptionPlanCard
        subscription={PremiumSubscriptionText}
        description="Thank you for choosing Budgetly Premium!"
        isPremium={true}
      />

      {/* this button will be replaced by popup button? */}
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

export default connect()(PlanComparison);
