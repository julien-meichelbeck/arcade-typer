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


const onPlayerReady = ({ dispatch, gameId, currentPlayer }) => (e) => {
  if (e.code === 'Enter') {
    dispatch(sendPlayer({ gameId, player: { id: currentPlayer.id, status: 'ready' } }))
    document.removeEventListener('keydown', onPlayerReady)
  }
}

export default recompact.compose(
  connect(() => ({}), dispatch => ({ dispatch })),
  recompact.withProps(({ currentPlayer }) => ({ isPlayerWaiting: currentPlayer && currentPlayer.status === 'waiting' })),
  recompact.withHandlers({ onPlayerReady }),
  recompact.withState('readyCheckListener', 'setReadyCheckListener', true),
  recompact.lifecycle({
    componentWillMount() {
      const {
        onPlayerReady, isPlayerWaiting, readyCheckListener, setReadyCheckListener,
      } = this.props
      if (isPlayerWaiting && readyCheckListener) {
        document.addEventListener('keydown', onPlayerReady)
        setReadyCheckListener(false)
      }
    },
    componentWillUpdate(newProps) {
      const { onPlayerReady, isPlayerWaiting, readyCheckListener, setReadyCheckListener } = newProps
      if (isPlayerWaiting && readyCheckListener) {
        document.addEventListener('keydown', onPlayerReady)
        setReadyCheckListener(false)
      }
    },
    componentWillUnmount() {
      const { onPlayerReady } = this.props
      document.removeEventListener('keydown', onPlayerReady)
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
