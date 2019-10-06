import React, { useState, useCallback } from 'react';
import { number } from 'prop-types';
import Button from '@/components/Button';
import FeedbackModal from './FeedbackModal';

const FeedbackButton = ({ reviewId, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = useCallback(() => setIsOpen(true), [setIsOpen]);
  const handleClose = useCallback(() => setIsOpen(false), [setIsOpen]);

  return (
    <>
      <Button {...props} onClick={handleOpen} />
      <FeedbackModal
        reviewId={reviewId}
        isOpen={isOpen}
        handleClose={handleClose}
      />
    </>
  );
};

FeedbackButton.propTypes = {
  reviewId: number.isRequired,
};

export default FeedbackButton;
