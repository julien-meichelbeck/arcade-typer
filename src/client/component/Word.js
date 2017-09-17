import React from 'react'
import recompact from 'shared/modules/recompact'

export default recompact.pure(({ children: word, isCurrentWord, isCorrect, oponentColor, blurry }) => {
  const color = blurry ? 'transparent' : isCurrentWord ? (isCorrect ? 'green' : 'red') : 'black'
  const textShadow = blurry ? '0 0 20px rgba(0,0,0,0.5)' : ''
  const boxShadow = oponentColor ? `0 4px 2px -3px ${oponentColor.replace('rgb', 'rgba').replace(')', ', 0.6)')}` : null
  return (
    <span>
      <span style={{ color, textShadow, boxShadow }}>{word}</span>{' '}
    </span>
  )
})
