import React, { Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import GlobalStyle from '@/components/GlobalStyle';
import Loading from '@/components/Loading';
import HomePage from '@/pages/HomePage/Lazy';
import NotFoundPage from '@/pages/NotFoundPage/Lazy';

const App = () => (
  <BrowserRouter>
    <GlobalStyle />
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/404" component={NotFoundPage} />
        <Redirect to="/404" />
      </Switch>
    </Suspense>
  </BrowserRouter>
);

export default hot(App);
