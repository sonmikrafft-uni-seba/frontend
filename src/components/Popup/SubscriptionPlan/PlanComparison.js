import React from 'react';
import { Container, Button, Grid, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { connect } from 'react-redux';
import SubscriptionPlanCard from './SubscriptionPlanCard.js';
import { FreeSubscriptionText, PremiumSubscriptionText } from './texts.js';

const PlanComparison = () => {
  const theme = useTheme();

  const onProceed = () => {
    console.log('Plan has been selected...');
  };

  return (
    <Container
      maxWidth="md"
      style={{
        padding: 32,
        backgroundColor: '#e6ecfd',
      }}
    >
      <Grid container spacing={10} align="center" justifyContent="center">
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
      <Box sx={{ pt: 2 }} padding={32}>
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
