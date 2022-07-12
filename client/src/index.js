import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {applyMiddleware, createStore} from 'redux';
import {CookiesProvider} from 'react-cookie';
import { Provider } from 'react-redux';

import rootReducer from './reducers';

import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from "redux-thunk";

const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk, logger))
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <CookiesProvider>
        <Provider store={store}>
            <App />
        </Provider>
    </CookiesProvider>
);
