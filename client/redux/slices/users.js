import { createSlice, createSelector } from 'redux-starter-kit';
import { getUserList, createUser, updateUser } from '@/services/apis/users';
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
    addUser: (state, { payload: { data } }) => ({
      ...state,
      list: state.list.concat(data.id),
      byId: {
        ...state.byId,
        [data.id]: data,
      },
    }),
    updateUser: (state, { payload: { data } }) => ({
      ...state,
      byId: {
        ...state.byId,
        [data.id]: data,
      },
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

export const createUserThunk = user => {
  return async dispatch => {
    try {
      const { data } = await createUser(user);
      dispatch(actions.addUser(data));
    } catch (error) {
      throw error;
    }
  };
};

export const updateUserThunk = (userId, attributes) => {
  return async dispatch => {
    try {
      const { data } = await updateUser(userId, attributes);
      dispatch(actions.updateUser(data));
    } catch (error) {
      throw error;
    }
  };
};

export default usersSlice;
