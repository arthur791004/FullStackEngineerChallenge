import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import { combineReducers } from 'redux';
import auth from './slices/auth';

const reducer = combineReducers({
  auth: auth.reducer,
});

const middleware = getDefaultMiddleware();

const store = configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
