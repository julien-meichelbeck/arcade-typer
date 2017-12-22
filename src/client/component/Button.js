import React from 'react'
import { Link } from 'react-router-dom'
import injectSheet from 'react-jss'
import classNames from 'classnames'

const styles = {
  root: {
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    display: 'inline-block',
    height: '40px',
    lineHeight: '40px',
    padding: '0 14px',
    boxShadow: '0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)',
    background: '#fff',
    borderRadius: '4px',
    fontSize: '15px',
    fontWeight: '600',
    fontFamily: "'Montserrat', sans-serif",
    textTransform: 'uppercase',
    letterSpacing: '.025em',
    color: '#6772e5',
    textDecoration: 'none',
    transition: 'all .15s ease',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 7px 14px rgba(50,50,93,.1), 0 3px 6px rgba(0,0,0,.08)',
    },
  },
  primary: {
    color: '#fff',
    background: '#6772e5',
    '&:hover': {
      backgroundColor: '#7795f8',
    },
  },
  dark: {
    color: '#fff',
    background: '#32325d',
    '&:hover': {
      backgroundColor: '#43458b',
    },
  },
  spaced: {
    margin: '14px 14px 14px 0',
  },
}

export default injectSheet(
  styles
)(({ children, classes, sheet, primary, dark, spaced, to, className: classNameProp, ...props }) => {
  const className = classNames(classNameProp, classes.root, {
    [classes.primary]: primary,
    [classes.spaced]: spaced,
    [classes.dark]: dark,
  })
  return to ? (
    <Link to={to} className={className} {...props}>
      {children}
    </Link>
  ) : (
    <a className={className} {...props}>
      {children}
    </a>
  )
})
