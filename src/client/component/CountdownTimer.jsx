import React from 'react'
import injectSheet from 'react-jss'
import recompact from 'shared/modules/recompact'

const styles = {
  root: {
    fontSize: 50,
    position: 'relative',
    left: '50%',
    top: 10,
    height: 0,
  },
}

export default recompact.compose(
  injectSheet(styles),
)(({ time, classes }) => (
  <div className={classes.root}>{time}</div>
))
