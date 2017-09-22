import 'isomorphic-fetch'
import Rx from 'rxjs'
import { PLAY_ROUTE, gameRoute } from 'shared/routes'

export default ({ props$ }) => {
  const createGame$ = new Rx.Subject()
  createGame$
    .switchMap(() =>
      Rx.Observable.fromPromise(
        fetch(PLAY_ROUTE, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        }),
      ),
    )
    .filter(response => response.ok)
    .switchMap(response => Rx.Observable.fromPromise(response.json()))
    .withLatestFrom(props$.pluck('history'))
    .do(([{ gameId }, history]) => history.push(gameRoute(gameId)))
    .subscribe() // TODO leak
  return {
    onCreateGame: createGame$,
  }
}
