import { createSlice, createSelector } from 'redux-starter-kit';
import { getReviewList } from '@/services/apis/reviews';
import normalize from '@/utils/normalize';
import getErrorMessage from '@/utils/getErrorMessage';
import { selectUsers } from './users';

const usersSlice = createSlice({
  slice: 'reviews',
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
      list: data.map(review => review.id),
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
export const selectReviews = state => state.reviews;

export const selectReviewList = createSelector(
  selectReviews,
  selectUsers,
  ({ list, byId }, { byId: usersById }) =>
    list.map(reviewId => {
      const { reviewerId, revieweeId, ...review } = byId[reviewId];

      return {
        ...review,
        reviewer: usersById[reviewerId],
        reviewee: usersById[revieweeId],
      };
    })
);

export const selectIsLoading = createSelector(
  selectReviews,
  ({ isLoading }) => isLoading
);

export const selectError = createSelector(
  selectReviews,
  ({ error }) => error || ''
);

/**
 * Thunks
 */
export const getReviewListThunk = () => {
  return async dispatch => {
    dispatch(usersSlice.actions.getList());

    try {
      const { data } = await getReviewList();
      dispatch(usersSlice.actions.setList(data));
    } catch (error) {
      dispatch(usersSlice.actions.setError(getErrorMessage(error)));
    }
  };
};

export default usersSlice;
