import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import LoginCard from '../components/LoginCard';
import { login } from '../store/auth/auth.actions.js';

function LoginView(props) {
  const navigate = useNavigate();

  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    if (authState.token) {
      navigate('/');
    }
  }, [authState.token]);

  const onLogin = (email, password) => {
    props.dispatch(login({ email, password }));
  };

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
      <LoginCard error={authState.error} onLogin={onLogin} />
    </Box>
  );
}

export default connect()(LoginView);
