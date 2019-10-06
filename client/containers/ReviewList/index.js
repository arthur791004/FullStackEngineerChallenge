import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectReviewList,
  selectIsLoading,
  selectError,
  getReviewListThunk,
} from '@/redux/slices/reviews';
import Table, {
  TableHeader,
  TableHead,
  TableRow,
  TableContent,
} from '@/components/Table';
import CreateReviewButton from './CreateReviewButton';
import Review from './Review';

const Headers = styled.div`
  margin-bottom: 20px;
`;

const Container = styled.div`
  border-radius: 4px;
  overflow: hidden;
`;

const ReviewList = () => {
  const reviewList = useSelector(selectReviewList);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReviewListThunk());
  }, [dispatch]);

  return (
    <Container>
      <Headers>
        <CreateReviewButton />
      </Headers>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead align="left">Reviewer</TableHead>
            <TableHead align="left">Reviewee</TableHead>
            <TableHead align="left">Rating</TableHead>
            <TableHead align="left">Feedback</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <tbody>
          <TableContent isLoading={isLoading} error={error}>
            {reviewList.map(({ id, reviewer, reviewee, rating, content }) => (
              <Review
                key={id}
                reviewId={id}
                reviewerName={reviewer.email}
                revieweeName={reviewee.email}
                rating={rating || 0}
                content={content || ''}
              />
            ))}
          </TableContent>
        </tbody>
      </Table>
    </Container>
  );
};

export default ReviewList;
