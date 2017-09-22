import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import App from 'client/App'
import { APP_CONTAINER_SELECTOR } from 'shared/config'

render(
  <BrowserRouter>
    <AppContainer>
      <App />
    </AppContainer>
  </BrowserRouter>,
  document.querySelector(APP_CONTAINER_SELECTOR),
)
