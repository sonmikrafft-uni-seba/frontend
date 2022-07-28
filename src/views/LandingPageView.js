import { Box, Grid } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import LandingBar from '../components/LandingPage/LandingBar';
import FeaturesPaper from '../components/LandingPage/FeaturesPaper';
import Pitch from '../components/LandingPage/Pitch';
import Team from '../components/LandingPage/Team';

function LandingPageView() {
  const theme = useTheme();

  const navigate = useNavigate();

  const onClickExploreNow = () => {
    navigate('/');
  };

  return (
    <Box
      position="fixed"
      top={0}
      height="100%"
      width="100%"
      bgcolor="background.main"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <LandingBar />

      <Grid
        container
        spacing={5}
        align="center"
        justifyContent="center"
        pt={8}
        padding={15}
      >
        <Grid item xs={4}>
          <FeaturesPaper onClickExploreNow={onClickExploreNow} />
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              minHeight: 450,
              padding: 1,
            }}
          >
            <Pitch />
            <Team />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default connect()(LandingPageView);
