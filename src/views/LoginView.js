import { Box } from '@material-ui/core';
import React, { useEffect } from 'react';
import LoginCard from '../components/LoginCard';

function LoginView(props) {
  return (
    <Box
      position="fixed"
      top={0}
      height="100%"
      width="100%"
      bgcolor="primary.main"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <LoginCard />
    </Box>
  );
}

export default LoginView;
