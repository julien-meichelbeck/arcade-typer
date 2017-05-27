import React from 'react'
import { connect } from 'react-redux'
import recompact from 'shared/modules/recompact'
import { joinGame, leaveGame } from 'shared/action/games'
import { gameRoute } from 'shared/routes'
import { absoluteUrl, isProd } from 'shared/utils'
import onWordInputChange from 'client/modules/onWordInputChange'
import WaitingRoom from 'client/component/page/game/WaitingRoom'
import LoginForm from 'client/component/page/LoginForm'
import GameText from 'client/component/GameText'
import GameTrack from 'client/component/GameTrack'
import ReadyCheck from 'client/component/ReadyCheck'

const COUNTDOWN = isProd ? 10 : 2

export default recompact.compose(
  connect(({ account, game }) => ({ account, game }), dispatch => ({ dispatch })),
  recompact.branch(({ account }) => !account || !account.username, () => () => <LoginForm />),
  recompact.lifecycle({
    componentWillMount() {
      const { gameId, dispatch, account } = this.props
      dispatch(
        joinGame({
          player: { id: account.id, username: account.username },
          gameId,
        }),
      )
    },
    componentWillUnmount() {
      const { gameId, account, dispatch } = this.props
      dispatch(leaveGame({ player: { id: account.id }, gameId }))
    },
  }),
  recompact.branch(({ game }) => !game.text, () => () => <div>Loading</div>),
  recompact.withState('status', 'setStatus', 'idle'),
  recompact.withState('wordInput', 'setWordInput', ''),
  recompact.withState('startTime', 'setStartTime', null),
  WaitingRoom,
  recompact.withProps(({ account, game: { players, text, startedAgo } }) => ({
    words: text.content.split(' '),
    secondsLeft: startedAgo ? COUNTDOWN - Math.floor(startedAgo / 1000) : null,
    currentPlayer: players.find(({ id }) => account.id === id),
  })),
  recompact.withState('countdown', 'setCountdown', ({ secondsLeft }) => secondsLeft || COUNTDOWN),
  recompact.withState(
    'index',
    'setIndex',
    ({ currentPlayer }) => (currentPlayer && currentPlayer.progress) || 0,
  ),
  recompact.withHandlers({ onWordInputChange }),
)(
  ({
    game: { players, id, startedAgo, text: { source } },
    status,
    account,
    words,
    wordInput,
    onWordInputChange,
    index,
    countdown,
    setCountdown,
  }) => {
    const arePlayersReady = startedAgo || startedAgo === 0
    const isGameReady = arePlayersReady && countdown <= 0
    const currentPlayer = players.find(({ id }) => account.id === id)
    const isCorrectWord =
      !wordInput.length || words[index].substring(0, wordInput.length) === wordInput
    return (
      <div style={{ width: '100%' }}>
        <GameTrack
          gameId={id}
          players={players}
          words={words}
          gameUrl={absoluteUrl(gameRoute(id))}
        />
        <ReadyCheck gameId={id} currentPlayer={currentPlayer} />
        {arePlayersReady
          ? <div>
            <GameText
              isGameReady={isGameReady}
              words={words}
              isCorrectWord={isCorrectWord}
              countdown={countdown}
              setCountdown={setCountdown}
              index={index}
              account={account}
              players={players}
              source={source}
            />
            <input
              type="text"
              style={{
                height: '50px',
                width: '100%',
                fontSize: '30px',
                color: isCorrectWord ? 'black' : 'red',
              }}
              readOnly={status === 'done'}
              autoFocus
              placeholder={index ? null : 'Type the above text here when the game begins'}
              value={wordInput}
              onChange={isGameReady ? onWordInputChange : null}
            />
          </div>
          : null}
      </div>
    )
  },
)
