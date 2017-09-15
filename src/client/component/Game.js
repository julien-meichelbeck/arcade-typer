import React from 'react'
import recompact from 'shared/modules/recompact'
import GameText from 'client/component/GameText'
import GameTrack from 'client/component/GameTrack'
import WaitingRoom from 'client/component/WaitingRoom'
import GameInput from 'client/component/GameInput'
import { joinGame, leaveGame } from 'client/socketApi'
import { gameState$ } from 'client/socket'
import ReadyCheck from 'client/component/ReadyCheck'
import { WAITING_ROOM, READY_CHECK } from 'shared/statuses'
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
  }),
  // recompact.connectObs(({ reload$ }) => ({
  //   key: reload$.scan(reloadCount => reloadCount + 1, 0),
  // })),
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
