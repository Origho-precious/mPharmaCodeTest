import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './index.css';
import App from './App';
import CssBaseline from '@material-ui/core/CssBaseline';

import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <CssBaseline/>
    <App />
  </Provider>,
  document.getElementById('root')
);

