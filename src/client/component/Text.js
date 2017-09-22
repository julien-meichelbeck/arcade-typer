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
}

export default injectSheet(styles)(({ children, classes, sheet, lead, className: classNameProp, ...props }) => {
  const className = classNames(classes.root, classNameProp, {
    [classes.lead]: lead,
  })
  return (
    <p className={className} {...props}>
      {children}
    </p>
  )
})
