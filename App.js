import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootreducers from './src/reducers/index';
import Router from './src/Router';

class App extends Component {
  render() {
    return (
    <Provider store={createStore(rootreducers, {}, applyMiddleware(ReduxThunk))}>
        <Router />
    </Provider>
  );
  }
}

export default App;
