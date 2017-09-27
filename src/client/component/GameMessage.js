import React from 'react'
import injectSheet from 'react-jss'
import recompact from 'shared/modules/recompact'
import Button from 'client/component/Button'
import { resetGame } from 'client/socketApi'

const styles = {
  root: {
    fontSize: 20,
    fontWeight: 'light',
    fontFamily: "'Montserrat', sans-serif",
    textAlign: 'center',
    color: '#eee',
    minHeight: 30,
  },
}

export default recompact.compose(
  injectSheet(styles),
  recompact.connectObs(({ gameState$, gameId$ }) => ({
    nextGameCountdown: gameState$.pluck('nextGameCountdown'),
    gameId: gameId$,
  })),
  recompact.withHandlers({
    onStartNextGame: ({ gameId }) => () => resetGame(gameId),
  }),
  recompact.pure
)(({ nextGameCountdown, onStartNextGame, classes }) => (
  <div className={classes.root}>
    {nextGameCountdown ? (
      <div>
        {`Next game in ${nextGameCountdown} seconds`}
        {nextGameCountdown < 20 ? (
          <div>
            <br />
            <Button onClick={onStartNextGame}>Next game</Button>
          </div>
        ) : null}
      </div>
    ) : null}
  </div>
))
