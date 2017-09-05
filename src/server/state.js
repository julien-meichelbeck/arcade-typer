import { GET_GAME_STATE } from 'shared/actions/games'
import Game from 'server/models/game'

const sendNewGameState = ({ io, game }) => io.to(game.id).emit(GET_GAME_STATE, game)

const joinGame = (io, socket, { gameId, player }) => {
  socket.join(gameId)

  Game.find(gameId, game => {
    game.addPlayer(player)
    sendNewGameState({ io, game: game.toClientData() })
  })
}

const leaveGame = (io, socket, { gameId, player }) => {
  socket.leave(gameId)
  Game.find(gameId, game => {
    game.removePlayer(player)
    sendNewGameState({ io, game: game.toClientData() })
  })
}

const updatePlayer = (io, { gameId, player }) => {
  Game.find(gameId, game => {
    game.updatePlayer(player)
    sendNewGameState({ io, game: game.toClientData() })
  })
}

export { joinGame, leaveGame, updatePlayer }
