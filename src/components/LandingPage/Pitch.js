import { Box, Typography } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { LandingPageTexts } from './text';

function Pitch() {
  const theme = useTheme();

  return (
    <>
      <Box
        component="img"
        sx={{ maxWidth: 400, maxHeight: 250 }}
        src={'/images/budgetly_dark_flat.png'}
        pb={1}
      ></Box>
      <Typography variant="h6" color={theme.palette.secondary.main}>
        {LandingPageTexts.pitch}
      </Typography>
    </>
  );
}

export default connect()(Pitch);
