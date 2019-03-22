import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import {rootReducer} from 'store/reducers';
import {BASE_PATH} from 'utils/config';
import App from './App';
import 'theme/main.less';


const store = createStore(
  rootReducer,
  // composeWithDevTools(
    applyMiddleware(thunk)
  // )
);

ReactDOM.render(
  <Provider
    store={store}
  >
    <BrowserRouter
      basename={BASE_PATH}
    >
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
