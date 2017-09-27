import React from 'react'
import Player from 'client/component/Player'
import GameMessage from 'client/component/GameMessage'
import Banner from 'client/component/Banner'
import Container from 'client/component/Container'
import recompact from 'shared/modules/recompact'

export default recompact.compose(
  recompact.setDisplayName('GameTrack'),
  recompact.pluckObs(['gameState$', 'words$', 'currentPlayer$']),
  recompact.branch(({ gameState }) => !gameState, recompact.renderNothing),
  recompact.pure
)(({ words, gameState: { status, players } }) => (
  <Banner>
    <GameMessage />
    <Container>
      {players.map(player => (
        <Player
          key={player.id}
          progressValue={player.progress || 0}
          progressMax={words.length}
          gameStatus={status}
          {...player}
        />
      ))}
    </Container>
  </Banner>
))
