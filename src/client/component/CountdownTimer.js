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
  recompact.branch(({ countdown }) => countdown === 0, recompact.renderNothing),
  injectSheet(styles),
)(({ classes, countdown }) => <div className={classes.root}>{countdown}</div>)
