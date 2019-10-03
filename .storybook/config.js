import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import GlobalStyle from '@/components/GlobalStyle';

// automatically import all files ending in *.stories.js
const req = require.context('../client', true, /stories\.js$/);

const loadStories = () => {
  req.keys().forEach(filename => req(filename));
};

const withGlobalStyle = getStory => (
  <BrowserRouter>
    <GlobalStyle />
    {getStory()}
  </BrowserRouter>
);

configure(loadStories, module);

// add decorators
addDecorator(withKnobs);
addDecorator(withGlobalStyle);
