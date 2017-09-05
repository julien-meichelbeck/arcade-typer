import React from 'react'
import recompact from 'shared/modules/recompact'
import { sendPlayerState } from 'client/socketApi'
import Text from 'client/component/Text'
import injectSheet from 'react-jss'

const styles = {
  root: {
    fontFamily: "'Montserrat', sans-serif",
    textAlign: 'center',
  },
}

const onPlayerReady = ({ gameId, currentPlayer: { id } }) => e => {
  if (e.code === 'Enter') {
    sendPlayerState({ gameId, playerState: { id, status: 'ready' } })
    document.removeEventListener('keydown', onPlayerReady)
  }
}

export default recompact.compose(
  recompact.pluckObs(['currentPlayer$', 'gameId$']),
  recompact.withHandlers({ onPlayerReady }),
  recompact.withState('readyCheckListener', 'setReadyCheckListener', true),
  recompact.lifecycle({
    componentWillMount() {
      const { onPlayerReady, readyCheckListener, setReadyCheckListener } = this.props
      if (readyCheckListener) {
        document.addEventListener('keydown', onPlayerReady)
        setReadyCheckListener(false)
      }
    },
    componentWillUpdate(newProps) {
      const { onPlayerReady, readyCheckListener, setReadyCheckListener } = newProps
      if (readyCheckListener) {
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
)(({ classes }) => (
  <Text className={classes.root} lead>
    Press enter to start...
  </Text>
))
