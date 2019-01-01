// Core
import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import { Spring } from 'react-spring';
import Select from 'react-select';

// Theme
import 'theme/init.less';
import { getStyles } from './helpers';
import { api } from './API';
import App from './App';


ReactDOM.render(
  <BrowserRouter
    basename='/movie-poster'
  >
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
