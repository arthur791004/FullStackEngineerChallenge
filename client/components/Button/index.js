import React from 'react';
import { bool, node } from 'prop-types';
import styled, { css } from 'styled-components';
import { BLACK } from '@/styles/colors';

const loadingCSS = css`
  opacity: 0.8;
  cursor: progress;
`;

const StyledButton = styled.button`
  position: relative;
  height: 42px;
  padding: 0 25px;
  border-radius: 21px;
  line-height: 42px;
  font-size: 16px;
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
  isLoading: bool,
};

Button.defaultProps = {
  isLoading: false,
};

export default Button;
