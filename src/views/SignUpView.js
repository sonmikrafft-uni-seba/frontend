import { Box } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect, useSelector, useDispatch } from 'react-redux';
import SignUpCard from '../components/SignUpCard';
import { createUser } from '../store/user/user.actions';

function SignUpView(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userState = useSelector((state) => state.user);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  const onSignUp = (email, password, firstname, lastname) => {
    dispatch(createUser({ email, password, firstname, lastname }));
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
      <SignUpCard error={userState.error} onSignUp={onSignUp} />
    </Box>
  );
}

export default connect()(SignUpView);
