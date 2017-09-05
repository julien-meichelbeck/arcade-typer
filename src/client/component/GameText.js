import React from 'react'
import recompact from 'shared/modules/recompact'
import Word from 'client/component/Word'
import CountdownTimer from 'client/component/CountdownTimer'
import injectSheet from 'react-jss'

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
  recompact.pluckObs(['currentIndex$', 'isCorrectWord$', 'countdown$', 'words$']),
  recompact.branch(({ words }) => !words, recompact.renderNothing),
)(({ isCorrectWord, words, currentIndex, source, classes, countdown }) => (
  <div className={classes.root}>
    <CountdownTimer countdown={countdown} />
    {words.map((word, i) => (
      <Word
        key={word + i}
        isCurrentWord={i === currentIndex}
        isCorrect={isCorrectWord}
        blurry={countdown !== 0}
        isBeingWrittenBy={false}
      >
        {word}
      </Word>
    ))}
    <div className={classes.source}>{source}</div>
  </div>
))
