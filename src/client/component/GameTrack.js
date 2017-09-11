import React from 'react'
import injectSheet from 'react-jss'
import Player from 'client/component/Player'
import Container from 'client/component/Container'
import GameMessage from 'client/component//GameMessage'
import recompact from 'shared/modules/recompact'
import orderBy from 'lodash/orderBy'
import findIndex from 'lodash/findIndex'

const styles = {
  root: {
    width: '100vw',
    position: 'relative',
    left: '50%',
    right: '50%',
    marginLeft: '-50vw',
    marginRight: '-50vw',
    minHeight: '200px',
    padding: '14px 0 14px',
    background: 'rgb(38, 31, 66)',
    color: 'white',
  },
}

export default recompact.compose(
  recompact.setDisplayName('GameTrack'),
  injectSheet(styles),
  recompact.pluckObs(['gameState$', 'words$', 'currentPlayer$']),
  recompact.branch(({ gameState }) => !gameState, recompact.renderNothing),
  recompact.withProps(({ gameState: { players } }) => ({
    rankedPlayers: orderBy(players.filter(({ doneAt }) => doneAt), ['doneAt']),
  })),
  recompact.pure,
)(({ classes, words, progress, gameState: { status, players }, rankedPlayers }) => (
  <div className={classes.root}>
    <Container>
      <GameMessage />
      {players.map(player => (
        <Player
          key={player.id}
          progressValue={progress}
          progressMax={words.length}
          position={findIndex(rankedPlayers, ({ id }) => id === player.id) + 1}
          gameStatus={status}
          {...player}
        />
      ))}
    </Container>
  </div>
))
