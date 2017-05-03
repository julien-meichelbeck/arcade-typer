// @flow

import socketIOClient from 'socket.io-client'

import {
  addPlayer,
  updatePlayerProgress,
  ADD_PLAYER,
  setGameState,
  SET_GAME_STATE,
  UPDATE_PLAYER_PROGRESS,
} from 'shared/action/games'

export const socket = socketIOClient(window.location.host)

/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const setUpSocket = (store: Object) => {
  socket.on(SET_GAME_STATE, (newGameState) => {
    store.dispatch(setGameState(newGameState))
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
