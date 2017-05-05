// @flow

import React from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'
import {
  HOME_ROUTE,
  PLAY_ROUTE,
  gameRoute,
} from 'shared/routes'
import Nav from 'client/component/Nav'
import HomePage from 'client/component/page/Home'
import GamePage from 'client/component/page/Game'
import NotFoundPage from 'client/component/page/not-found'

const App = () =>
  <div>
    <Nav />
    <div style={{ width: '80%', margin: 'auto' }}>
      <Switch>
        <Route
          path={gameRoute()}
          render={props => <GamePage game={{ id: props.match.params.id }} />}
        />
        <Route exact path={PLAY_ROUTE} render={() => <GamePage />} />
        <Route exact path={HOME_ROUTE} render={() => <HomePage />} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </div>

export default App
