import { bool, oneOf } from 'prop-types';
import styled, { css } from 'styled-components';
import { BLACK, LIGHT_BLACK } from '@/styles/colors';
import { sizes } from './utils';

const activeCSS = css`
  color: ${BLACK};

  &:after {
    transform: scaleX(1);
  }
`;

const Tab = styled.button.attrs(() => ({
  type: 'button',
}))`
  ${props => sizes(props.size)};

  position: relative;
  border: none;
  outline: none;
  color: ${LIGHT_BLACK};
  background-color: transparent;
  transition: color 0.3s ease-out;
  will-change: color;
  cursor: pointer;

  &:after {
    content: '';
    display: block;
    width: 50%;
    height: 3px;
    position: relative;
    margin: 10px auto 0;
    background-color: ${BLACK};
    transform: scaleX(0);
    transition: transform 0.15s ease-out;
  }

  &:hover,
  &:active {
    color: ${BLACK};
  }

  ${props => props.isActive && activeCSS};
`;

Tab.propTypes = {
  size: oneOf(['small', 'medium', 'large']),
  isActive: bool,
};

Tab.defaultProps = {
  size: 'medium',
  isActive: false,
};

export default Tab;
