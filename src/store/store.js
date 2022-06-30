import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './root.reducers.js';
import rootSaga from './root.saga.js';

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

export default (persistedState) => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware,
    preloadedState: persistedState,
  });
  sagaMiddleware.run(rootSaga);
  return store;
};
