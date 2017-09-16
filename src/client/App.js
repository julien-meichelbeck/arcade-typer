import React from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'
import { HOME_ROUTE, GAME_START_ROUTE, gameRoute } from 'shared/routes'
import Nav from 'client/component/Nav'
import HomePage from 'client/component/Home'
import Game from 'client/component/Game'
import GameStart from 'client/component/GameStart'
import NotFoundPage from 'client/component/not-found'
import Container from 'client/component/Container'

const App = () => (
  <div>
    <Nav />
    <Container>
      <Switch>
        <Route path={gameRoute()} render={props => <Game gameId={props.match.params.gameId} />} />
        <Route exact path={HOME_ROUTE} render={() => <HomePage />} />
        <Route exact path={GAME_START_ROUTE} render={() => <GameStart />} />
        <Route component={NotFoundPage} />
      </Switch>
    </Container>
  </div>
)

export default App
