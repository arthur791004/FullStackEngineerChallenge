import React, { useState } from 'react';
import { number, bool, func } from 'prop-types';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { GRAY } from '@/styles/colors';
import {
  selectRequiringReview,
  sendReviewThunk,
} from '@/redux/slices/requiringReviews';
import ModalLabel from '@/components/Modal/ModalLabel';
import Dialog from '@/components/Dialog';
import Rating from '@/components/Rating';

const MAX_CONTENT_LENGTH = 100;

const Textarea = styled.textarea`
  flex-grow: 1;
  padding: 0;
  border: none;
  outline: none;
  margin-bottom: 12px;
  font-size: 14px;
  line-height: 1.5;
  resize: none;

  &::placeholder {
    color: #4a4a4a;
  }

  &:focus::placeholder {
    color: transparent;
  }
`;

const Count = styled.span`
  color: ${GRAY};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 168px;
  padding: 12px;
  border: 1px solid ${GRAY};
  border-radius: 4px;
  background-color: white;
`;

const FeedbackModal = ({ reviewId, isOpen, handleClose }) => {
  const dispatch = useDispatch();
  const { reviewee, ...review } = useSelector(selectRequiringReview(reviewId));
  const [rating, setRating] = useState(review.rating || 0);
  const [content, setContent] = useState(review.content || '');
  const handleConfirm = () =>
    dispatch(sendReviewThunk(reviewId, { rating, content }));

  return (
    <Dialog
      title={`Give Feedback to ${reviewee.email}`}
      disabled={rating === 0}
      confirmText="Send"
      isOpen={isOpen}
      handleConfirm={handleConfirm}
      handleClose={handleClose}
    >
      <ModalLabel>Rating</ModalLabel>
      <Rating rating={rating} handleChange={setRating} />
      <ModalLabel>Reviews</ModalLabel>
      <Content>
        <Textarea
          maxLength={MAX_CONTENT_LENGTH}
          placeholder="Please write something"
          value={content}
          onChange={({ target: { value } }) => setContent(value)}
        />
        <Count>{`${content.length}/${MAX_CONTENT_LENGTH}`}</Count>
      </Content>
    </Dialog>
  );
};

FeedbackModal.propTypes = {
  reviewId: number.isRequired,
  isOpen: bool.isRequired,
  handleClose: func.isRequired,
};

export default FeedbackModal;
