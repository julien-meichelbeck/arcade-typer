import React from 'react'
import recompact from 'shared/modules/recompact'
import Text from 'client/component/Text'
import injectSheet from 'react-jss'

const styles = {
  root: {
    fontFamily: "'Montserrat', sans-serif",
    textAlign: 'center',
    margin: '20px 0',
  },
}

export default recompact.compose(
  recompact.pluckObs(['currentPlayer$', 'gameId$']),
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
  injectSheet(styles)
)(({ classes, currentPlayer: { status } }) => (
  <Text className={classes.root} lead>
    {status !== 'ready' ? 'Press enter to start...' : null}
  </Text>
))
