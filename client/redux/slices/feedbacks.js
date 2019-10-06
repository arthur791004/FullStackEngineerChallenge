import { createSlice, createSelector } from 'redux-starter-kit';
import { getFeedbacks } from '@/services/apis/me';
import normalize from '@/utils/normalize';
import getErrorMessage from '@/utils/getErrorMessage';

const feedbacksSlice = createSlice({
  slice: 'feedbacks',
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
export const selectFeedbacks = state => state.feedbacks;

export const selectFeedbackList = createSelector(
  selectFeedbacks,
  ({ list, byId }) =>
    list
      .map(reviewId => byId[reviewId])
      // only return reviewer has already gave feedback
      .filter(({ rating }) => rating > 0)
);

export const selectIsLoading = createSelector(
  selectFeedbacks,
  ({ isLoading }) => isLoading
);

export const selectError = createSelector(
  selectFeedbacks,
  ({ error }) => error || ''
);

/**
 * Thunks
 */
export const getFeedbackListThunk = () => {
  return async dispatch => {
    dispatch(feedbacksSlice.actions.getList());

    try {
      const { data } = await getFeedbacks();
      dispatch(feedbacksSlice.actions.setList(data));
    } catch (error) {
      dispatch(feedbacksSlice.actions.setError(getErrorMessage(error)));
    }
  };
};

export default feedbacksSlice;
