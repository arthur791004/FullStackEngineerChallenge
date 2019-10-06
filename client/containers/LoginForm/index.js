import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginThunk, selectAuthInfo } from '@/redux/slices/auth';
import Button from '@/components/Button';
import TextField from '@/components/TextField';
import ErrorMessage from '@/components/ErrorMessage';

const Form = styled.form`
  position: relative;
  padding: 30px;
  background-color: white;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 10px 0px;
`;

const Title = styled.h2`
  margin-top: 0;
`;

const LoginForm = () => {
  const { isAuthed, isLoading, error } = useSelector(selectAuthInfo);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const disabled = !(email && password);
  const changeEmail = useCallback(e => setEmail(e.target.value), [setEmail]);
  const changePassword = useCallback(e => setPassword(e.target.value), [
    setPassword,
  ]);
  const handleLogin = useCallback(
    e => {
      e.preventDefault();
      dispatch(loginThunk(email, password));
    },
    [email, password]
  );

  if (isAuthed) {
    return <Redirect to={{ pathname: '/' }} />;
  }

  return (
    <Form onSubmit={handleLogin}>
      <Title>Login</Title>
      <TextField
        label="Email"
        type="email"
        name="email"
        value={email}
        autoFocus
        onChange={changeEmail}
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={password}
        onChange={changePassword}
      />
      <ErrorMessage>{error || ''}</ErrorMessage>
      <div>
        <Button
          type="submit"
          size="large"
          disabled={disabled}
          isLoading={isLoading}
        >
          Login
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
