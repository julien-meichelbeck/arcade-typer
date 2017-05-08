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
}

export default injectSheet(styles)(({
  isCorrectWord,
  isGameReady,
  words,
  countdown,
  index,
  account,
  players,
  classes,
}) => (
  <div className={classes.root}>
    { !isGameReady ? <CountdownTimer time={countdown} /> : null }
    {
      words.map((word, i) =>
        <Word
          key={word + i}
          isCurrentWord={i === index && status !== 'done'}
          isCorrect={isCorrectWord}
          blurry={!isGameReady}
          isBeingWritten={
            players
              .filter(({ id }) => id !== account.id)
              .some(({ progress }) => progress === i)
          }
        >
          {word}
        </Word>,
      )
    }
  </div>
))
