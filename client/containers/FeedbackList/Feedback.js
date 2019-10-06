import React from 'react';
import styled from 'styled-components';
import { number, string, shape } from 'prop-types';
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

const Feedback = ({ reviewer, rating, content }) => {
  return (
    <Container>
      <Name>{reviewer.email}</Name>
      <Rating rating={rating} />
      <Content>{content}</Content>
    </Container>
  );
};

Feedback.propTypes = {
  reviewer: shape({
    email: string.isRequired,
  }).isRequired,
  rating: number.isRequired,
  content: string.isRequired,
};

export default Feedback;
