import React from 'react'
import injectSheet from 'react-jss'
import classNames from 'classnames'

const styles = {
  root: {},
  title: {
    fontSize: '26px',
    textAlign: 'center',
    fontFamily: 'Montserrat',
    textTransform: 'uppercase',
  },
  lead: {
    fontSize: '24px',
    fontWeight: 'lighter',
  },
}

export default injectSheet(
  styles,
)(({ children, classes, sheet, lead, uiStyle, className: classNameProp, ...props }) => {
  const className = classNames(
    {
      [classes.root]: true,
      [classes.lead]: lead,
      [classes.title]: uiStyle === 'title',
    },
    classNameProp,
  )
  return (
    <p className={className} {...props}>
      {children}
    </p>
  )
})
