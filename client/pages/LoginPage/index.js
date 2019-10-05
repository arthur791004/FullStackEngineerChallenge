import React from 'react';
import styled from 'styled-components';
import LoginForm from '@/containers/LoginForm';

const Container = styled.div`
  position: relative;
  top: 10%;
  width: 400px;
  margin: 100px auto;
  transform: translateY(-10%);
`;

const LoginPage = () => (
  <Container>
    <LoginForm />
  </Container>
);

export default LoginPage;
