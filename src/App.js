import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/store.js';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';
import theme from './theme';
import LoginView from './views/LoginView';
import SignUpView from './views/SignUpView';
import LoadingView from './views/LoadingView';
import AppView from './views/AppView';
import { loadState, saveState } from './store/localStorage';

const persistedState = loadState();
const store = configureStore(persistedState);

store.subscribe(() => {
  saveState({
    auth: store.getState().auth,
    user: store.getState().user,
    popup: store.getState().popup,
    transaction: store.getState().transaction,
    banking: store.getState().banking,
    app: store.getState().app,
    subscription: store.getState().subscription,
  });
});

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
              <Route path="/" element={<LoadingView />} />
              <Route path="/login" element={<LoginView />} />
              <Route path="/sign-up" element={<SignUpView />} />
              <Route path="/app" element={<AppView />} />
              <Route path="/app/:categoryGroupName" element={<AppView />} />
              <Route
                path="/app/:categoryGroupName/:categoryName"
                element={<AppView />}
              />
            </Routes>
          </>
        </ThemeProvider>
      </Box>
    </Provider>
  );
}

export default App;
