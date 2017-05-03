import React from 'react'

export default ({
  children,
  isCurrentWord,
  isCorrect,
  isBeingWritten,
  blurry,
}) => {
  const color =
    blurry
    ? 'transparent'
    : isCurrentWord
        ? isCorrect
          ? 'green'
          : 'red'
        : 'black'
  const textShadow = blurry ? '0 0 20px rgba(0,0,0,0.5)' : ''
  const textDecoration = isBeingWritten ? 'underline' : 'none'
  const textDecorationStyle = isBeingWritten ? 'dotted' : ''
  const textDecorationColor = isBeingWritten ? 'red' : ''
  return (
    <span>
      <span
        style={{
          userSelect: 'none',
          textDecoration,
          textDecorationStyle,
          textDecorationColor,
          color,
          textShadow,
        }}
      >
        {children}
      </span>
      {' '}
    </span>
  )
}
