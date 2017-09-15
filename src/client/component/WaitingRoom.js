import React from 'react'
import recompact from 'shared/modules/recompact'
import { absoluteUrl } from 'shared/utils'
import { gameRoute } from 'shared/routes'

export default recompact.compose(recompact.pluckObs(['gameId$']))(({ gameId }) => (
  <div>
    <h2>Waiting for another player</h2>
    <input readOnly value={absoluteUrl(gameRoute(gameId))} style={{ width: '100%', fontSize: '20px' }} />
  </div>
))
