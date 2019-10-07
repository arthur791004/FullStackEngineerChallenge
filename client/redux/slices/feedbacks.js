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
const { actions } = feedbacksSlice;

export const getFeedbackListThunk = () => {
  return dispatch => {
    dispatch(actions.getList());

    return getFeedbacks()
      .then(({ data }) => dispatch(actions.setList(data)))
      .catch(error => dispatch(actions.setError(error)));
  };
};

export default feedbacksSlice;
