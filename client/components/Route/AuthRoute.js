import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { selectAuthInfo } from '@/redux/slices/auth';

const AuthRoute = props => {
  const { isAuthed } = useSelector(selectAuthInfo);

  if (!isAuthed) {
    return <Redirect to={{ pathname: '/login' }} />;
  }

  return <Route {...props} />;
};

export default AuthRoute;
