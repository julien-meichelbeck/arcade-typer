import Rx from 'rxjs/Rx'
import { socket, gameState$ } from 'client/socket'
import player from 'client/account'

export default ({ props$ }) => {
  const gameId$ = props$.pluck('gameId')
  const words$ = gameState$.pluck('text').map(({ content }) => content.split(' '))

  const input$ = new Rx.Subject()
  const currentIndex$ = input$
    .withLatestFrom(words$)
    .scan((index, [input, words]) => {
      if (input === `${words[index]} `) {
        index += 1
      }
      return index
    }, 0)
    .startWith(0)
    .distinctUntilChanged()

  const inputValue$ = currentIndex$.distinctUntilChanged().switchMap(() => input$.startWith(''))
  const expectedWord$ = currentIndex$.withLatestFrom(words$, (index, words) => words[index])
  const firstCharacterTimestamp$ = input$.map(() => Date.now()).take(1)
  const hasFinished$ = currentIndex$.withLatestFrom(words$).filter(([index, words]) => index >= words.length)
  const isCorrectWord$ = inputValue$.withLatestFrom(
    expectedWord$,
    (inputValue, expectedWord) => expectedWord && expectedWord.slice(0, inputValue.length) === inputValue,
  )

  const AVERAGE_CHARS_PER_WORD = 5
  const speed$ = Rx.Observable
    .interval(1000)
    .timeInterval()
    .takeUntil(hasFinished$)
    .withLatestFrom(
      words$,
      currentIndex$,
      firstCharacterTimestamp$,
      (interval, words, index, firstCharacterTimestamp) => {
        const durationInMinutes = (Date.now() - firstCharacterTimestamp) / 1000 / 60
        const typedCharactersCount = words.slice(0, index).reduce((acc, elem) => acc + elem.length, 0)
        return Math.round(typedCharactersCount / AVERAGE_CHARS_PER_WORD / durationInMinutes * 1.2)
      },
    )

  const countdown$ = Rx.Observable
    .timer(0, 1000)
    .timeInterval()
    .map(({ value }) => 3 - value)
    .filter(value => value >= 0)

  Rx.Observable
    .timer(0, 1000)
    .timeInterval()
    .withLatestFrom(currentIndex$, speed$, (interval, progress, speed) => ({ progress, speed }))
    .withLatestFrom(gameId$)
    .subscribe(([playerState, gameId]) => {
      socket.emit('action', {
        type: 'SEND_PLAYER_STATE',
        payload: {
          player: {
            ...player,
            ...playerState,
          },
          gameId,
        },
      })
    })

  return {
    inputValue$,
    input$,
    speed$,
    expectedWord$,
    currentIndex$,
    isCorrectWord$,
    countdown$,
    hasFinished$,
    gameState$,
    words$,
  }
}
