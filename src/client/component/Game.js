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
  recompact.pluckObs(['currentAccount$']),
  recompact.lifecycle({
    componentWillMount() {
      const { gameId, currentAccount: player } = this.props
      joinGame({ gameId, player })
    },
    componentWillUnmount() {
      const { gameId, currentAccount: player } = this.props
      leaveGame({ gameId, player })
    },
    componentWillReceiveProps({ gameId }) {
      if (gameId !== this.props.gameId) {
        const { currentAccount: player } = this.props
        leaveGame({ gameId: this.props.gameId, player })
        joinGame({ gameId })
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
