import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { BLACK, DARK_WHITE } from '@/styles/colors';
import { selectIsAdmin } from '@/redux/slices/auth';
import NavLink from './NavLink';
import NavUser from './NavUser';

const Logo = styled.h1`
  margin: 0 10px 0 0;
`;

const Stretch = styled.div`
  flex-grow: 1;
`;

const Container = styled.nav`
  display: flex;
  position: relative;
  height: 60px;
  padding: 0 20px;
  border-bottom: 1px solid ${DARK_WHITE};
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 10px 0px;
  line-height: 60px;
  color: ${BLACK};
  background-color: white;
`;

const Nav = () => {
  const isAdmin = useSelector(selectIsAdmin);

  return (
    <Container>
      <Logo>Perf Review</Logo>
      <NavLink to="/">Home</NavLink>
      {isAdmin && <NavLink to="/admin">Admin</NavLink>}
      <Stretch />
      <NavUser />
    </Container>
  );
};

export default Nav;
