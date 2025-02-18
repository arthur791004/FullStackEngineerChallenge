import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import { combineReducers } from 'redux';
import auth from './slices/auth';
import users from './slices/users';
import reviews from './slices/reviews';
import feedbacks from './slices/feedbacks';
import requiringReviews from './slices/requiringReviews';

const reducer = combineReducers({
  auth: auth.reducer,
  users: users.reducer,
  reviews: reviews.reducer,
  requiringReviews: requiringReviews.reducer,
  feedbacks: feedbacks.reducer,
});

const middleware = getDefaultMiddleware();

const store = configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
