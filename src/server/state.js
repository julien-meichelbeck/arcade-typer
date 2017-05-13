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
    sendNewGameState({ io, game: game.toClientData() })
  })
}

const leaveGame = (io, socket, { gameId, player }) => {
  socket.leave(gameId)
  Game.find(gameId, (game) => {
    game.removePlayer(player)
    sendNewGameState({ io, game: game.toClientData() })
  })
}

const setPlayerProgress = (io, { gameId, player }) => {
  Game.find(gameId, (game) => {
    game.updatePlayer(player)
    sendNewGameState({ io, game: game.toClientData() })

    const winner = rankedPlayers(game.players)[0]
    if (player.status === 'done' && winner.id === player.id) {
      io.to(game.id).emit(CHANGE_GAME, {
        timeBeforeGame: winner.time / 3,
        previousGame: game.toClientData(),
        nextText: {
          content: 'TODO',
          author: 'TODO',
        },
      })
    }
  })
}

const MIN_READY_PLAYERS = 2
const updatePlayer = (io, { gameId, player }) => {
  Game.find(gameId, (game) => {
    game.updatePlayer(player)
    if (game.players.filter(({ status }) => status === 'ready').length >= MIN_READY_PLAYERS) {
      game.start()
    }
    sendNewGameState({ io, game: game.toClientData() })
  })
}

export { joinGame, leaveGame, setPlayerProgress, updatePlayer }
