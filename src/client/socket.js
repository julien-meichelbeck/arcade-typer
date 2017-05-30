// @flow

import socketIOClient from 'socket.io-client'
import { setGameState, SET_GAME_STATE } from 'shared/actions/games'

import { setMessage } from 'shared/action/global'

export const socket = socketIOClient(window.location.host)

/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const setUpSocket = (store: Object) => {
  socket.on(SET_GAME_STATE, (newGameState) => {
    if (newGameState.timeLeftBeforeNextGame) {
      store.dispatch(
        setMessage({
          text: `Next game will start in ${Math.round(newGameState.timeLeftBeforeNextGame / 1000)} seconds.`,
        }),
      )
      setTimeout(() => {
        window.location = `/games/${newGameState.id}`
        store.dispatch(setMessage(null))
      }, newGameState.timeLeftBeforeNextGame)
    }
    store.dispatch(setGameState(newGameState))
  })
}
/* eslint-enable no-console */

export default setUpSocket
