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
} from '@material-ui/core';
import { useTheme } from '@material-ui/styles';

export default function LoginCard(props) {
  const theme = useTheme();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  useEffect(() => {
    if (props.hasOwnProperty('error') && props.error != null) {
      setErrorMessage(props.error.message);
    }
  }, [props.error]);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onLogin = (e) => {
    e.preventDefault();
    props.onLogin(email, password);
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
              Sign in
            </Typography>
          </Box>

          <form noValidate>
            <Grid container spacing={2}>
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
                    errorMessage.includes('password') ? errorMessage : ''
                  }
                  error={errorMessage.includes('password')}
                />
              </Grid>
            </Grid>

            <Box sx={{ pt: 2 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={onLogin}
                disabled={email.trim() === '' || password.trim() === ''}
              >
                Sign In
              </Button>
            </Box>

            <Box sx={{ pt: 2, pb: 4 }}>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link href="/sign-up" variant="body2">
                    Don't have an account? Sign up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Box>
      </Paper>
    </Container>
  );
}
