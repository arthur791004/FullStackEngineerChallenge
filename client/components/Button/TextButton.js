import React from 'react';
import { func } from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  transition: opacity 0.3s ease-out;

  &:hover,
  &:active {
    opacity: 0.8;
  }
`;

const TextButton = ({ handleClick, ...props }) => (
  <StyledButton {...props} onClick={handleClick} />
);

TextButton.propTypes = {
  handleClick: func.isRequired,
};

export default TextButton;
