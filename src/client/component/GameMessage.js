import React from 'react'
import injectSheet from 'react-jss'
import recompact from 'shared/modules/recompact'

const styles = {
  root: {
    fontSize: 20,
    fontWeight: 'light',
    fontFamily: "'Montserrat', sans-serif",
    textAlign: 'center',
    color: '#eee',
    height: 30,
  },
}

export default recompact.compose(
  injectSheet(styles),
  recompact.connectObs(({ gameState$ }) => ({ nextGameCountdown: gameState$.pluck('nextGameCountdown') })),
  recompact.pure,
)(({ nextGameCountdown, classes }) => (
  <div className={classes.root}>{nextGameCountdown ? `Next game in ${nextGameCountdown} seconds` : null}</div>
))
