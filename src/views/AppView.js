import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import PopupView from './PopupView';
import SideBar from '../components/App/SideBar';
import ApplicationBar from '../components/App/ApplicationBar';
import ApplicationContentContainer from '../components/App/ApplicationContentContainer';
import { useSelector, connect } from 'react-redux';
function AppView(props) {
  const userState = useSelector((state) => state.user.user);
  const isPremium = userState.subscriptionPlan[0] === 'PREMIUM';
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <PopupView />
      <ApplicationBar isPremium={isPremium} />
      <SideBar />
      <ApplicationContentContainer />
    </Box>
  );
}

export default connect()(AppView);
