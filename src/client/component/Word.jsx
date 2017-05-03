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
  return (
    <span>
      <span style={{ color, textDecoration, userSelect: 'none' }}>
        {children}
      </span>
      {' '}
    </span>
  )
}
