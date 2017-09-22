import React from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'
import { HOME_ROUTE, gameRoute } from 'shared/routes'
import Nav from 'client/component/Nav'
import HomePage from 'client/component//Home'
import GamePage from 'client/component//Game'
import NotFoundPage from 'client/component//not-found'
import Container from 'client/component/Container'
import account from 'client/account'
import Rx from 'rxjs'
import recompact from 'shared/modules/recompact'

export default recompact.withObs(() => ({
  currentAccount$: new Rx.BehaviorSubject(account),
}))(() => (
  <div>
    <Nav />
    <Container>
      <Switch>
        <Route path={gameRoute()} render={props => <GamePage gameId={props.match.params.gameId} />} />
        <Route exact path={HOME_ROUTE} render={() => <HomePage />} />
        <Route component={NotFoundPage} />
      </Switch>
    </Container>
  </div>
))
