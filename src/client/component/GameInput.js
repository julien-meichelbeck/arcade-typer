import React, { Component } from 'react'
import recompact from 'shared/modules/recompact'
import { PLAYING, NEXT_GAME_COUNTDOWN } from 'shared/statuses'

export default recompact.compose(
  recompact.connectObs(({ inputValue$, input$, isCorrectWord$, gameState$, hasFinished$ }) => ({
    value: inputValue$,
    onChange: input$,
    isCorrectWord: isCorrectWord$,
    hasFinished: hasFinished$,
    status: gameState$.pluck('status'),
  })),
  recompact.withProps(({ isCorrectWord, status, hasFinished }) => ({
    style: {
      height: '50px',
      width: '100%',
      fontSize: '30px',
      color: isCorrectWord ? 'black' : 'red',
    },
    readOnly: ![NEXT_GAME_COUNTDOWN, PLAYING].includes(status) || hasFinished,
  })),
  recompact.withHandlers({
    onChange: ({ onChange }) => event => onChange(event.target.value),
  }),
  recompact.pure,
)(
  class extends Component {
    componentDidUpdate({ readOnly }) {
      if (readOnly && !this.props.readOnly) {
        this.input.focus()
      }
    }

    render() {
      const { onChange, value, style, readOnly, hasFinished } = this.props
      return (
        <input
          ref={input => {
            this.input = input
          }}
          value={value || ''}
          onChange={onChange}
          style={style}
          readOnly={readOnly}
          placeholder={hasFinished ? null : 'Type the above text here when the game starts'}
        />
      )
    }
  },
)
