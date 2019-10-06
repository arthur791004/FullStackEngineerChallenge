import React, { useState, useEffect, useCallback } from 'react';
import { bool, func, node } from 'prop-types';
import styled, { css } from 'styled-components';

const activeCSS = css`
  opacity: 1;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalBody = styled.div`
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  background-color: white;
  text-align: left;
`;

const ModalContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease-out;

  ${props => props.isOpen && activeCSS};
`;

const Modal = ({ isOpen, children, handleClose }) => {
  const [shouldOpen, setShouldOpen] = useState(false);
  const deps = [isOpen, shouldOpen, setShouldOpen];
  const handleTransitionEnd = useCallback(() => {
    if (!isOpen && shouldOpen) {
      setShouldOpen(false);
    }
  }, deps);

  useEffect(() => {
    if (isOpen && !shouldOpen) {
      setShouldOpen(true);
    }
  }, deps);

  if (!(isOpen || shouldOpen)) {
    return null;
  }

  return (
    <ModalContainer
      isOpen={isOpen && shouldOpen}
      onTransitionEnd={handleTransitionEnd}
    >
      <ModalBackdrop onClick={handleClose} />
      <ModalBody>{children}</ModalBody>
    </ModalContainer>
  );
};

Modal.propTypes = {
  isOpen: bool,
  children: node.isRequired,
  handleClose: func.isRequired,
};

Modal.defaultProps = {
  isOpen: false,
};

export default Modal;
