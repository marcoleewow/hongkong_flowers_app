import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import createStore from './store/createStore';
import App from './App';

export default function setup() {
  return class Root extends PureComponent {
    state = {
      store: createStore(),
    }

    render() {
      return (
        <Provider store={this.state.store}>
          <App />
        </Provider>
      );
    }
  };
}

// eslint-disable-next-line
console.ignoredYellowBox = ['Remote debugger'];
