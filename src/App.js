import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import LoginView from './views/LoginView';
import SignUpView from './views/SignUpView';
import HomePageView from './views/HomePageView';
import theme from './theme';
import { Box, CssBaseline } from '@material-ui/core';

function App() {
  useEffect(() => {
    document.title = 'Budgetly';
  }, []);

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <>
          <CssBaseline />
          <Routes>
            <Route path="/login" element={<LoginView />} />
            <Route path="/sign-up" element={<SignUpView />} />
            <Route path="/homepage" element={<HomePageView />} />
          </Routes>
        </>
      </ThemeProvider>
    </Box>
  );
}

export default App;
