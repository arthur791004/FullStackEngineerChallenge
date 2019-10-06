import React from 'react';
import DropModal from '@/components/DropModal';
import Button from '@/components/Button';
import CreateReviewModal from './CreateReviewModal';

const CreateReviewButton = () => (
  <DropModal>
    {({ isOpen, handleOpen, handleClose }) => (
      <>
        <Button onClick={handleOpen}>Create Review</Button>
        <CreateReviewModal isOpen={isOpen} handleClose={handleClose} />
      </>
    )}
  </DropModal>
);

export default CreateReviewButton;
