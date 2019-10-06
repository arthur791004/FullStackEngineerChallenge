import React, { useState } from 'react';
import { bool, string, node, func } from 'prop-types';
import getErrorMessage from '@/utils/getErrorMessage';
import Button from '@/components/Button';
import TextButton from '@/components/Button/TextButton';
import Modal from '@/components/Modal';
import ModalActions from '@/components/Modal/ModalActions';
import ErrorMessage from '@/components/ErrorMessage';

const Dialog = ({
  title,
  children,
  disabled,
  confirmText,
  isOpen,
  handleConfirm,
  handleClose,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleClick = () => {
    if (isLoading) {
      return;
    }

    // set loading and clear error
    setIsLoading(true);
    setError(false);

    handleConfirm()
      .then(() => handleClose())
      .catch(err => setError(getErrorMessage(err)))
      .then(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      <h2>{title}</h2>
      {children}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <ModalActions>
        <Button isLoading={isLoading} disabled={disabled} onClick={handleClick}>
          {confirmText}
        </Button>
        <TextButton onClick={handleClose}>Cancel</TextButton>
      </ModalActions>
    </Modal>
  );
};

Dialog.propTypes = {
  title: string.isRequired,
  children: node.isRequired,
  disabled: bool,
  confirmText: string.isRequired,
  isOpen: bool.isRequired,
  handleConfirm: func.isRequired,
  handleClose: func.isRequired,
};

Dialog.defaultProps = {
  disabled: false,
};

export default Dialog;
