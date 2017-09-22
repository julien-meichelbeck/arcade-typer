import React from 'react'
import LoginForm from 'client/component/LoginForm'
import { Link } from 'react-router-dom'
import { gameRoute } from 'shared/routes'

const games = window.__PRELOADED_STATE__.games

export default () => (
  <div>
    <LoginForm />
    {games ? (
      <ul>
        {games.map(name => name.replace('games:', '')).map(gameId => (
          <li>
            <Link to={gameRoute(gameId)}>{gameId}</Link>
          </li>
        ))}
      </ul>
    ) : null}
  </div>
)
