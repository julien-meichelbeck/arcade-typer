import React from 'react'
import injectSheet from 'react-jss'
import classNames from 'classnames'

const styles = {
  root: {
    display: 'block',
    width: '100%',
    height: '37px',
    fontSize: '20px',
    padding: '0 14px 0',
    lineHeight: '1.42857143',
    color: '#4e4e56',
    backgroundColor: '#fff',
    backgroundImage: 'none',
    border: '1px solid #c5c5ca',
    borderRadius: '3px',
    outline: 'none',
  },
}

export default injectSheet(styles)(({ children, classes, sheet, className: classNameProp, ...props }) => (
  <input type="text" className={classNames(classes.root, classNameProp)} {...props} value={children} />
))
