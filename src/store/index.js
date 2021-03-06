import { AsyncStorage } from 'react-native';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
// eslint-disable-next-line
import { createLogger } from 'redux-logger';
import { autoRehydrate, persistStore } from 'redux-persist';
import api from './api';
import firebase from './firebase';
import reducers from '../reducers';

const middlewares = [
  api,
  firebase,
];

if (__DEV__ === true) {
  middlewares.push(createLogger({
    duration: true,
    timestamp: true,
    diff: true,
  }));
}

const appStore = {
  setStore(store) {
    appStore.store = store;
  },
  getStore() {
    return appStore.store;
  },
  createStore(onComplete: ?() => void) {
    const store = createStore(
      combineReducers(reducers),
      compose(
        applyMiddleware(...middlewares),
        autoRehydrate(),
      ),
    );

    persistStore(store, { storage: AsyncStorage }, onComplete);
    appStore.setStore(store);
    return store;
  },
};

export default appStore;
