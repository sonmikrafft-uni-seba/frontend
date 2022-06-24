import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/store.js';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';
import theme from './theme';
import LoginView from './views/LoginView';
import SignUpView from './views/SignUpView';
import AppView from './views/AppView';
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
              <Route path="/app" element={<AppView />} />
            </Routes>
          </>
        </ThemeProvider>
      </Box>
    </Provider>
  );
}

export default App;
