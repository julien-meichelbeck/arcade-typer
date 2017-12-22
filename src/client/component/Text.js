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
)(
  ({
    children,
    classes,
    sheet,
    lead,
    center,
    className: classNameProp,
    error,
    component: Component = 'p',
    ...props
  }) => {
    const className = classNames(classes.root, classNameProp, {
      [classes.lead]: lead,
      [classes.error]: error,
      [classes.center]: center,
    })
    return (
      <Component className={className} {...props}>
        {children}
      </Component>
    )
  }
)
