import { Box, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { getUser } from '../store/user/user.actions.js';
import { parseJwt } from '../utils';

const LoadingView = (props) => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      const tokenObj = parseJwt(token);
      props.dispatch(getUser(tokenObj._id));
    }
  }, [token]);

  useEffect(() => {
    if (token && user) {
      navigate('/app');
    }
  }, [token, user]);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        padding: '50px',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default connect()(LoadingView);
