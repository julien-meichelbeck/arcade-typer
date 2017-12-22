import Rx from 'rxjs/Rx'
import { PLAYING, READY_CHECK } from 'shared/statuses'
import isEqual from 'lodash/isEqual'

const AVERAGE_CHARS_PER_WORD = 5

export default ({ currentAccount$ }) => {
  const gameId$ = new Rx.BehaviorSubject('new')
  const gameState$ = new Rx.BehaviorSubject({ status: READY_CHECK, players: [window.__PRELOADED_STATE__.account] })
  const round$ = new Rx.BehaviorSubject(1)
  const words$ = Rx.Observable
    .of({ text: { body: 'hello world' } })
    .pluck('text')
    .distinctUntilChanged()
    .map(({ body }) => body.split(' '))

  const input$ = new Rx.Subject()
  const currentIndex$ = round$
    .switchMap(() =>
      input$
        .withLatestFrom(words$)
        .scan((index, [input, words]) => {
          const isLastWord = index === words.length - 1
          const isCorrectWord = input === (isLastWord ? words[index] : `${words[index]} `)
          if (isCorrectWord) index += 1
          return index
        }, 0)
        .startWith(0)
        .distinctUntilChanged()
    )
    .publishReplay(1)
    .refCount()

  const inputValue$ = currentIndex$.distinctUntilChanged().switchMap(() => input$.startWith(''))
  const expectedWord$ = currentIndex$.withLatestFrom(words$, (index, words) => words[index])
  const isCorrectWord$ = inputValue$.withLatestFrom(
    expectedWord$,
    (inputValue, expectedWord) => expectedWord && expectedWord.slice(0, inputValue.length) === inputValue
  )

  const hasFinished$ = currentIndex$
    .withLatestFrom(words$)
    .filter(([index, words]) => index >= words.length)
    .mapTo(true)

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
          hasFinished$.startWith(false)
        )
        .withLatestFrom(words$, currentIndex$, (_interval, words, index) => {
          const durationInMinutes = (Date.now() - startTime) / 1000 / 60
          const typedCharactersCount = words.slice(0, index).reduce((acc, elem) => acc + elem.length, 0) + index
          return Math.round(typedCharactersCount / AVERAGE_CHARS_PER_WORD / durationInMinutes)
        })
    })

  speed$
    .withLatestFrom(currentIndex$, gameId$, currentAccount$, (speed, progress, gameId, currentAccount) => ({
      playerState: { progress, speed },
      gameId,
      account: currentAccount,
    }))
    .distinctUntilChanged(isEqual)
    .subscribe(gameState$)

  return {
    inputValue$,
    input$,
    speed$,
    expectedWord$,
    currentIndex$,
    isCorrectWord$,
    hasFinished$,
    gameState$: gameState$.debug(),
    words$,
    gameId$,
    currentPlayer$: gameState$
      .withLatestFrom(currentAccount$)
      .map(([{ players }, currentAccount]) => {
        const player = players.find(player => player.id === currentAccount.id)
        return { ...player, ...currentAccount }
      })
      .distinctUntilChanged()
      .publishReplay(1)
      .refCount(),
  }
}
