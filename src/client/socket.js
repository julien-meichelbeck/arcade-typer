import socketIOClient from 'socket.io-client'
import { setGameState, SET_GAME_STATE } from 'shared/actions/games'

import { setMessage } from 'shared/action/global'

export const socket = socketIOClient(window.location.host)

/* eslint-disable no-console */
const setUpSocket = (store) => {
  socket.on(SET_GAME_STATE, (newGameState) => {
    if (newGameState.timeLeftBeforeNextGame) {
      let timeleft = Math.round(newGameState.timeLeftBeforeNextGame / 1000)
      const intervalId = setInterval(() => {
        if (timeleft < 0) {
          clearInterval(intervalId)
        }
        store.dispatch(
          setMessage({
            text: `Next game will start in ${timeleft} seconds.`,
          }),
        )
        timeleft -= 1
      }, 1000)
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
