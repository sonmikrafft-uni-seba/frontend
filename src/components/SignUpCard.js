import React, { useEffect } from 'react';
import {
  Container,
  Button,
  Typography,
  Paper,
  Grid,
  TextField,
  Link,
  Box,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function SignUpCard(props) {
  const theme = useTheme();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [password2, setPassword2] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  useEffect(() => {
    if (props.hasOwnProperty('error') && props.error != null) {
      setErrorMessage(props.error.message);
    }
  }, [props.error]);

  useEffect(() => {
    if (password != password2 && password.length == password2.length) {
      setErrorMessage('Passwords are not matching.');
    } else if (password.length != password2.length) {
      setErrorMessage('');
    }
  }, [password, password2]);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangePassword2 = (e) => {
    setPassword2(e.target.value);
  };

  const onChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const onChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  const onSignUp = (e) => {
    e.preventDefault();
    props.onSignUp(email, password, firstName, lastName);
  };

  return (
    <Container maxWidth="xs">
      <Paper bgcolor={theme.palette.secondary.main}>
        <Box
          sx={{
            pl: 4,
            pr: 4,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <img src={'/images/budgetly.png'} loading="lazy" />

          <Box sx={{ pb: 2 }}>
            <Typography variant="h4" color="textSecondary">
              Sign up
            </Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstName}
                onChange={onChangeFirstName}
                helperText={
                  errorMessage.includes('firstname') ? errorMessage : ''
                }
                error={errorMessage.includes('firstname')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lastName}
                onChange={onChangeLastName}
                helperText={
                  errorMessage.includes('lastname') ? errorMessage : ''
                }
                error={errorMessage.includes('lastname')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={onChangeEmail}
                helperText={errorMessage.includes('mail') ? errorMessage : ''}
                error={errorMessage.includes('mail')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="password1"
                label="Password"
                name="password1"
                type="password"
                value={password}
                onChange={onChangePassword}
                helperText={
                  errorMessage.includes('password') ||
                  errorMessage.includes('Passwords')
                    ? errorMessage
                    : ''
                }
                error={
                  errorMessage.includes('password') ||
                  errorMessage.includes('Passwords')
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="password2"
                label="Repeat Password"
                name="password2"
                type="password"
                value={password2}
                onChange={onChangePassword2}
                helperText={
                  errorMessage.includes('password') ||
                  errorMessage.includes('Passwords')
                    ? errorMessage
                    : ''
                }
                error={
                  errorMessage.includes('password') ||
                  errorMessage.includes('Passwords')
                }
              />
            </Grid>
          </Grid>

          <Box sx={{ pt: 2 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={onSignUp}
              disabled={
                email.trim() === '' ||
                firstName.trim() === '' ||
                lastName.trim() === '' ||
                password.trim() === '' ||
                password2.trim() === '' ||
                password !== password2
              }
            >
              Sign Up
            </Button>
          </Box>

          <Box sx={{ pt: 2, pb: 4 }}>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
