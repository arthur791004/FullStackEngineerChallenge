import { createSlice, createSelector } from 'redux-starter-kit';
import { getUserList } from '@/services/apis/users';
import normalize from '@/utils/normalize';
import getErrorMessage from '@/utils/getErrorMessage';

const usersSlice = createSlice({
  slice: 'users',
  initialState: {
    list: [],
    byId: {},
    error: null,
    isLoading: false,
  },
  reducers: {
    getUserList: state => ({
      ...state,
      isLoading: true,
      error: null,
    }),
    setUserList: (state, { payload: { data } }) => ({
      ...state,
      isLoading: false,
      list: data.map(user => user.id),
      byId: normalize(data, 'id'),
    }),
    setError: (state, { payload }) => ({
      ...state,
      isLoading: false,
      error: payload,
    }),
  },
});

/**
 * Selectors
 */
export const selectUsers = state => state.users;

export const selectUserList = createSelector(
  selectUsers,
  ({ list, byId }) => list.map(userId => byId[userId])
);

export const selectIsLoading = createSelector(
  selectUsers,
  ({ isLoading }) => isLoading
);

export const selectError = createSelector(
  selectUsers,
  ({ error }) => error || ''
);

/**
 * Thunks
 */
export const getUserListThunk = () => {
  return async dispatch => {
    dispatch(usersSlice.actions.getUserList());

    try {
      const { data } = await getUserList();
      dispatch(usersSlice.actions.setUserList(data));
    } catch (error) {
      dispatch(usersSlice.actions.setError(getErrorMessage(error)));
    }
  };
};

export default usersSlice;
