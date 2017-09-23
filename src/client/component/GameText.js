import React from 'react'
import recompact from 'shared/modules/recompact'
import Word from 'client/component/Word'
import CountdownTimer from 'client/component/CountdownTimer'
import injectSheet from 'react-jss'
import { PLAYING, NEXT_GAME_COUNTDOWN } from 'shared/statuses'

const styles = {
  root: {
    width: '100%',
    fontSize: '24px',
    position: 'relative',
    margin: '30px 0 30px',
    userSelect: 'none',
  },
  source: {
    color: '#aaa',
    textAlign: 'right',
    margin: 14,
  },
}

export default recompact.compose(
  injectSheet(styles),
  recompact.connectObs(({ currentPlayer$, currentIndex$, inputValue$, gameState$, words$ }) => ({
    currentIndex: currentIndex$,
    words: words$,
    inputValue: inputValue$,
    countdown: gameState$.pluck('countdown'),
    status: gameState$.pluck('status'),
    source: gameState$.pluck('text', 'source'),
    oponentsColorMapping: gameState$
      .withLatestFrom(currentPlayer$)
      .map(([{ players }, currentPlayer]) =>
        players
          .filter(({ id }) => id !== currentPlayer.id)
          .reduce((acc, elem) => ({ ...acc, [elem.progress]: elem.color }), {}),
      ),
  })),
  recompact.branch(({ words }) => !words, recompact.renderNothing),
  recompact.pure,
)(({ words, currentIndex, source, classes, countdown, status, oponentsColorMapping, inputValue }) => (
  <div className={classes.root}>
    <CountdownTimer countdown={countdown} />
    {words.map((word, i) => (
      <Word
        key={word + i}
        inputValue={inputValue}
        isCurrentWord={i === currentIndex}
        blurry={![PLAYING, NEXT_GAME_COUNTDOWN].includes(status)}
        oponentColor={oponentsColorMapping[i]}
      >
        {word}
      </Word>
    ))}
    <div className={classes.source}>{source}</div>
  </div>
))
