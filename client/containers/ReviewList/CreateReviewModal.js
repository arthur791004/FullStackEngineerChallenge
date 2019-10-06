import React, { useMemo, useState } from 'react';
import { bool, func } from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { createReviewThunk } from '@/redux/slices/reviews';
import { selectUserList } from '@/redux/slices/users';
import ModalLabel from '@/components/Modal/ModalLabel';
import Dropdown from '@/components/Dropdown';
import Dialog from '@/components/Dialog';

const SELECT_EMPLOYEE_MEESAGE = 'select an employee';

const CreateReviewModal = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch();
  const users = useSelector(selectUserList);
  const [reviewerId, setReviewerId] = useState('');
  const [revieweeId, setRevieweeId] = useState('');
  const selectReviewer = ({ target: { value } }) => setReviewerId(value);
  const selectReviewee = ({ target: { value } }) => setRevieweeId(value);
  const handleConfirm = () =>
    dispatch(
      createReviewThunk({
        reviewerId,
        revieweeId,
      })
    );

  const list = useMemo(
    () =>
      users.map(({ id, email }) => ({
        name: email,
        value: id,
      })),
    [users]
  );

  return (
    <Dialog
      title="Create New Review"
      confirmText="Create"
      disabled={!(reviewerId && revieweeId && reviewerId !== revieweeId)}
      isOpen={isOpen}
      handleConfirm={handleConfirm}
      handleClose={handleClose}
    >
      <ModalLabel>Choose reviewer</ModalLabel>
      <Dropdown
        list={list}
        message={SELECT_EMPLOYEE_MEESAGE}
        handleSelect={selectReviewer}
      />
      <ModalLabel>Choose Reviewee</ModalLabel>
      <Dropdown
        list={list}
        message={SELECT_EMPLOYEE_MEESAGE}
        handleSelect={selectReviewee}
      />
    </Dialog>
  );
};

CreateReviewModal.propTypes = {
  isOpen: bool.isRequired,
  handleClose: func.isRequired,
};

export default CreateReviewModal;
