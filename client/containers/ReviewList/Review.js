import React from 'react';
import { number, string } from 'prop-types';
import { DANGER } from '@/styles/colors';
import TextButton from '@/components/Button/TextButton';
import DropModal from '@/components/DropModal';
import Rating from '@/components/Rating';
import { TableRow, TableData } from '@/components/Table';
import DeleteReviewModal from './DeleteReviewModal';

const Review = ({ reviewId, reviewerName, revieweeName, rating, content }) => (
  <TableRow>
    <TableData>{reviewerName}</TableData>
    <TableData>{revieweeName}</TableData>
    <TableData>
      <Rating rating={rating} />
    </TableData>
    <TableData maxWidth="300">{content}</TableData>
    <TableData align="right">
      <DropModal>
        {({ isOpen, handleOpen, handleClose }) => (
          <>
            <TextButton color={DANGER} onClick={handleOpen}>
              Delete
            </TextButton>
            <DeleteReviewModal
              reviewId={reviewId}
              reviewerName={reviewerName}
              revieweeName={revieweeName}
              isOpen={isOpen}
              handleClose={handleClose}
            />
          </>
        )}
      </DropModal>
    </TableData>
  </TableRow>
);

Review.propTypes = {
  reviewId: number.isRequired,
  reviewerName: string.isRequired,
  revieweeName: string.isRequired,
  rating: number.isRequired,
  content: string.isRequired,
};

export default Review;
