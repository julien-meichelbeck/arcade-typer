import 'isomorphic-fetch'
import { PLAY_ROUTE, gameRoute } from 'shared/routes'

export const createGame = history => () => {
  fetch(PLAY_ROUTE, { method: 'POST', credentials: 'include' })
    .then(response => response.json())
    .then(({ gameId }) => history.push(gameRoute(gameId)))
    .catch(error => console.log(error))
}
