import { createSlice, createSelector } from 'redux-starter-kit';
import { login } from '@/services/apis/users';
import { getAuthInfo } from '@/services/apis/me';
import getErrorMessage from '@/utils/getErrorMessage';

const authSlice = createSlice({
  slice: 'auth',
  initialState: {
    user: null,
    error: null,
    isLoading: false,
  },
  reducers: {
    getAuthInfo: state => ({
      ...state,
      isLoading: true,
      error: null,
    }),
    login: state => ({
      ...state,
      isLoading: true,
      error: null,
    }),
    loginSucceeded: (state, { payload }) => ({
      ...state,
      user: payload,
      isLoading: false,
      error: null,
    }),
    loginFailed: (state, { payload }) => ({
      ...state,
      user: null,
      isLoading: false,
      error: payload,
    }),
  },
});

/**
 * Selectors
 */
export const selectAuth = state => state.auth;

export const selectAuthUser = createSelector(
  selectAuth,
  auth => auth.user
);

export const selectAuthInfo = createSelector(
  selectAuth,
  ({ isLoading, error, user }) => ({
    isAuthed: !!user,
    isLoading,
    error,
  })
);

/**
 * Thunks
 */
export const initAuthThunk = () => {
  return async dispatch => {
    dispatch(authSlice.actions.getAuthInfo());

    try {
      const { data } = await getAuthInfo();
      dispatch(authSlice.actions.loginSucceeded(data));
    } catch (error) {
      dispatch(authSlice.actions.loginFailed(null));
    }
  };
};

export const loginThunk = (email, password) => {
  return async dispatch => {
    dispatch(authSlice.actions.login());

    try {
      const { data } = await login(email, password);
      dispatch(authSlice.actions.loginSucceeded(data));
    } catch (error) {
      dispatch(authSlice.actions.loginFailed(getErrorMessage(error)));
    }
  };
};

export default authSlice;
