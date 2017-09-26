import React from 'react'
import injectSheet from 'react-jss'
import classNames from 'classnames'

const styles = {
  root: {
    margin: 0,
  },
  lead: {
    fontSize: '24px',
    fontWeight: 'lighter',
  },
  error: {
    color: 'red',
  },
  center: {
    textAlign: 'center',
  },
}

export default injectSheet(
  styles
)(({ children, classes, sheet, lead, center, className: classNameProp, error, ...props }) => {
  const className = classNames(classes.root, classNameProp, {
    [classes.lead]: lead,
    [classes.error]: error,
    [classes.center]: center,
  })
  return (
    <p className={className} {...props}>
      {children}
    </p>
  )
})
