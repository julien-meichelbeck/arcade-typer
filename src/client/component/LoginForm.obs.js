import 'isomorphic-fetch'
import Rx from 'rxjs'
import { LOGIN_ROUTE } from 'shared/routes'
import { BAD_PASSWORD } from 'shared/errors'

export default ({ props$, currentAccount$ }) => {
  const submit$ = new Rx.Subject()
  const $loginTask = submit$
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
    .publishReplay(1)
    .refCount()

  $loginTask
    .filter(({ success }) => success)
    .map(({ account }) => account)
    .subscribe(currentAccount$)

  const errorMessage$ = $loginTask
    .filter(({ success }) => !success)
    .map(({ message }) => (message === BAD_PASSWORD ? 'Another password is expected for this username' : message))

  return {
    onSubmit: submit$,
    errorMessage: errorMessage$,
  }
}
