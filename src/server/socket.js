import { IO_CONNECT, IO_DISCONNECT } from 'shared/config'

import {
  JOIN_GAME,
  LEAVE_GAME,
  SEND_PLAYER,
} from 'shared/actions/games'

import {
  joinGame,
  leaveGame,
  updatePlayer,
} from 'server/state'

export default (io) => {
  io.on(IO_CONNECT, (socket) => {
    socket.on('action', ({ type, payload }) => {
      switch (type) {
        case JOIN_GAME:
          joinGame(io, socket, payload)
          break
        case LEAVE_GAME:
          leaveGame(io, socket, payload)
          break
        case SEND_PLAYER:
          updatePlayer(io, payload)
          break
        default:
      }
    })

    socket.on(IO_DISCONNECT, () => { })
  })
}
