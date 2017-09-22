import React from 'react'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import Text from 'client/component/Text'

const styles = {
  root: {
    padding: '14px 0',
    display: 'flex',
  },
  label: {
    paddingRight: '14px',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
}

export default injectSheet(styles)(({ children, classes, sheet, label, className: classNameProp, ...props }) => (
  <div className={classNames(classes.root, classNameProp)} {...props}>
    {label ? (
      <div className={classes.label}>
        <Text>{label}</Text>
      </div>
    ) : null}
    {children}
  </div>
))
