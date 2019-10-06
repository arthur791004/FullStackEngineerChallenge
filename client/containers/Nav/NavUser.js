import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { selectAuthUser, logoutThunk } from '@/redux/slices/auth';
import TextButton from '@/components/Button/TextButton';

const Text = styled.span`
  margin-right: 10px;
`;

const Container = styled.div`
  margin-left: 10px;
`;

const NavUser = () => {
  const user = useSelector(selectAuthUser);
  const dispatch = useDispatch();
  const logout = useCallback(() => dispatch(logoutThunk()), []);

  if (!user) {
    return null;
  }

  return (
    <Container>
      <Text>{user.email}</Text>
      <TextButton size="small" handleClick={logout}>
        Logout
      </TextButton>
    </Container>
  );
};

export default NavUser;
