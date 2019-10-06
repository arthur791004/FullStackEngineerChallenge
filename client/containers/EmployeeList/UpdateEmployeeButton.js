import React from 'react';
import DropModal from '@/components/DropModal';
import TextButton from '@/components/Button/TextButton';
import UpdateEmployeeModal from './UpdateEmployeeModal';

const UpdateEmployeeButton = ({ ...user }) => (
  <DropModal>
    {({ isOpen, handleOpen, handleClose }) => (
      <>
        <TextButton onClick={handleOpen}>Edit</TextButton>
        <UpdateEmployeeModal
          user={user}
          isOpen={isOpen}
          handleClose={handleClose}
        />
      </>
    )}
  </DropModal>
);

export default UpdateEmployeeButton;
