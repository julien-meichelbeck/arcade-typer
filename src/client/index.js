import 'babel-polyfill'
import React from 'react'
import { Switch } from 'react-router'
import { BrowserRouter, Route } from 'react-router-dom'
import { HOME_ROUTE, HISTORY_ROUTE, gameRoute } from 'shared/routes'
import Nav from 'client/component/Nav'
import HomePage from 'client/component/Home'
import GamePage from 'client/component/Game'
import HistoryPage from 'client/component/History'
import NotFoundPage from 'client/component/not-found'
import Container from 'client/component/Container'
import account from 'client/account'
import Rx from 'rxjs'
import recompact from 'shared/modules/recompact'
import { render } from 'react-dom'
import { APP_CONTAINER_SELECTOR } from 'shared/config'

const App = recompact.withObs(() => ({
  currentAccount$: new Rx.BehaviorSubject(account),
}))(() => (
  <BrowserRouter>
    <div>
      <Nav />
      <Container>
        <Switch>
          <Route path={gameRoute()} render={props => <GamePage gameId={props.match.params.gameId} />} />
          <Route exact path={HOME_ROUTE} render={() => <HomePage />} />
          <Route exact path={HISTORY_ROUTE} render={() => <HistoryPage />} />
          <Route component={NotFoundPage} />
        </Switch>
      </Container>
    </div>
  </BrowserRouter>
))

render(<App />, document.querySelector(APP_CONTAINER_SELECTOR))
