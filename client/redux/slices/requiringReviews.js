import { createSlice, createSelector } from 'redux-starter-kit';
import { getRequiringReviews } from '@/services/apis/me';
import normalize from '@/utils/normalize';
import getErrorMessage from '@/utils/getErrorMessage';

const requiringReviewsSlice = createSlice({
  slice: 'requiringReviews',
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
export const selectRequiringReviews = state => state.requiringReviews;

export const selectRequiringReviewList = createSelector(
  selectRequiringReviews,
  ({ list, byId }) => list.map(reviewId => byId[reviewId])
);

export const selectIsLoading = createSelector(
  selectRequiringReviews,
  ({ isLoading }) => isLoading
);

export const selectError = createSelector(
  selectRequiringReviews,
  ({ error }) => error || ''
);

/**
 * Thunks
 */
export const getRequiringReviewListThunk = () => {
  return async dispatch => {
    dispatch(requiringReviewsSlice.actions.getList());

    try {
      const { data } = await getRequiringReviews();
      dispatch(requiringReviewsSlice.actions.setList(data));
    } catch (error) {
      dispatch(requiringReviewsSlice.actions.setError(getErrorMessage(error)));
    }
  };
};

export default requiringReviewsSlice;
