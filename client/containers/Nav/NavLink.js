import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BLACK } from '@/styles/colors';

const StyledLink = styled(Link)`
  margin: 0 12px;
  font-size: 14px;
  line-height: inherit;
  color: ${BLACK};
  transition: opacity 0.15s ease-out;

  &:hover,
  &:active {
    opacity: 0.8;
  }
`;

const NavLink = props => <StyledLink {...props} />;

export default NavLink;
