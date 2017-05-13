import React from 'react'
import recompact from 'shared/modules/recompact'
import { connect } from 'react-redux'
import { sendPlayer } from 'shared/action/games'
import Text from 'client/component/Text'
import injectSheet from 'react-jss'

const styles = {
  root: {
    fontFamily: "'Montserrat', sans-serif",
    textAlign: 'center',
  },
}


const handleKeyDown = onPlayerReady => (e) => {
  if (e.code === 'Enter' || e.code === 'Space') {
    onPlayerReady()
  }
}

export default recompact.compose(
  connect(() => ({}), dispatch => ({ dispatch })),
  recompact.withProps(({ currentPlayer }) => ({
    isPlayerWaiting: currentPlayer && currentPlayer.status === 'waiting',
  })),
  recompact.withHandlers({
    onPlayerReady: ({ dispatch, gameId, currentPlayer }) =>
      () => dispatch(sendPlayer({ gameId, player: { id: currentPlayer.id, status: 'ready' } })),
  }),
  recompact.lifecycle({
    componentWillMount() {
      const { onPlayerReady } = this.props
      document.addEventListener('keydown', handleKeyDown(onPlayerReady))
    },
    componentWillUnmount() {
      const { onPlayerReady } = this.props
      document.removeEventListener('keydown', handleKeyDown(onPlayerReady))
    },
  }),
  injectSheet(styles),
)(({
  isPlayerWaiting,
  classes,
}) => (
  isPlayerWaiting
    ? <Text className={classes.root} lead>Press enter to start...</Text>
    : null
))
