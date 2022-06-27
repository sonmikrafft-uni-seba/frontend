import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import PopupView from './PopupView';
import SideBar from '../components/App/SideBar';
import ApplicationBar from '../components/App/ApplicationBar';
import ApplicationContentContainer from '../components/App/ApplicationContentContainer';

function AppView(props) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <PopupView />
      <ApplicationBar />
      <SideBar />
      <ApplicationContentContainer />
    </Box>
  );
}

export default AppView;
