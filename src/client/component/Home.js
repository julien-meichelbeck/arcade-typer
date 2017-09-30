import React from 'react'
import LoginForm from 'client/component/LoginForm'
import Button from 'client/component/Button'
import { Link } from 'react-router-dom'
import { gameRoute } from 'shared/routes'
import recompact from 'shared/modules/recompact'
import { withRouter } from 'react-router'
import provideObs from './Home.obs'

const games = window.__PRELOADED_STATE__.games

export default recompact.compose(
  withRouter,
  recompact.pluckObs(['currentAccount$']),
  recompact.connectObs(provideObs)
)(({ currentAccount, onCreateGame }) => (
  <div>
    {currentAccount ? (
      <div>
        <Button spaced primary onClick={onCreateGame}>
          Start a new game
        </Button>
        {games ? (
          <ul>
            {games.map(name => name.replace('games:', '')).map(gameId => (
              <li key={gameId}>
                <Link to={gameRoute(gameId)}>{gameId}</Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    ) : (
      <LoginForm />
    )}
  </div>
))
