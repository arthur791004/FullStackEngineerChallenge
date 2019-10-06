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
    getList: state => ({
      ...state,
      isLoading: true,
      error: null,
    }),
    setList: (state, { payload: { data } }) => ({
      ...state,
      isLoading: false,
      list: data.map(user => user.id),
      byId: normalize(data, 'id'),
    }),
    setError: (state, { payload }) => ({
      ...state,
      isLoading: false,
      error: getErrorMessage(payload),
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
const { actions } = usersSlice;

export const getUserListThunk = () => {
  return async dispatch => {
    dispatch(actions.getList());

    try {
      const { data } = await getUserList();
      dispatch(actions.setList(data));
    } catch (error) {
      dispatch(actions.setError(error));
    }
  };
};

export default usersSlice;
