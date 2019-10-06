import React from 'react';
import { number, bool, string, func } from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteReviewThunk } from '@/redux/slices/reviews';
import ModalLabel from '@/components/Modal/ModalLabel';
import Dialog from '@/components/Dialog';

const DeleteReviewModal = ({
  reviewId,
  reviewerName,
  revieweeName,
  isOpen,
  handleClose,
}) => {
  const dispatch = useDispatch();
  const handleConfirm = () => dispatch(deleteReviewThunk(reviewId));

  return (
    <Dialog
      title="Delete Review"
      confirmText="Delete"
      isOpen={isOpen}
      handleConfirm={handleConfirm}
      handleClose={handleClose}
    >
      <h3>Are you sure to delete this review ?</h3>
      <ModalLabel>{`Reviewer: ${reviewerName}`}</ModalLabel>
      <ModalLabel>{`Reviewee: ${revieweeName}`}</ModalLabel>
    </Dialog>
  );
};

DeleteReviewModal.propTypes = {
  reviewId: number.isRequired,
  reviewerName: string.isRequired,
  revieweeName: string.isRequired,
  isOpen: bool.isRequired,
  handleClose: func.isRequired,
};

export default DeleteReviewModal;
