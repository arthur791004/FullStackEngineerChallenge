import React from 'react';
import DropModal from '@/components/DropModal';
import Button from '@/components/Button';
import CreateEmployeeModal from './CreateEmployeeModal';

const CreateEmployeeButton = () => (
  <DropModal>
    {({ isOpen, handleOpen, handleClose }) => (
      <>
        <Button onClick={handleOpen}>Create Employee</Button>
        <CreateEmployeeModal isOpen={isOpen} handleClose={handleClose} />
      </>
    )}
  </DropModal>
);

export default CreateEmployeeButton;
