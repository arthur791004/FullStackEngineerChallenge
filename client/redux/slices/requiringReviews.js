import { createSlice, createSelector } from 'redux-starter-kit';
import { getRequiringReviews } from '@/services/apis/me';
import { sendReview } from '@/services/apis/reviews';
import normalize from '@/utils/normalize';
import getErrorMessage from '@/utils/getErrorMessage';

const requiringReviewsSlice = createSlice({
  slice: 'requiringReviews',
  initialState: {
    list: [],
    byId: {},
    error: null,
    isLoading: true,
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
    sendReviewSucceeded: (state, { payload: { data } }) => ({
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
export const selectRequiringReviews = state => state.requiringReviews;

export const selectRequiringReviewList = createSelector(
  selectRequiringReviews,
  ({ list, byId }) => list.map(reviewId => byId[reviewId])
);

export const selectRequiringReview = reviewId =>
  createSelector(
    selectRequiringReviews,
    ({ byId }) => byId[reviewId]
  );

export const selectIsLoading = createSelector(
  selectRequiringReviews,
  ({ isLoading }) => isLoading
);

export const selectError = createSelector(
  selectRequiringReviews,
  ({ error }) => error || ''
);

export const selectIsSending = createSelector(
  selectRequiringReviews,
  ({ isSending }) => isSending
);

/**
 * Thunks
 */
const { actions } = requiringReviewsSlice;

export const getRequiringReviewListThunk = () => {
  return dispatch => {
    dispatch(actions.getList());

    return getRequiringReviews()
      .then(({ data }) => dispatch(actions.setList(data)))
      .catch(error => dispatch(actions.setError(error)));
  };
};

export const sendReviewThunk = (reviewId, review) => {
  return dispatch => {
    return sendReview(reviewId, review).then(({ data }) =>
      dispatch(actions.sendReviewSucceeded(data))
    );
  };
};

export default requiringReviewsSlice;
