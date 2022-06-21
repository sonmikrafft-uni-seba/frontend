import { Box } from '@material-ui/core';
import React, { useEffect } from 'react';
import SideBar from '../components/HomePage/SideBar';
import MyAppBar from '../components/HomePage/AppBar';
import HomePageCard from '../components/HomePage/HomePageCard';

function HomePageView(props) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <MyAppBar />
      <SideBar />
      <HomePageCard />
    </Box>
  );
}

export default HomePageView;
