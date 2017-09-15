import { JOIN_GAME, LEAVE_GAME, SEND_PLAYER_STATE } from 'shared/actions/games'
import { socket } from 'client/socket'
import account from 'client/account'

export const joinGame = gameId => {
  socket.emit('action', {
    type: JOIN_GAME,
    payload: { player: account, gameId },
  })
}

export const leaveGame = gameId => {
  socket.emit('action', {
    type: LEAVE_GAME,
    payload: { player: account, gameId },
  })
}

export const sendPlayerState = ({ playerState, gameId }) => {
  const player = {
    ...account,
    ...playerState,
  }
  socket.emit('action', {
    type: SEND_PLAYER_STATE,
    payload: {
      player,
      gameId,
    },
  })
}
