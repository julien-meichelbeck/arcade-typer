import { SET_GAME_STATE, CHANGE_GAME } from 'shared/action/games'
import Game from 'server/models/game'

const sendNewGameState = ({ io, game }) => io.to(game.id).emit(SET_GAME_STATE, game)

const joinGame = (io, socket, { gameId, player }) => {
  socket.join(gameId)

  Game.find(gameId, (game) => {
    game.addPlayer({
      ...player,
      progress: 0,
      status: 'waiting',
    })
    sendNewGameState({ io, game: game.toObject() })
  })
}

const leaveGame = (io, socket, { gameId, player }) => {
  socket.leave(gameId)
  Game.find(gameId, (game) => {
    game.removePlayer(player)
    sendNewGameState({ io, game: game.toObject() })
  })
}

const setPlayerProgress = (io, { gameId, player }) => {
  Game.find(gameId, (game) => {
    game.updatePlayer(player)
    sendNewGameState({ io, game: game.toObject() })
    if (game.isDone()) {
      io.to(game.id).emit(CHANGE_GAME, {
        previousGame: game,
        newGame: Game.create(game).toObject(),
      })
    }
  })
}

export { joinGame, leaveGame, setPlayerProgress }
