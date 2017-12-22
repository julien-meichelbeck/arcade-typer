import React from 'react'
import recompact from 'shared/modules/recompact'
import { joinGame, leaveGame, sendPlayerState } from 'client/socketApi'
import { gameState$ } from 'client/socket'
import { WAITING_ROOM, READY_CHECK } from 'shared/statuses'
import GameText from 'client/component/GameText'
import GameTrack from 'client/component/GameTrack'
import WaitingRoom from 'client/component/WaitingRoom'
import GameLoginForm from 'client/component/GameLoginForm'
import GameInput from 'client/component/GameInput'
import ReadyCheck from 'client/component/ReadyCheck'
import provideObs from './Game.obs'

const onPlayerReady = ({ gameId, currentPlayer }) => e => {
  if (e.code === 'Enter') {
    sendPlayerState({ gameId, playerState: { status: 'ready' }, account: currentPlayer })
    document.removeEventListener('keydown', onPlayerReady)
  }
}

export default recompact.compose(
  recompact.setDisplayName('Game'),
  recompact.pluckObs(['currentAccount$']),
  recompact.branch(({ currentAccount }) => !currentAccount, recompact.renderComponent(GameLoginForm)),
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
        joinGame({ gameId, player })
      }
    },
  }),
  recompact.connectObs(() => ({ gameState: gameState$ })),
  recompact.branch(({ gameState }) => !gameState, recompact.renderNothing),
  recompact.withObs(provideObs),
  recompact.connectObs(() => ({ gameStatus: gameState$.pluck('status') }))
)(({ gameStatus }) => (
  <div style={{ width: '100%' }}>
    <GameTrack />
    {{
      [WAITING_ROOM]: <WaitingRoom />,
      [READY_CHECK]: <ReadyCheck onPlayerReady={onPlayerReady} />,
    }[gameStatus] || (
      <div>
        <GameText />
        <GameInput />
      </div>
    )}
  </div>
))
