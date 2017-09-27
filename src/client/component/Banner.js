import React from 'react'
import injectSheet from 'react-jss'

const styles = {
  root: {
    width: '100vw',
    position: 'relative',
    left: '50%',
    right: '50%',
    marginLeft: '-50vw',
    marginRight: '-50vw',
    minHeight: '200px',
    padding: '14px 0 14px',
    background: 'rgb(38, 31, 66)',
    color: 'white',
  },
}

export default injectSheet(styles)(({ children, classes }) => <div className={classes.root}>{children}</div>)
