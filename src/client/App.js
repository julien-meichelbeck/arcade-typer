import React from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'
import { HOME_ROUTE, gameRoute } from 'shared/routes'
import Nav from 'client/component/Nav'
import HomePage from 'client/component//Home'
import GamePage from 'client/component//Game'
import NotFoundPage from 'client/component//not-found'
import Container from 'client/component/Container'

const App = () => (
  <div>
    <Nav />
    <Container>
      <Switch>
        <Route path={gameRoute()} render={props => <GamePage gameId={props.match.params.id} />} />
        <Route exact path={HOME_ROUTE} render={() => <HomePage />} />
        <Route component={NotFoundPage} />
      </Switch>
    </Container>
  </div>
)

export default App
