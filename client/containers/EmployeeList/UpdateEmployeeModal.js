import React, { useState } from 'react';
import { bool, shape, string, number, func } from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateUserThunk } from '@/redux/slices/users';
import { ROLES } from '@/constants/users';
import ModalLabel from '@/components/Modal/ModalLabel';
import TextField from '@/components/TextField';
import Dropdown from '@/components/Dropdown';
import Dialog from '@/components/Dialog';

const CreateEmployeeModal = ({ user, isOpen, handleClose }) => {
  const dispatch = useDispatch();
  const [role, setRole] = useState(user.role);
  const changeRole = ({ target: { value } }) => setRole(value);
  const handleConfirm = () =>
    dispatch(
      updateUserThunk(user.id, {
        role,
      })
    );

  return (
    <Dialog
      title="Update Employee"
      confirmText="Update"
      disabled={role === user.role}
      isOpen={isOpen}
      handleConfirm={handleConfirm}
      handleClose={handleClose}
    >
      <TextField
        label="Email"
        type="email"
        name="email"
        value={user.email}
        disabled
      />
      <ModalLabel>Choose Role</ModalLabel>
      <Dropdown
        list={Object.entries(ROLES).map(([key, value]) => ({
          name: key.toLowerCase(),
          value,
        }))}
        message="select role"
        defaultValue={role}
        handleSelect={changeRole}
      />
    </Dialog>
  );
};

CreateEmployeeModal.propTypes = {
  user: shape({
    id: string.isRequired,
    email: string.isRequired,
    role: number.isRequired,
  }).isRequired,
  isOpen: bool.isRequired,
  handleClose: func.isRequired,
};

export default CreateEmployeeModal;
