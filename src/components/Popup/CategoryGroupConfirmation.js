import React from 'react';
import { Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { connect } from 'react-redux';
import { CheckCircle } from '@mui/icons-material';

const CategoryGroupConfirmation = () => {
  const theme = useTheme();

  return (
    <Container align="center" alignItems="center">
      <CheckCircle style={{ color: 'green' }} fontSize="large" />
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        Your Category Group has been added successfully!
      </Typography>
    </Container>
  );
};

export default connect()(CategoryGroupConfirmation);
