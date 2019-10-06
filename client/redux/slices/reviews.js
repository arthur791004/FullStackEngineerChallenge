import { createSlice, createSelector } from 'redux-starter-kit';
import {
  getReviewList,
  createReview,
  deleteReview,
} from '@/services/apis/reviews';
import normalize from '@/utils/normalize';
import getErrorMessage from '@/utils/getErrorMessage';
import { selectUsers } from './users';

const reviewsSlice = createSlice({
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
      error: getErrorMessage(payload),
    }),
    addReview: (state, { payload: { data } }) => ({
      ...state,
      list: [data.id, ...state.list],
      byId: {
        ...state.byId,
        [data.id]: data,
      },
    }),
    deleteReview: (state, { payload: { data } }) => ({
      ...state,
      list: state.list.filter(id => id !== data.id),
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
const { actions } = reviewsSlice;

export const getReviewListThunk = () => {
  return async dispatch => {
    dispatch(actions.getList());

    try {
      const { data } = await getReviewList();
      dispatch(actions.setList(data));
    } catch (error) {
      dispatch(actions.setError(error));
    }
  };
};

export const createReviewThunk = review => {
  return async dispatch => {
    try {
      const { data } = await createReview(review);
      dispatch(actions.addReview(data));
    } catch (error) {
      throw error;
    }
  };
};

export const deleteReviewThunk = reviewId => {
  return async dispatch => {
    try {
      const { data } = await deleteReview(reviewId);
      dispatch(actions.deleteReview(data));
    } catch (error) {
      throw error;
    }
  };
};

export default reviewsSlice;
