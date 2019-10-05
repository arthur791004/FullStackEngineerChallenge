import React from 'react';
import styled from 'styled-components';
import LoginForm from '@/containers/LoginForm';

const Container = styled.div`
  position: relative;
  top: 30%;
  width: 400px;
  margin: 0 auto;
  transform: translateY(-30%);
`;

const LoginPage = () => (
  <Container>
    <LoginForm />
  </Container>
);

export default LoginPage;
