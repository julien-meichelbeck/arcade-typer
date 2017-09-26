import 'isomorphic-fetch'
import Rx from 'rxjs'
import { userRoute } from 'shared/routes'

export default ({ currentAccount$ }) => {
  const histories$ = currentAccount$
    .pluck('id')
    .switchMap(id =>
      Rx.Observable.fromPromise(
        fetch(userRoute(id), {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }),
      ),
    )
    .filter(response => response.ok)
    .switchMap(response => Rx.Observable.fromPromise(response.json()))
    .publishReplay(1)
    .refCount()

  return {
    histories: histories$,
  }
}
