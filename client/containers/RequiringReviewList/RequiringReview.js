import React from 'react';
import styled from 'styled-components';
import { number, string } from 'prop-types';
import Button from '@/components/Button';
import Rating from '@/components/Rating';
import Card from '@/components/Card';

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

const RequiringReview = ({ reviewee, rating, content }) => {
  const isReviewed = rating > 0;

  return (
    <Container>
      <Name>{reviewee}</Name>
      {isReviewed && (
        <>
          <Rating rating={rating} />
          <Content>{content}</Content>
        </>
      )}
      <Button>{isReviewed ? 'Edit Feedback' : 'Give Feedback'}</Button>
    </Container>
  );
};

RequiringReview.propTypes = {
  reviewee: string.isRequired,
  rating: number.isRequired,
  content: string.isRequired,
};

export default RequiringReview;
