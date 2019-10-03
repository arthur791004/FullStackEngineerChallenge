import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const container = document.getElementById('root');
const render = () => {
  ReactDOM.render(<App />, container);
};

render();
