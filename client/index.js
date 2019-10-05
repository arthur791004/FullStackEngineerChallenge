import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { initAuthThunk } from './redux/slices/auth';
import App from './App';

const container = document.getElementById('root');
const render = () => {
  const app = (
    <Provider store={store}>
      <App />
    </Provider>
  );

  store
    .dispatch(initAuthThunk())
    .catch(() => {})
    .then(() => {
      ReactDOM.render(app, container);
    });
};

render();
