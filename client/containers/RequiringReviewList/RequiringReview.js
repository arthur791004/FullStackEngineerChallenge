import React from 'react';
import styled from 'styled-components';
import { number, string } from 'prop-types';
import Rating from '@/components/Rating';
import Card from '@/components/Card';
import FeedbackButton from './FeedbackButton';

const Name = styled.div`
  margin: 0px 5px 15px;
  font-size: 16px;
`;

const Content = styled.div`
  margin: 15px 5px;
`;

const Container = styled(Card)`
  width: 400px;

  &:not(:first-child) {
    margin-top: 30px;
  }
`;

const RequiringReview = ({ reviewId, reviewee, rating, content }) => {
  const isRated = rating > 0;
  const text = isRated ? 'Edit Feedback' : 'Give Feedback';

  return (
    <Container>
      <Name>{reviewee}</Name>
      {isRated && (
        <>
          <Rating rating={rating} />
          <Content>{content}</Content>
        </>
      )}
      <FeedbackButton reviewId={reviewId}>{text}</FeedbackButton>
    </Container>
  );
};

RequiringReview.propTypes = {
  reviewId: number.isRequired,
  reviewee: string.isRequired,
  rating: number.isRequired,
  content: string.isRequired,
};

export default RequiringReview;
