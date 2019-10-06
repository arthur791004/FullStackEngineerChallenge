import React from 'react';
import { number, string, shape } from 'prop-types';
import { DANGER } from '@/styles/colors';
import TextButton from '@/components/Button/TextButton';
import Rating from '@/components/Rating';
import { TableRow, TableData } from '@/components/Table';

const Review = ({ reviewer, reviewee, rating, feedback }) => (
  <TableRow>
    <TableData>{reviewer.email}</TableData>
    <TableData>{reviewee.email}</TableData>
    <TableData>
      <Rating rating={rating} />
    </TableData>
    <TableData>{feedback}</TableData>
    <TableData align="right">
      <TextButton color={DANGER}>Delete</TextButton>
    </TableData>
  </TableRow>
);

Review.propTypes = {
  reviewer: shape({
    email: string,
  }).isRequired,
  reviewee: shape({
    email: string,
  }).isRequired,
  rating: number.isRequired,
  feedback: string.isRequired,
};

export default Review;
