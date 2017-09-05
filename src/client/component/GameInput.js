import React from 'react'
import recompact from 'shared/modules/recompact'

export default recompact.compose(
  recompact.connectObs(({ inputValue$, input$, isCorrectWord$, countdown$, hasFinished$ }) => ({
    value: inputValue$,
    onChange: input$,
    isCorrectWord: isCorrectWord$,
    countdown: countdown$,
    hasFinished: hasFinished$,
  })),
  recompact.withProps(({ isCorrectWord, countdown, hasFinished }) => ({
    style: {
      height: '50px',
      width: '100%',
      fontSize: '30px',
      color: isCorrectWord ? 'black' : 'red',
    },
    readOnly: countdown !== 0 || hasFinished,
  })),
  recompact.withHandlers({
    onChange: ({ onChange }) => event => onChange(event.target.value),
  }),
  recompact.pure
)(({ onChange, value, style, readOnly, hasFinished }) => (
  <input
    value={value || ''}
    onChange={onChange}
    style={style}
    readOnly={readOnly}
    placeholder={hasFinished ? null : 'Type the above text here when the game starts'}
  />
))
