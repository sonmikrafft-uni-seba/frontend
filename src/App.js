import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/store.js';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { Box, CssBaseline } from '@material-ui/core';
import theme from './theme';
import LoginView from './views/LoginView';
import SignUpView from './views/SignUpView';
import HomePageView from './views/HomePageView.js';
const store = configureStore();

function App() {
  useEffect(() => {
    document.title = 'Budgetly';
  }, []);

  return (
    <Provider store={store}>
      <Box>
        <ThemeProvider theme={theme}>
          <>
            <CssBaseline />
            <Routes>
              <Route path="/login" element={<LoginView />} />
              <Route path="/sign-up" element={<SignUpView />} />
              <Route path="/app" element={<HomePageView />} />
            </Routes>
          </>
        </ThemeProvider>
      </Box>
    </Provider>
  );
}

export default App;
