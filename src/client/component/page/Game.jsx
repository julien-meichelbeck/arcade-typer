import React from 'react'
import { connect } from 'react-redux'
import recompact from 'shared/modules/recompact'
import { createGame, joinGame, leaveGame } from 'shared/action/games'
import { gameRoute } from 'shared/routes'
import { absoluteUrl } from 'shared/utils'
import WaitingRoom from 'client/component/page/game/WaitingRoom'
import LoginForm from 'client/component/page/LoginForm'
import GameText from 'client/component/GameText'
import GameTrack from 'client/component/GameTrack'
import ReadyCheck from 'client/component/ReadyCheck'
import onWordInputChange from 'client/modules/onWordInputChange'

export default recompact.compose(
  recompact.withState('status', 'setStatus', 'idle'),
  recompact.withState('wordInput', 'setWordInput', ''),
  recompact.withState('index', 'setIndex', 0),
  recompact.withState('startTime', 'setStartTime', null),
  connect(
    ({ game: gameState, account }, { game }) => ({
      game: { ...game, ...gameState },
      account,
    }),
    dispatch => ({ dispatch }),
  ),
  recompact.branch(
    ({ account }) => !account || !account.username,
    () => () => <LoginForm />,
  ),
  recompact.lifecycle({
    componentWillMount() {
      const { game, dispatch } = this.props
      if (game && game.id && game.text) return
      dispatch(createGame())
    },
    componentDidUpdate() {
      const { game, dispatch } = this.props
      if (game && game.id && game.text) return
      dispatch(createGame())
    },
  }),
  recompact.branch(({ game }) => !game || !game.id, () => () => <div>Loading</div>),
  recompact.withProps(({ game: { text } }) => ({ words: text.content.split(' ') })),
  recompact.lifecycle({
    componentWillMount() {
      const { account, game: { id: gameId }, dispatch } = this.props
      dispatch(joinGame({ player: account, gameId }))
    },
    componentWillUnmount() {
      const { account, game: { id: gameId }, dispatch } = this.props
      dispatch(leaveGame({ player: account, gameId }))
    },
  }),
  WaitingRoom,
  recompact.withProps(({ game: { startedAgo } }) => ({
    secondsLeft: startedAgo
    ? 10 - Math.floor(startedAgo / 1000)
    : null,
  })),
  recompact.withState('countdown', 'setCountdown', ({ secondsLeft }) => secondsLeft || 10),
  recompact.withHandlers({ onWordInputChange }),
)(({
  game: {
    players,
    id,
    startedAgo,
    text: {
      source,
    },
  },
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
  const isCorrectWord = !wordInput.length
    || words[index].substring(0, wordInput.length) === wordInput
  return (
    <div style={{ width: '100%' }}>
      <GameTrack
        gameId={id}
        players={players}
        words={words}
        gameUrl={absoluteUrl(gameRoute(id))}
      />
      <ReadyCheck gameId={id} currentPlayer={currentPlayer} />
      {
        arePlayersReady
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
        : null
      }
    </div>
  )
})
