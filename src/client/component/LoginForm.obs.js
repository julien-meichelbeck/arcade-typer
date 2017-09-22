import 'isomorphic-fetch'
import Rx from 'rxjs'
import { LOGIN_ROUTE } from 'shared/routes'

export default ({ props$, currentAccount$ }) => {
  const submit$ = new Rx.Subject()
  submit$
    .withLatestFrom(props$)
    .switchMap(([, { username, password }]) =>
      Rx.Observable.fromPromise(
        fetch(LOGIN_ROUTE, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        }),
      ),
    )
    .filter(response => response.ok)
    .switchMap(response => Rx.Observable.fromPromise(response.json()))
    .map(({ account }) => account)
    .subscribe(currentAccount$)
  return {
    onSubmit: submit$,
  }
}
