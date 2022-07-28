import { AppBar, Box } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import { useTheme } from '@mui/material/styles';

function LandingPageView() {
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      style={{ background: theme.palette.background.main, maxHeight: 5 }}
    >
      <Box sx={{ pl: 3 }}>
        <img
          src={'/images/budgetly_dark.png'}
          loading="lazy"
          width="150px"
          height="100px"
        />
      </Box>
    </AppBar>
  );
}

export default connect()(LandingPageView);
