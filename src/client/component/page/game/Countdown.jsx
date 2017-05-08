import recompact from 'shared/modules/recompact'
import { isProd } from 'shared/utils'

const DURATION = isProd ? 10 : 2

export default recompact.compose(
  recompact.withState('countdown', 'setCountdown', DURATION),
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
    componentWillUnmount() {
      clearInterval(this.props.intervalId)
    },
  }),
)
