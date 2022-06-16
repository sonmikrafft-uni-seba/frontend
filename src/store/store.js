import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './root.reducers.js';
import rootSaga from './root.saga.js';

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

export default (preloadedState = {}) => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware,
    preloadedState,
  });
  sagaMiddleware.run(rootSaga);
  return store;
};
