import React from 'react'
import recompact from 'shared/modules/recompact'
import { joinGame, leaveGame } from 'client/socketApi'
import { gameState$ } from 'client/socket'
import { WAITING_ROOM, READY_CHECK } from 'shared/statuses'
import GameText from 'client/component/GameText'
import GameTrack from 'client/component/GameTrack'
import WaitingRoom from 'client/component/WaitingRoom'
import GameInput from 'client/component/GameInput'
import ReadyCheck from 'client/component/ReadyCheck'
import provideObs from './Game.obs'

export default recompact.compose(
  recompact.setDisplayName('Game'),
  recompact.lifecycle({
    componentWillMount() {
      joinGame(this.props.gameId)
    },
    componentWillUnmount() {
      leaveGame(this.props.gameId)
    },
    componentWillReceiveProps({ gameId }) {
      if (gameId !== this.props.gameId) {
        leaveGame(this.props.gameId)
        joinGame(gameId)
      }
    },
  }),
  recompact.connectObs(() => ({ gameState: gameState$ })),
  recompact.branch(({ gameState }) => !gameState, recompact.renderNothing),
  recompact.withObs(provideObs),
  recompact.connectObs(() => ({ gameStatus: gameState$.pluck('status') })),
)(({ gameStatus }) => (
  <div style={{ width: '100%' }}>
    <GameTrack />
    {{
      [WAITING_ROOM]: <WaitingRoom />,
      [READY_CHECK]: <ReadyCheck />,
    }[gameStatus] || (
      <div>
        <GameText />
        <GameInput />
      </div>
    )}
  </div>
))
