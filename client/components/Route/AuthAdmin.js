import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { selectIsAdmin } from '@/redux/slices/auth';

const AuthRoute = props => {
  const isAdmin = useSelector(selectIsAdmin);

  if (!isAdmin) {
    return <Redirect to={{ pathname: '/' }} />;
  }

  return <Route {...props} />;
};

export default AuthRoute;
