import React, { Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import GlobalStyle from '@/components/GlobalStyle';
import Loading from '@/components/Loading';
import AuthRoute from '@/components/Route/AuthRoute';
import AuthAdmin from '@/components/Route/AuthAdmin';
import Nav from '@/containers/Nav';
import HomePage from '@/pages/HomePage/Lazy';
import LoginPage from '@/pages/LoginPage/Lazy';
import AdminPage from '@/pages/AdminPage/Lazy';
import NotFoundPage from '@/pages/NotFoundPage/Lazy';

const App = () => (
  <BrowserRouter>
    <GlobalStyle />
    <Nav />
    <Suspense fallback={<Loading />}>
      <Switch>
        <AuthRoute exact path="/" component={HomePage} />
        <AuthAdmin exact path="/admin" component={AdminPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/404" component={NotFoundPage} />
        <Redirect to="/404" />
      </Switch>
    </Suspense>
  </BrowserRouter>
);

export default hot(App);
