import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {
  applyMiddleware,
  createStore,
} from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage';
import axios, { AxiosRequestConfig } from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { reducer } from './reducers/reducer';
import Layout from './layouts/Layout';
import Loading from './components/Loading';
import './style.scss';

declare const API_KEY: string;
declare const API_URL: string;

const middleware = applyMiddleware(thunk);
const persistConfig = {
  key: 'root',
  storage,
  
}
const persistedReducer = persistReducer(persistConfig, reducer)
const store = createStore(persistedReducer, middleware);
const persistor = persistStore(store);
library.add(fas, far);
console.log(API_URL, API_KEY);
axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
  const separator = config.url.includes('?') ? '&' : '?';
  config.url = `${API_URL || ''}${config.url}${separator}access_key=${API_KEY}`;
  return config;
});

ReactDOM.render((
  <Provider store={store}>
    <PersistGate loading={(
        <Loading />
      )} persistor={persistor}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </PersistGate>
  </Provider>
), document.getElementById('app'));
