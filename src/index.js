import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'

import reducer from './lib/state/reducer';
import saga from './lib/state/saga';

import App from './lib/components/App';
import './style/style.scss';

let preexistingState = localStorage.getItem('ifState');
if (preexistingState) {
  preexistingState = JSON.parse(preexistingState);
}

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer, preexistingState || {}, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(saga);

store.subscribe(() => {
  localStorage.setItem('ifState', JSON.stringify(store.getState()));
});

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));