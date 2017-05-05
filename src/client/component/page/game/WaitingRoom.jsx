import React from 'react'
import recompact from 'shared/modules/recompact'
import { absoluteUrl } from 'shared/utils'
import { gameRoute } from 'shared/routes'

export default recompact.compose(
  recompact.branch(
    ({ game }) => false && game.players.length < 2,
    () => ({ game }) =>
      <div>
        <h2>Waiting for another player</h2>
        <input
          readOnly
          value={absoluteUrl(gameRoute(game.id))}
          style={{ width: '100%', fontSize: '20px' }}
        />
      </div>,
  ),
)
