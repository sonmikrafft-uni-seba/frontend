import { Box, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { getUser } from '../store/user/user.actions.js';
import {
  remoteBankingTokenRequest,
  remoteBankingRefreshTokenRequest,
} from '../store/banking/banking.actions.js';
import { transactionsPullBanking } from '../store/transaction/transaction.actions.js';
import { parseJwt } from '../utils';

const LoadingView = (props) => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.user.user);
  const accessToken = useSelector((state) => state.banking.request.accessToken);
  const refreshToken = useSelector(
    (state) => state.banking.request.refreshToken
  );
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
    // if accessToken not set, request a new one
    if (!accessToken) {
      props.dispatch(remoteBankingTokenRequest());
      return;
    }

    // timestamp of when the token should be updated
    let accessTokenLimit = new Date();
    accessTokenLimit.setHours(new Date().getHours() - 1);

    // timestamp of when the access token expires
    let accessTokenExp = new Date(parseJwt(accessToken).exp * 1000);

    // token expires or is expired, ask for refresh
    if (refreshToken != null && accessTokenExp < accessTokenLimit) {
      props.dispatch(remoteBankingRefreshTokenRequest(refreshToken));
    }
  }, [accessToken, refreshToken]);

  useEffect(() => {
    if (token && user && accessToken && refreshToken) {
      props.dispatch(transactionsPullBanking());
      navigate('/app');
    }
  }, [token, user, accessToken, refreshToken]);

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
