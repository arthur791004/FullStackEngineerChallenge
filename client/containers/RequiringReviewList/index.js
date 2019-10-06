import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectRequiringReviewList,
  selectIsLoading,
  selectError,
  getRequiringReviewListThunk,
} from '@/redux/slices/requiringReviews';
import List from '@/components/List';
import RequiringReview from './RequiringReview';

const Container = styled.div`
  position: relative;
`;

const RequiringReviewList = () => {
  const requiringReviewList = useSelector(selectRequiringReviewList);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRequiringReviewListThunk());
  }, [dispatch]);

  return (
    <Container>
      <List isLoading={isLoading} error={error}>
        {requiringReviewList.map(({ id, ...review }) => (
          <RequiringReview {...review} key={id} />
        ))}
      </List>
    </Container>
  );
};

export default RequiringReviewList;
