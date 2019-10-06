import { useState, useCallback } from 'react';
import { func } from 'prop-types';

const DropModal = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = useCallback(() => setIsOpen(true), [setIsOpen]);
  const handleClose = useCallback(() => setIsOpen(false), [setIsOpen]);

  return children({ isOpen, handleOpen, handleClose });
};

DropModal.propTypes = {
  children: func.isRequired,
};

export default DropModal;
