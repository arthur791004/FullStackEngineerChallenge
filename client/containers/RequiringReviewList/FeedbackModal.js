import React, { useState } from 'react';
import { number, bool, func } from 'prop-types';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { BLACK, GRAY } from '@/styles/colors';
import {
  selectRequiringReview,
  selectIsSending,
  sendReviewThunk,
} from '@/redux/slices/requiringReviews';
import Button from '@/components/Button';
import TextButton from '@/components/Button/TextButton';
import Modal from '@/components/Modal';
import ModalActions from '@/components/Modal/ModalActions';
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

const Label = styled.div`
  height: 22px;
  margin: 10px 0;
  line-height: 22px;
  font-size: 16px;
  font-weight: 500;
  color: ${BLACK};
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
  const isSending = useSelector(selectIsSending);
  const review = useSelector(selectRequiringReview(reviewId));
  const [rating, setRating] = useState(review.rating);
  const [content, setContent] = useState(review.content);

  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      <h2>{`Give Feedback to ${review.reviewee}`}</h2>
      <Label>Rating</Label>
      <Rating rating={rating} handleChange={setRating} />
      <Label>Reviews</Label>
      <Content>
        <Textarea
          maxLength={MAX_CONTENT_LENGTH}
          placeholder="Please write something"
          value={content}
          onChange={({ target: { value } }) => setContent(value)}
        />
        <Count>{`${content.length}/${MAX_CONTENT_LENGTH}`}</Count>
      </Content>
      <ModalActions>
        <Button
          isLoading={isSending}
          disabled={rating === 0}
          onClick={() =>
            !isSending &&
            dispatch(sendReviewThunk(reviewId, { rating, content })).then(() =>
              handleClose()
            )
          }
        >
          Send
        </Button>
        <TextButton onClick={handleClose}>Cancel</TextButton>
      </ModalActions>
    </Modal>
  );
};

FeedbackModal.propTypes = {
  reviewId: number.isRequired,
  isOpen: bool.isRequired,
  handleClose: func.isRequired,
};

export default FeedbackModal;
