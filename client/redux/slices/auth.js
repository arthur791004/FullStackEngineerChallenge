import { createSlice, createSelector } from 'redux-starter-kit';
import { login, logout } from '@/services/apis/users';
import { getAuthInfo } from '@/services/apis/me';
import getErrorMessage from '@/utils/getErrorMessage';
import isAdmin from '@/utils/isAdmin';

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
    loginSucceeded: (state, { payload: { data } }) => ({
      ...state,
      user: data,
      isLoading: false,
      error: null,
    }),
    loginFailed: (state, { payload }) => ({
      ...state,
      user: null,
      isLoading: false,
      error: payload,
    }),
    logout: state => ({
      ...state,
      user: null,
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
    error: error || '',
  })
);

export const selectIsAdmin = createSelector(
  selectAuthUser,
  user => isAdmin(user)
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

export const logoutThunk = () => {
  return async dispatch => {
    try {
      await logout();
    } catch (error) {
      // do nothing
    }

    dispatch(authSlice.actions.logout());
  };
};

export default authSlice;
