import React from 'react'
import recompact from 'shared/modules/recompact'
import GameText from 'client/component/GameText'
import GameTrack from 'client/component/GameTrack'
import GameInput from 'client/component/GameInput'
import { socket, gameState$ } from 'client/socket'
import provideObs from './Game.obs'

export default recompact.compose(
  recompact.setDisplayName('Game'),
  recompact.lifecycle({
    componentWillMount() {
      socket.emit('action', {
        type: 'JOIN_GAME',
        payload: {
          player: window.__PRELOADED_STATE__.account,
          gameId: this.props.gameId,
        },
      })
    },
  }),
  // recompact.connectObs(({ reload$ }) => ({
  //   key: reload$.scan(reloadCount => reloadCount + 1, 0),
  // })),
  recompact.connectObs(() => ({ gameState: gameState$ })),
  recompact.branch(({ gameState }) => !gameState, recompact.renderNothing),
  recompact.withObs(provideObs),
)(() => (
  <div style={{ width: '100%' }}>
    <GameTrack />
    <GameText />
    <GameInput />
  </div>
))
