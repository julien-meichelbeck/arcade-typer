import React from 'react'
import injectSheet from 'react-jss'

const styles = {
  root: {
    width: '100%',
    maxWidth: '1040px',
    margin: 'auto',
    display: 'flex',
    padding: 10,
  },
}

export default injectSheet(styles)(({
  classes,
  children,
  sheet,
  ...props
}) =>
  <div className={classes.root} {...props}>
    { children }
  </div>,
)
