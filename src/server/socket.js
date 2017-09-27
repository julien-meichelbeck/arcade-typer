import { IO_CONNECT, IO_DISCONNECT } from 'shared/config'
import { JOIN_GAME, LEAVE_GAME, RESET_GAME, SEND_PLAYER_STATE } from 'shared/actions/games'
import { joinGame, leaveGame, updatePlayer, resetGame } from 'server/state'

export default io => {
  io.on(IO_CONNECT, socket => {
    let joinPayload = null
    socket.on('action', ({ type, payload }) => {
      switch (type) {
        case JOIN_GAME:
          joinPayload = payload
          joinGame(io, socket, payload)
          break
        case LEAVE_GAME:
          leaveGame(io, socket, payload)
          break
        case RESET_GAME:
          resetGame(io, payload)
          break
        case SEND_PLAYER_STATE:
          updatePlayer(io, payload)
          break
        default:
      }
    })

    socket.on(IO_DISCONNECT, () => {
      if (joinPayload) leaveGame(io, socket, joinPayload)
    })
  })
}
