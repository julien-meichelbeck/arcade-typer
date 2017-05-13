import { SET_GAME_STATE, CHANGE_GAME } from 'shared/action/games'
import Game from 'server/models/game'
import { rankedPlayers } from 'shared/utils'

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

    const winner = rankedPlayers(game.players)[0]
    if (player.status === 'done' && winner.id === player.id) {
      const players =
        game.players.map(player => ({
          ...player,
          speed: 0,
          progress: 0,
          time: 0,
          status: 'waiting',
        }))

      io.to(game.id).emit(CHANGE_GAME, {
        timeBeforeGame: winner.time / 2,
        previousGame: game.toObject(),
        newGame: Game.initialize({ players }).toObject(),
      })
    }
  })
}

export { joinGame, leaveGame, setPlayerProgress }
