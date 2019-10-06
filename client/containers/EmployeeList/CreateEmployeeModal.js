import React, { useState } from 'react';
import { bool, func } from 'prop-types';
import { useDispatch } from 'react-redux';
import { createUserThunk } from '@/redux/slices/users';
import { ROLES } from '@/constants/users';
import ModalLabel from '@/components/Modal/ModalLabel';
import TextField from '@/components/TextField';
import Dropdown from '@/components/Dropdown';
import Dialog from '@/components/Dialog';

const CreateEmployeeModal = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(ROLES.NORMAL);
  const changeEmail = ({ target: { value } }) => setEmail(value);
  const changePassword = ({ target: { value } }) => setPassword(value);
  const changeRole = ({ target: { value } }) => setRole(value);
  const handleConfirm = () =>
    dispatch(
      createUserThunk({
        email,
        password,
        role,
      })
    );

  return (
    <Dialog
      title="Create New Employee"
      confirmText="Create"
      disabled={!(email && password)}
      isOpen={isOpen}
      handleConfirm={handleConfirm}
      handleClose={handleClose}
    >
      <TextField
        label="Email"
        type="email"
        name="email"
        value={email}
        autoFocus
        onChange={changeEmail}
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={password}
        onChange={changePassword}
      />
      <ModalLabel>Choose Role</ModalLabel>
      <Dropdown
        list={Object.entries(ROLES).map(([key, value]) => ({
          name: key.toLowerCase(),
          value,
        }))}
        message="select role"
        handleSelect={changeRole}
      />
    </Dialog>
  );
};

CreateEmployeeModal.propTypes = {
  isOpen: bool.isRequired,
  handleClose: func.isRequired,
};

export default CreateEmployeeModal;
