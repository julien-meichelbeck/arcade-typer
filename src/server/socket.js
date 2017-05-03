// @flow

import { IO_CONNECT } from 'shared/config'

import {
  SEND_PLAYER_PROGRESS,
  JOIN_GAME,
  LEAVE_GAME,
} from 'shared/action/games'

import {
  joinGame,
  leaveGame,
  setPlayerProgress,
} from 'server/state'

/* eslint-disable no-console */
const setUpSocket = (io: Object) => {
  io.on(IO_CONNECT, (socket) => {
    socket.on('action', ({ type, payload }) => {
      console.log('Action received: ', type, payload)
      switch (type) {
        case JOIN_GAME:
          joinGame(io, socket, payload)
          break
        case LEAVE_GAME:
          leaveGame(io, socket, payload)
          break
        case SEND_PLAYER_PROGRESS:
          setPlayerProgress(io, payload)
          break
        default:
      }
    })
  })
}
/* eslint-enable no-console */

export default setUpSocket
