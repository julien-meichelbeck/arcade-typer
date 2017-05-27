import React from 'react'
import CountdownTimer from 'client/component/CountdownTimer'
import Word from 'client/component/Word'
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

export default injectSheet(
  styles,
)(
  ({
    isCorrectWord,
    isGameReady,
    words,
    countdown,
    setCountdown,
    index,
    account,
    players,
    source,
    classes,
  }) => (
    <div className={classes.root}>
      {!isGameReady ? <CountdownTimer setCountdown={setCountdown} countdown={countdown} /> : null}
      {words.map((word, i) => (
        <Word
          key={word + i}
          isCurrentWord={i === index && status !== 'done'}
          isCorrect={isCorrectWord}
          blurry={!isGameReady}
          isBeingWrittenBy={players.filter(
            ({ id, progress }) => id !== account.id && progress === i,
          )}
        >
          {word}
        </Word>
      ))}
      <div className={classes.source}>{source}</div>
    </div>
  ),
)
