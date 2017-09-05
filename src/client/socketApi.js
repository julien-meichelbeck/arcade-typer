import { socket } from 'client/socket'
import player from 'client/account'

export const joinGame = gameId => {
  socket.emit('action', {
    type: 'JOIN_GAME',
    payload: { player, gameId },
  })
}

export const sendPlayerState = ({ playerState, gameId }) => {
  socket.emit('action', {
    type: 'SEND_PLAYER_STATE',
    payload: {
      player: {
        ...player,
        ...playerState,
      },
      gameId,
    },
  })
}
