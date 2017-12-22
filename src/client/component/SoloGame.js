import React from 'react'
import recompact from 'shared/modules/recompact'
import { WAITING_ROOM, READY_CHECK } from 'shared/statuses'
import GameText from 'client/component/GameText'
import GameTrack from 'client/component/GameTrack'
import WaitingRoom from 'client/component/WaitingRoom'
import GameLoginForm from 'client/component/GameLoginForm'
import GameInput from 'client/component/GameInput'
import ReadyCheck from 'client/component/ReadyCheck'
import provideObs from './SoloGame.obs'

export default recompact.compose(
  recompact.setDisplayName('Game'),
  recompact.pluckObs(['currentAccount$']),
  recompact.branch(({ currentAccount }) => !currentAccount, recompact.renderComponent(GameLoginForm)),
  recompact.withObs(provideObs),
  recompact.connectObs(({ gameState$ }) => ({ gameStatus: gameState$.pluck('status') })),
  recompact.debug()
)(({ gameStatus }) => (
  <div style={{ width: '100%' }}>
    <GameTrack />
    {{
      [READY_CHECK]: <ReadyCheck onPlayerReady={console.log} />,
    }[gameStatus] || (
      <div>
        <GameText />
        <GameInput />
      </div>
    )}
  </div>
))
