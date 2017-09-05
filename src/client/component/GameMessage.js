import React from 'react'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import recompact from 'shared/modules/recompact'

const styles = {
  root: {
    fontSize: 20,
    fontWeight: 'light',
    fontFamily: "'Montserrat', sans-serif",
    textAlign: 'center',
    color: '#eee',
    height: 30,
  },
}

export default recompact.compose(
  injectSheet(styles),
  connect(({ global: { message } }) => ({ message })),
)(({ message, classes }) => <div className={classes.root}>{message ? message.text : null}</div>)
