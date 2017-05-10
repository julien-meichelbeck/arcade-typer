// @flow

import socketIOClient from 'socket.io-client'
import {
  addPlayer,
  updatePlayerProgress,
  ADD_PLAYER,
  setGameState,
  SET_GAME_STATE,
  UPDATE_PLAYER_PROGRESS,
  CHANGE_GAME,
} from 'shared/action/games'

import { setMessage } from 'shared/action/global'

export const socket = socketIOClient(window.location.host)

/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const setUpSocket = (store: Object) => {
  socket.on(SET_GAME_STATE, (newGameState) => {
    store.dispatch(setGameState(newGameState))
  })

  socket.on(CHANGE_GAME, ({ newGame, timeBeforeGame }) => {
    let elapsedTime = 0
    store.dispatch(setMessage({ text: `Next game will start in ${Math.round((timeBeforeGame / 1000) - elapsedTime)} seconds.` }))
    setInterval(() => {
      elapsedTime += 1
      store.dispatch(setMessage({ text: `Next game will start in ${Math.round((timeBeforeGame / 1000) - elapsedTime)} seconds.` }))
    }, 1000)
    setTimeout(
      () => {
        window.location = `/games/${newGame.id}`
        // store.dispatch(joinGame({ player: store.account, id: newGame.id }))
        // store.dispatch(leaveGame({ player: store.account, id: previousGame.id }))
        // socket.leave()
        // store.dispatch(setGameState(newGame))
      }, timeBeforeGame,
    )
  })

  socket.on(UPDATE_PLAYER_PROGRESS, (payload) => {
    store.dispatch(updatePlayerProgress(payload))
  })
  socket.on(ADD_PLAYER, ({ player }) => {
    console.log(`${player.username} joined the game.`)
    store.dispatch(addPlayer({ player }))
  })
}
/* eslint-enable no-console */

export default setUpSocket
