import React from 'react'
import recompact from 'shared/modules/recompact'

const Char = recompact.pure(({ char, color }) => <span style={{ color }}>{char}</span>)

const charColor = ({ char, index, inputValue, isCurrentWord, blurry }) =>
  blurry
    ? 'transparent'
    : isCurrentWord ? (index >= inputValue.length ? 'black' : inputValue[index] === char ? 'green' : 'red') : 'black'

export default recompact.pure(({ children: word, isCurrentWord, oponentColor, blurry, inputValue }) => {
  const textDecoration = isCurrentWord && !blurry ? 'underline' : null
  const textShadow = blurry ? '0 0 20px rgba(0,0,0,0.5)' : ''
  const boxShadow = oponentColor ? `0 4px 2px -3px ${oponentColor.replace('rgb', 'rgba').replace(')', ', 0.6)')}` : null
  const chars = word.split('')
  return (
    <span>
      <span style={{ textDecoration, textShadow, boxShadow }}>
        {chars.map((char, index) => (
          <Char key={index} char={char} color={charColor({ char, index, inputValue, isCurrentWord, blurry })} />
        ))}
      </span>{' '}
    </span>
  )
})
