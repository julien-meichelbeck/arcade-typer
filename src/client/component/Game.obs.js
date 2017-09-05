import Rx from 'rxjs/Rx'
import account from 'client/account'
import { gameState$ } from 'client/socket'
import { sendPlayerState } from 'client/socketApi'
import isEqual from 'lodash/isEqual'

export default ({ props$ }) => {
  const gameId$ = props$.pluck('gameId').distinctUntilChanged()
  const words$ = gameState$.pluck('text').map(({ content }) => content.split(' '))
  const currentPlayer$ = gameState$
    .map(({ players }) => players.find(player => ({ ...(player.id === account.id), ...account })))
    .distinctUntilChanged()

  const playersAreReady$ = gameState$
    .map(({ players }) => players.filter(({ status }) => status !== 'waiting').length >= 1)
    .distinctUntilChanged()

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
    .merge(currentPlayer$.pluck('progress'))
    .distinctUntilChanged()

  const inputValue$ = currentIndex$.distinctUntilChanged().switchMap(() => input$.startWith(''))
  const expectedWord$ = currentIndex$.withLatestFrom(words$, (index, words) => words[index])
  const firstCharacterTimestamp$ = input$.map(() => Date.now()).take(1)
  const hasFinished$ = currentIndex$
    .withLatestFrom(words$)
    .filter(([index, words]) => index >= words.length)
    .mapTo(true)

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

  const countdown$ = playersAreReady$.filter(Boolean).switchMap(() =>
    Rx.Observable
      .timer(0, 1000)
      .timeInterval()
      .map(({ value }) => 3 - value)
      .filter(value => value >= 0),
  )

  Rx.Observable
    .timer(0, 1000)
    .timeInterval()
    .withLatestFrom(currentIndex$, speed$, (interval, progress, speed) => ({ progress, speed }))
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
    countdown$,
    hasFinished$,
    gameState$,
    words$,
    currentPlayer$,
    gameId$,
  }
}
