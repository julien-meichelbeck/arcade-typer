import React from 'react'
import injectSheet from 'react-jss'
import recompact from 'shared/modules/recompact'

const styles = {
  root: {
    fontSize: 80,
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    fontFamily: "'Changa One', cursive",
  },
}

export default recompact.compose(
  recompact.setDisplayName('Countdown'),
  recompact.withState('intervalId', 'setIntervalId', null),
  recompact.lifecycle({
    componentWillMount() {
      const {
        setCountdown,
        setIntervalId,
      } = this.props
      const intervalId = setInterval(() => {
        setCountdown(this.props.countdown - 1)
        if (this.props.countdown === 0) {
          clearInterval(intervalId)
        }
      }, 1000)
      setIntervalId(intervalId)
    },
    componentWillUnmount() {
      clearInterval(this.props.intervalId)
    },
    componentDidUpdate() {
      if (this.props.countdown < 1) {
        clearInterval(this.props.intervalId)
      }
    },
  }),
  injectSheet(styles),
)(({ classes, countdown }) => (
  <div className={classes.root}>{countdown}</div>
))
