import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { connect } from 'react-redux';
import { CheckCircle } from '@mui/icons-material';

const CategoryGroupConfirmation = (props) => {
  const theme = useTheme();

  return (
    <Container align="center" alignItems="center">
      <CheckCircle style={{ color: 'green' }} fontSize="large" />
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        Your Category has been {props.EDIT ? 'edited' : 'added'} successfully!
      </Typography>
      <Box padding={2}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Shall all previous transactions matching the selected keywords get
          updated?
        </Typography>
      </Box>
    </Container>
  );
};

export default connect()(CategoryGroupConfirmation);
