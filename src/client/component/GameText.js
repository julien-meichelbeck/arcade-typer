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
  },
  source: {
    color: '#aaa',
    textAlign: 'right',
    margin: 14,
  },
}

export default recompact.compose(
  injectSheet(styles),
  recompact.connectObs(({ currentIndex$, isCorrectWord$, gameState$, words$ }) => ({
    currentIndex: currentIndex$,
    isCorrectWord: isCorrectWord$,
    words: words$,
    countdown: gameState$.pluck('countdown'),
    status: gameState$.pluck('status'),
    source: gameState$.pluck('text', 'source'),
  })),
  recompact.branch(({ words }) => !words, recompact.renderNothing),
  recompact.pure,
)(({ isCorrectWord, words, currentIndex, source, classes, countdown, status }) => (
  <div className={classes.root}>
    <CountdownTimer countdown={countdown} />
    {words.map((word, i) => (
      <Word
        key={word + i}
        isCurrentWord={i === currentIndex}
        isCorrect={isCorrectWord}
        blurry={![PLAYING, NEXT_GAME_COUNTDOWN].includes(status)}
        isBeingWrittenBy={false}
      >
        {word}
      </Word>
    ))}
    <div className={classes.source}>{source}</div>
  </div>
))
