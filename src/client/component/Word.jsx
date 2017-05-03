import React from 'react'

export default ({
  children,
  isCurrentWord,
  isCorrect,
  isBeingWritten,
}) => {
  const color =
    isCurrentWord
      ? isCorrect
        ? 'green'
        : 'red'
      : 'black'
  const textDecoration = isBeingWritten ? 'underline' : 'none'
  const textDecorationStyle = isBeingWritten ? 'dotted' : ''
  const textDecorationColor = isBeingWritten ? 'red' : ''
  return (
    <span>
      <span
        style={{
          userSelect: 'none',
          color,
          textDecoration,
          textDecorationStyle,
          textDecorationColor,
        }}
      >
        {children}
      </span>
      {' '}
    </span>
  )
}
