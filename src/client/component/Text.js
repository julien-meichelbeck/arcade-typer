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
}

export default injectSheet(
  styles,
)(({ children, classes, sheet, lead, uiStyle, className: classNameProp, ...props }) => {
  const className = classNames(classes.root, classNameProp, classes[uiStyle], {
    [classes.lead]: lead,
  })
  return (
    <p className={className} {...props}>
      {children}
    </p>
  )
})
