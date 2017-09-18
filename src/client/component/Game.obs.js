import Rx from 'rxjs/Rx'
import account from 'client/account'
import { gameState$ } from 'client/socket'
import { sendPlayerState } from 'client/socketApi'
import { PLAYING } from 'shared/statuses'
import isEqual from 'lodash/isEqual'

export default ({ props$ }) => {
  const gameId$ = props$.pluck('gameId').distinctUntilChanged()
  const round$ = gameState$.pluck('round').distinctUntilChanged()
  const words$ = gameState$
    .pluck('text')
    .distinctUntilChanged()
    .map(({ content }) => content.split(' '))

  const currentPlayer$ = gameState$
    .map(({ players }) => {
      const player = players.find(player => player.id === account().id)
      return { ...player, ...account() }
    })
    .distinctUntilChanged()

  const input$ = new Rx.Subject()
  const currentIndex$ = round$.switchMap(() =>
    input$
      .withLatestFrom(words$)
      .scan((index, [input, words]) => {
        if (input === `${words[index]} `) {
          index += 1
        }
        return index
      }, 0)
      .startWith(0)
      .distinctUntilChanged(),
  )

  const inputValue$ = currentIndex$.distinctUntilChanged().switchMap(() => input$.startWith(''))
  const expectedWord$ = currentIndex$.withLatestFrom(words$, (index, words) => words[index])
  const hasFinished$ = currentIndex$
    .withLatestFrom(words$)
    .filter(([index, words]) => index >= words.length)
    .mapTo(true)

  const isCorrectWord$ = inputValue$.withLatestFrom(
    expectedWord$,
    (inputValue, expectedWord) => expectedWord && expectedWord.slice(0, inputValue.length) === inputValue,
  )

  const AVERAGE_CHARS_PER_WORD = 5

  const speed$ = gameState$
    .pluck('status')
    .distinctUntilChanged()
    .filter(status => status === PLAYING)
    .switchMap(() => {
      const startTime = Date.now()
      return Rx.Observable
        .combineLatest(
          Rx.Observable
            .interval(1000)
            .timeInterval()
            .takeUntil(hasFinished$),
          hasFinished$.startWith(false),
        )
        .withLatestFrom(words$, currentIndex$, (_interval, words, index) => {
          const durationInMinutes = (Date.now() - startTime) / 1000 / 60
          const typedCharactersCount = words.slice(0, index).reduce((acc, elem) => acc + elem.length, 0) + index
          return Math.round(typedCharactersCount / AVERAGE_CHARS_PER_WORD / durationInMinutes * 1.2)
        })
    })

  speed$
    .withLatestFrom(currentIndex$, (speed, progress) => ({ progress, speed }))
    .withLatestFrom(gameId$)
    .distinctUntilChanged(isEqual)
    .subscribe(([playerState, gameId]) => {
      sendPlayerState({ playerState, gameId })
    })

  return {
    inputValue$,
    input$,
    speed$,
    expectedWord$,
    currentIndex$,
    isCorrectWord$,
    hasFinished$,
    gameState$,
    words$,
    currentPlayer$,
    gameId$,
  }
}
