import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router'
import store from './redux';
import {history} from './redux/reducers';
import { Routes } from './routes';

ReactDOM.render(
  <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
