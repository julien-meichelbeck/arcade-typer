import React from 'react'
import injectSheet from 'react-jss'
import Player from 'client/component/Player'
import Container from 'client/component/Container'
import Button from 'client/component/Button'
import GameMessage from 'client/component/page/game/GameMessage'
import recompact from 'shared/modules/recompact'
import { rankedPlayers } from 'shared/utils'

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
  injectSheet(styles),
  recompact.withState('showShareUrl', 'setShowShareUrl', false),
)(({ gameId, players, words, classes, gameUrl, showShareUrl, setShowShareUrl }) => (
  <div className={classes.root}>
    <Container>
      <GameMessage />
      {players
        .sort((pA, pB) => pB.progress - pA.progress)
        .map(player => (
          <Player
            key={player.id}
            gameId={gameId}
            otherPlayers={players}
            progressValue={player.progress}
            progressMax={words.length}
            position={rankedPlayers(players).findIndex(({ id }) => player.id === id) + 1}
            color={player.color}
            {...player}
          />
        ))}
      <Button dark onClick={() => setShowShareUrl(!showShareUrl)}>Add a player</Button>
      {showShareUrl
        ? <div>
          <p>{'Play with your friends!'}</p>
          <input readOnly value={gameUrl} style={{ width: '100%', fontSize: '20px' }} />
        </div>
        : null}
    </Container>
  </div>
))
