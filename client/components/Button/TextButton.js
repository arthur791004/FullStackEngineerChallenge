import React from 'react';
import { string, oneOf } from 'prop-types';
import styled from 'styled-components';
import { BLACK } from '@/styles/colors';
import { sizes } from './utils';

const StyledButton = styled.button`
  ${props => sizes(props.size)};

  border: none;
  outline: none;
  color: ${props => props.color};
  background-color: transparent;
  cursor: pointer;
  transition: background-color 0.3s ease-out;
  will-change: background-color;

  &:hover,
  &:active {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;

const TextButton = ({ size, ...props }) => (
  <StyledButton {...props} size={size} />
);

TextButton.propTypes = {
  size: oneOf(['small', 'medium', 'large']),
  color: string,
};

TextButton.defaultProps = {
  size: 'medium',
  color: BLACK,
};

export default TextButton;
