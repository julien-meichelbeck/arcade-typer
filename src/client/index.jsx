// @flow

import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createSocketIoMiddleware from 'redux-socket.io'
import App from 'client/App'
import gameReducer from 'client/reducer/game'
import globalReducer from 'client/reducer/global'
import accountReducer from 'client/reducer/account'
import { APP_CONTAINER_SELECTOR } from 'shared/config'
import { isProd } from 'shared/utils'
import setUpSocket, { socket } from 'client/socket'

/* eslint-disable no-underscore-dangle */
const composeEnhancers = (isProd ? null : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
const preloadedState = window.__PRELOADED_STATE__
/* eslint-enable no-underscore-dangle */
const socketMiddleware = createSocketIoMiddleware(socket, 'TO_SERVER/')

const store = createStore(
  combineReducers(
    { account: accountReducer, game: gameReducer, global: globalReducer },
  ),
  preloadedState,
  composeEnhancers(
    applyMiddleware(thunkMiddleware),
    applyMiddleware(socketMiddleware),
  ),
)

const rootEl = document.querySelector(APP_CONTAINER_SELECTOR)

const wrapApp = (AppComponent, reduxStore) =>
  <Provider store={reduxStore}>
    <BrowserRouter>
      <AppContainer>
        <AppComponent />
      </AppContainer>
    </BrowserRouter>
  </Provider>

ReactDOM.render(wrapApp(App, store), rootEl)

if (module.hot) {
  // flow-disable-next-line
  module.hot.accept('client/App', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('client/App').default
    ReactDOM.render(wrapApp(NextApp, store), rootEl)
  })
}

setUpSocket(store)
