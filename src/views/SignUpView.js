import { Box } from '@material-ui/core';
import React, { useEffect } from 'react';
import SignUpCard from '../components/SignUpCard';

function SignUpView(props) {
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
      <SignUpCard />
    </Box>
  );
}

export default SignUpView;
