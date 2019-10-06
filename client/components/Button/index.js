import React from 'react';
import { bool, node, oneOf } from 'prop-types';
import styled, { css } from 'styled-components';
import { BLACK } from '@/styles/colors';
import { sizes } from './utils';

const loadingCSS = css`
  opacity: 0.8;
  cursor: progress;
`;

const StyledButton = styled.button`
  ${props => sizes(props.size)};

  position: relative;
  color: white;
  background-color: ${BLACK};
  outline: none;
  cursor: pointer;
  transition: opacity 0.3s ease-out;

  &:hover,
  &:active {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${props => props.isLoading && loadingCSS};
`;

const Button = ({ children, isLoading, ...props }) => (
  <StyledButton {...props} isLoading={isLoading}>
    {children}
  </StyledButton>
);

Button.propTypes = {
  children: node.isRequired,
  size: oneOf(['small', 'medium', 'large']),
  isLoading: bool,
};

Button.defaultProps = {
  size: 'medium',
  isLoading: false,
};

export default Button;
