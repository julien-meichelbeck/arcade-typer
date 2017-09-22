import { JOIN_GAME, LEAVE_GAME, SEND_PLAYER_STATE } from 'shared/actions/games'
import { socket } from 'client/socket'

export const joinGame = ({ gameId, player }) => {
  socket.emit('action', {
    type: JOIN_GAME,
    payload: { player, gameId },
  })
}

export const leaveGame = ({ gameId, player }) => {
  socket.emit('action', {
    type: LEAVE_GAME,
    payload: { player, gameId },
  })
}

export const sendPlayerState = ({ playerState, gameId, account }) => {
  const player = { ...account, ...playerState }
  socket.emit('action', {
    type: SEND_PLAYER_STATE,
    payload: {
      player,
      gameId,
    },
  })
}
