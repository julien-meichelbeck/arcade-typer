import React from 'react'
import recompact from 'shared/modules/recompact'

export default recompact.pure(({ children: word, isCurrentWord, isCorrect, isBeingWrittenBy, blurry }) => {
  const color = blurry ? 'transparent' : isCurrentWord ? (isCorrect ? 'green' : 'red') : 'black'
  const textShadow = blurry ? '0 0 20px rgba(0,0,0,0.5)' : ''
  const textDecoration = isBeingWrittenBy.length ? 'underline' : 'none'
  const textDecorationStyle = isBeingWrittenBy.length ? 'dotted' : ''
  const textDecorationColor = isBeingWrittenBy[0] ? isBeingWrittenBy[0].color : ''
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
        {word}
      </span>{' '}
    </span>
  )
})
