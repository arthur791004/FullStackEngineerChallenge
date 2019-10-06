import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import { combineReducers } from 'redux';
import auth from './slices/auth';
import users from './slices/users';

const reducer = combineReducers({
  auth: auth.reducer,
  users: users.reducer,
});

const middleware = getDefaultMiddleware();

const store = configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
