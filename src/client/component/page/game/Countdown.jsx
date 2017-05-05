import recompact from 'shared/modules/recompact'

export default recompact.compose(
  recompact.withState('countdown', 'setCountdown', 3),
  recompact.withState('intervalId', 'setIntervalId', 0),
  recompact.lifecycle({
    componentDidMount() {
      const intervalId = setInterval(() => this.props.setCountdown(this.props.countdown - 1), 1000)
      this.props.setIntervalId(intervalId)
    },
    componentDidUpdate() {
      if (this.props.countdown < 1) {
        clearInterval(this.props.intervalId)
      }
    },
  }),
)
