import React from 'react'

import injectSheet from 'react-jss'
import classNames from 'classnames'

const styles = {
  root: {
  },
  lead: {
    fontSize: '24px',
    fontWeight: 'lighter',
  },
}


export default injectSheet(styles)(({
  children,
  classes,
  sheet,
  lead,
  className: classNameProp,
  ...props
}) => {
  const className = classNames({
    [classes.root]: true,
    [classes.lead]: lead,
  }, classNameProp)
  return (
    <p className={className} {...props}>{children}</p>
  )
})
