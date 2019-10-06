import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectFeedbackList,
  selectIsLoading,
  selectError,
  getFeedbackListThunk,
} from '@/redux/slices/feedbacks';
import List from '@/components/List';
import Empty from '@/components/Empty';
import RequiringReview from './Feedback';

const Container = styled.div`
  position: relative;
`;

const FeedbackList = () => {
  const feedbackList = useSelector(selectFeedbackList);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedbackListThunk());
  }, [dispatch]);

  return (
    <Container>
      <List isLoading={isLoading} error={error}>
        {feedbackList.length > 0 ? (
          feedbackList.map(({ id, ...review }) => (
            <RequiringReview {...review} key={id} />
          ))
        ) : (
          <Empty>No feedbacks from other employee</Empty>
        )}
      </List>
    </Container>
  );
};

export default FeedbackList;
