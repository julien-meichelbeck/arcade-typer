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
  injectSheet(styles),
)(({ time, classes }) => (
  <div className={classes.root}>{time === 1 ? 'GO!' : time - 1}</div>
))
