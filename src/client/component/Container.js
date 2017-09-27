import React from 'react'
import injectSheet from 'react-jss'
import classNames from 'classnames'

const styles = {
  root: {
    width: '100%',
    maxWidth: '1040px',
    margin: 'auto',
  },
}

export default injectSheet(styles)(({ classes, className: classNameProp, children, sheet, ...props }) => (
  <div className={classNames(classes.root, classNameProp)} {...props}>
    {children}
  </div>
))
