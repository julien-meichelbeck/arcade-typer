import React from 'react'
import 'isomorphic-fetch'
import { connect } from 'react-redux'
import recompact from 'shared/modules/recompact'
import { createGame, joinGame, leaveGame, sendPlayerProgress } from 'shared/action/games'
import { gameRoute } from 'shared/routes'
import { wordsPerMinute, absoluteUrl } from 'shared/utils'
import WaitingRoom from 'client/component/page/game/WaitingRoom'
import Countdown from 'client/component/page/game/Countdown'
import LoginForm from 'client/component/page/LoginForm'
import GameText from 'client/component/GameText'
import GameTrack from 'client/component/GameTrack'

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
  Countdown,
  recompact.withHandlers({
    onWordInputChange: ({
      setWordInput,
      words,
      index,
      setIndex,
      startTime,
      setStartTime,
      setStatus,
      game,
      dispatch,
      account,
    }) => ({ target: { value } }) => {
      const now = Date.now()
      if (!startTime) {
        setStartTime(now)
        setStatus('playing')
      }
      const isWordWithSpace = `${words[index]} ` === value
      const isLastWord = index + 1 === words.length && words[index] === value
      if (isWordWithSpace || isLastWord) {
        const time = now - startTime
        const playerProgress = {
          player: {
            id: account.id,
            username: account.username,
            progress: index + 1,
            speed: wordsPerMinute(time, words, index),
            time,
          },
          gameId: game.id,
        }
        if (isWordWithSpace) {
          setWordInput('')
          setIndex(index + 1)
          playerProgress.player.status = 'typing'
        } else if (isLastWord) {
          setWordInput('')
          setStatus('done')
          playerProgress.player.status = 'done'
        }
        dispatch(sendPlayerProgress(playerProgress))
      } else {
        setWordInput(value)
      }
    },
  }),
)(({
  game: {
    players,
    id,
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
}) => {
  const isGameReady = countdown < 1
  const isCorrectWord = !wordInput.length
    || words[index].substring(0, wordInput.length) === wordInput
  return (
    <div style={{ width: '100%' }}>
      <GameTrack
        players={players}
        words={words}
        gameUrl={absoluteUrl(gameRoute(id))}
      />
      <GameText
        isGameReady={isGameReady}
        words={words}
        isCorrectWord={isCorrectWord}
        countdown={countdown}
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
  )
})
